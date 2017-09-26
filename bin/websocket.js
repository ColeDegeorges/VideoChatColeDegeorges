let io = require('socket.io');
let session = null;
let connections = [];

let Tutor = require('../models/Tutor');
let User = require('../models/User');
let TutorSession = require('../models/Session');

io.use((socket, next) => {
    session(socket.request, socket.request.res, next);
});

io.sockets.on('connection', connectHandler);

function connectHandler(socket) {
    if (!socket.request.session.passport) return;
    prepareSocket(socket);

    socket.on('disconnect', disconnected);
    socket.on('getTutors', getTutors);
    socket.on('goingLive', goLive);

    //webrtc only
    socket.on('message', relayMsg);
    socket.on('sessionRejected', sessionRejected);
    socket.on('sessionAccepted', sessionAccepted);

    connections.push(socket);
}

async function prepareSocket(s) {
    let email = socket.request.session.passport.user;
    let tutor = await Tutor.findOne({ email });
    let user = await User.findOne({ email });
    let ts = await TutorSession.isInSession({ tutor, user });
    let role = tutor ? 'tutor' : 'user';

    if (tutor) {
        tutor.status = 'offline';
        await tutor.save();
    }

    if (ts) {
        startWebRTC(ts);
        user = user || await User.findById(ts.user);
        tutor = tutor || await Tutor.findById(ts.tutor);
    }

    s.info = {
        tutor,
        user,
        ts,
        role
    }
}

function requestTutor({ user, tutor, duration, id }) {
    var socket = connections.find(s => s.tutor_id == tutor);
    socket.emit('sessionRequest', { name: user.firstName, minutes: duration, id: id });
}

async function sessionAccepted(id, cb) {
    let thisSessionId = this.info.ts.id;

    let user_sessions = await TutorSession.find({ status: 'insession', user: this.info.user.id });
    let tutor_sessions = await TutorSession.find({ status: 'insession', tutor: this.info.tutor.id });
    let combined = user_sessions.concat(tutor_sessions);

    for (let s of combined) {
        await s.setStatus('finished');
    }

    let user_sessions_pend = await TutorSession.find({ status: 'pending', user: this.info.user.id });
    let tutor_sessions_pend = await TutorSession.find({ status: 'pending', tutor: this.info.tutor.id });
    let combined_pend = user_sessions_pend.concat(tutor_sessions_pend);

    for (let s of combined_pend) {
        if (s.id == thisSessionId) continue;
        await s.remove();
    }

    let tutor = await Tutor.findById(this.info.tutor.id);
    tutor.status = 'busy';
    await tutor.save();

    let ts = await TutorSession.findById(thisSessionId);
    ts.setStatus('insession');

    startWebRTC(this);

}

async function sessionRejected(id, cb) {
    let { tutor, ts, user } = this.info;
    let Tr = await Tutor.findById(tutor.id);

    Tr.status = 'available';
    await Tr.save();
    await ts.remove();

    let user_socket = connections.find(s => (s.info.user.id == info.user.id) && (s.info.ts.id == info.ts.id));

    user_socket.emit('redirect', '/tutors');
}

async function disconnected() {
    let index = connections.indexOf(this);
    if (index) {
        connections.splice(index, 1);
        let ts = this.info.ts
        if (ts) {
            if (ts.tutor) {
                let tutor = await Tutor.findById(ts.tutor.id);
                tutor.status = 'offline';
                await tutor.save();
            }
            let latest_ts = await TutorSession.findById(ts.id);
            if (latest_ts.status == 'pending') {
                await ts.remove();
            }
        }
        io.emit("tutorsChanged", available_tutors);
    } else {
        console.log("Couldn't find the socket that just disconnected");
    }

}

function startWebRTC({ info }) {

    console.log('startWebRTC called');
    let user_socket = connections.find(s => (s.info.user.id == info.user.id) && (s.info.ts.id == info.ts.id));
    let tutor_socket = connections.find(s => (s.info.tutor.id == info.tutor.id) && (s.info.ts.id == info.ts.id));

    if (user_socket && tutor_socket) {
        console.log(user_socket.info.user.id, tutor_socket.info.tutor.id);
        user_socket.emit("sessionStart", { initiator: false });
        tutor_socket.emit("sessionStart", { initiator: true });
    } else {
        console.log('error couldnt find the user or tutor to webrt bad session', user_socket, tutor_socket);
    }
}

async function getTutors(data, cb) {
    let available_tutors = await getLiveTutors();
    cb(available_tutors);
}

async function goLive(data) {
    if (tutor) {
        tutor.status = 'available'
        await tutor.save();
        let available_tutors = await getLiveTutors();
        io.emit("tutorsChanged", available_tutors);
    } else {
        socket.emit('redirect', '/');
    }
}

async function relayMsg() {

}


async function notifyOther(socket, type, data) {
    let s = connections.find(c => c.id == socket.id);
    let ts = null;
    let other = null;

    if (s.tutor_id) {
        ts = await TutorSession.findOne({ tutor: s.tutor_id, status: 'insession' });
        if (!ts) return console.log('no sesion found tutor');
        other = await connections.find(x => x.user_id == ts.user);
    } else {
        ts = await TutorSession.findOne({ user: s.user_id, status: 'insession' });
        if (!ts) return console.log('no sesion found user');
        other = await connections.find(x => x.tutor_id == ts.tutor);
    }
    console.log(type, 'message sent');
    console.log(s.tutor_id, s.user_id);
    other.emit(type, data);
}

async function getLiveTutors() {
    let arr = [];
    let tutors = connections.filter(s => s.info.tutor);

    for (let s of tutors) {

        let tutor = await Tutor.findById(s.info.tutor);
        if (tutor.status != 'available') continue;

        let link = `/tutors/${tutor.id}`,
            name = `${tutor.firstName} ${tutor.lastName}`,
            imgUrl = tutor.picture,
            subjects = tutor.subjects;

        arr.push({ link, name, imgUrl, subjects });
    }
    return arr;
}

module.exports = {
    attachServer: async (server) => {
        io.listen(server);
    },
    attachSession: (s) => session = s,
    requestTutor: requestTutor
};