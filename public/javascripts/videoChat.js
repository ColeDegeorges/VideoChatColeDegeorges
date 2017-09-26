var socket = io.connect();

socket.on('connect', function (data) {
    console.log('sending event: going live');
    socket.emit('going live');
});


socket.on('sessionRequest', function (data) {
    var pop = confirm(data.name + ' is requesting tutoring for: ' + data.minutes + ' minutes?');
    if (pop) {
        socket.emit('sessionAccepted', data.id);
    } else {
        socket.emit('sessionRejected', data.id);
    }
});

socket.on('sessionstart', function (data) {
    alert('start');
    setupWebRTC(data.initiator);
});


class SignalingCtrl {
    constructor() {
        this.onPeerICE = null;
        this.onSDPoffer = null;
        this.onSDPanswer = null;

        socket.on('icecandidate', d => this.onPeerICE(d));
        socket.on('SDPoffer', d => this.onSDPoffer(d));
        socket.on('SDPanswer', d => this.onSDPanswer(d));

    }

    send(type, data) {
        socket.emit(type, data);
    }

}

async function setupWebRTC(initiator) {
    let v = document.getElementById('rtc_video');
    let local_video = document.getElementById('my_video');
    let configuration = { 'iceServers': [{ 'urls': 'stun:stun.example.org' }] };
    let rpc = new SignalingCtrl();
    let pc = new RTCPeerConnection(configuration);
    window.pc1 = pc;



    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    stream.getTracks().forEach(track => pc.addTrack(track, stream));
    local_video.srcObject = stream;

    pc.oniceconnectionstatechange = e => console.log('pc', pc.iceConnectionState);
    pc.onicecandidate = e => rpc.send('icecandidate', { candidate: e.candidate });
    pc.oniceconnectionstatechange = e => console.log('pc', pc.iceConnectionState);
    pc.onnegotiationneeded = async e => {
        if (!initiator) return;
        await pc.setLocalDescription(await pc.createOffer({ offerToReceiveAudio: 0, offerToReceiveVideo: 1 }));
        rpc.send('SDPoffer', { sdp: pc.localDescription });
    };

    rpc.onPeerICE = e => { if (e && e.candidate) pc.addIceCandidate(new RTCIceCandidate(e.candidate)) };
    rpc.onSDPoffer = async offer => {
        await pc.setRemoteDescription(new RTCSessionDescription(offer.sdp));
        await pc.setLocalDescription(await pc.createAnswer({ offerToReceiveAudio: 0, offerToReceiveVideo: 1 }));
        rpc.send('SDPanswer', { sdp: pc.localDescription });
    }
    rpc.onSDPanswer = async offer => {
        await pc.setRemoteDescription(new RTCSessionDescription(offer.sdp));
    }

    pc.ontrack = e => v.srcObject = e.streams[0];


}




// function setupWebRTC(initiator) {
//     let v = document.getElementById('rtc_video');
//     let me = document.getElementById('my_video');
//     let signalCtrl = new SignalingCtrl();
//     let configuration = { 'iceServers': [{ 'urls': 'stun:stun.example.org' }] };
//     let pc = new RTCPeerConnection(configuration);
//     let stack = [];
//     window.pc = pc; 
//     function unloadStack() {
//         let t = null;
//         while (t = stack.shift()) {
//             console.log('added ice from stack');
//             pc.e => pc.addIceCandidate(e)Candidate(new RTCIceCandidate(t.candidate)).catch(logErr);
//         }
//     }


//     //when get ice tell remote peer
//     pc.onicecandidate = e => {
//         if (!e || !e.candidate) return;
//         signalCtrl.send('icecandidate', { candidate: e.candidate })
//     };

//     pc.ontrack = e => v.srcObject = e.streams[0];
//     pc.oniceconnectionstatechange = e => console.log(pc.iceConnectionState);

//     if (initiator) {
//         console.log('im intiating');
//         pc.createOffer({ offerToReceiveAudio: 1, offerToReceiveVideo: 1 }).
//             then(offer => pc.setLocalDescription(offer)).
//             catch(logErr);
//     }

//     pc.onnegotiationneeded = e => {
//         if (initiator) {
//             console.log('sending sdp offer');
//             signalCtrl.send('SDPoffer', { sdp: pc.localDescription });
//         }
//     }


//     signalCtrl.onPeerICE = e => pc.addIceCandidate(e);   //when get ice from remote peer add it
//     signalCtrl.onSDPoffer = debounce(createAnswer);   //when and if get an offer reply with answer
//     signalCtrl.onSDPanswer = debounce(answerHandler);   //if get an answer add it


//     function addIce(e) {
//         console.log('got ice candidate');
//         if (pc.remoteDescription.sdp == '') {
//             stack.push(e); console.log('added to stack');
//         } else {
//             pc.addIceCandidate(new RTCIceCandidate(e.candidate)).catch(logErr);
//         }
//     };

//     function createAnswer(e) {
//         return new Promise((resolve, reject) => {
//             console.log('got offer', e.sdp);
//             pc.setRemoteDescription(new RTCSessionDescription(e.sdp))
//                 .then(() => pc.createAnswer({ offerToReceiveAudio: 1, offerToReceiveVideo: 1 }))
//                 .then(answer => pc.setLocalDescription(answer))
//                 .then(() => unloadStack())
//                 .then(() => signalCtrl.send('SDPanswer', { sdp: pc.localDescription }))
//                 .then(setTimeout(() => resolve(), 1000))
//                 .catch(logErr);
//         });
//     }

//     async function answerHandler(e) {
//         return new Promise((resolve, reject) => {
//             console.log('got answer');
//             console.log(e);
//             pc.setRemoteDescription(new RTCSessionDescription(e.sdp))
//                 .then(() => unloadStack())
//                 .catch(logErr);
//             resolve();
//         });
//     }

//     //get camera and add it to RTC connection
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//         stream.getTracks().forEach(track => pc.addTrack(track, stream));
//         me.srcObject = stream;
//     }).catch(logErr);

// }

function debounce(func) {
    let p = Promise.resolve();

    return function (x) {
        p = p.then(() => func(x));
    }
}

function logErr(err) {
    console.log(err);
}
// var signalingChannel = new SignalingChannel();
// var configuration = {
//   'iceServers': [{'urls': 'stun:stun.example.org'}]
// };

// var pc;

// // call start() to initiate

// function start() {
//   pc = new RTCPeerConnection(configuration);

//   // send any ice candidates to the other peer
//   pc.onicecandidate = function (evt) {
//     if (evt.candidate)
//       signalingChannel.send(JSON.stringify({
//         'candidate': evt.candidate
//       }));
//   };

//   // let the 'negotiationneeded' event trigger offer generation
//   pc.onnegotiationneeded = function () {
//     pc.createOffer(localDescCreated, logError);
//   }

//   // once remote stream arrives, show it in the remote video element
//   pc.onaddstream = function (evt) {
//     remoteView.src = URL.createObjectURL(evt.stream);
//   };

//   // get a local stream, show it in a self-view and add it to be sent
//   navigator.getUserMedia({
//     'audio': true,
//     'video': true
//   }, function (stream) {
//     selfView.src = URL.createObjectURL(stream);
//     pc.addStream(stream);
//   }, logError);
// }

// function localDescCreated(desc) {
//   pc.setLocalDescription(desc, function () {
//     signalingChannel.send(JSON.stringify({
//       'sdp': pc.localDescription
//     }));
//   }, logError);
// }

// signalingChannel.onmessage = function (evt) {
//   if (!pc)
//     start();

//   var message = JSON.parse(evt.data);
//   if (message.sdp)
//     pc.setRemoteDescription(new RTCSessionDescription(message.sdp), function () {
//       // if we received an offer, we need to answer
//       if (pc.remoteDescription.type == 'offer')
//         pc.createAnswer(localDescCreated, logError);
//     }, logError);
//   else
//     pc.addIceCandidate(new RTCIceCandidate(message.candidate));
// };

// function logError(error) {
//   log(error.name + ': ' + error.message);
// }