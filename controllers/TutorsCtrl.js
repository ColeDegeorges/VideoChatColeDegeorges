var Tutor = require("../models/Tutor");
var TutorSession = require("../models/Session");
var webSocket = require("../bin/websocket");

var tutorsController = {

    async searchIndex(req, res) {
        const tutors = await Tutor.find();
        let me = {};
        if (req.user && req.user.tutor) {
            me = req.user;
        }
        res.render('tutors', { tutors, me });
    },

    async profile(req, res) {
        const id = req.params.id;
        Tutor.findById(id, (err, tutor) => {
            if (err) {
                console.log(err);
                return res.redirect('/tutors');
            }
            res.render('profile', { tutor });
        });
    },

    async goLive(req, res) {
        const tutor = req.user.tutor;
        res.render('videoChat');
    },

    async sessionReq(req, res) {
        //check if has payment then reidrect to video page
        //check if tutor is online else send invitation & wait for to be online
        //if both are true then direct to video page and wait for tutor to accept
        var tutor = await Tutor.findById(req.params.id);
        if (!tutor || tutor.status !== 'available') {
            res.redirect('back');
        } else {
            var tutor_sess = new TutorSession();
            tutor_sess.tutor = tutor.id;
            tutor_sess.user = req.user.id;
            tutor_sess.duration = req.body.session_len;
            tutor_sess.price = tutor.price;
            tutor_sess.setStatus('pending');
            await tutor_sess.save();

            webSocket.requestTutor(tutor_sess);

            res.render('videoChat');
        }
    }
}


module.exports = tutorsController;


function getAllPropertyNames( obj ) {
    var props = [];

    do {
        props= props.concat(Object.getOwnPropertyNames( obj ));
    } while ( obj = Object.getPrototypeOf( obj ) );

    return props;
}