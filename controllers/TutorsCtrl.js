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
    res.render("tutors", { tutors, me });
  },

  async profile(req, res) {
    const id = req.params.id;
    Tutor.findById(id, (err, tutor) => {
      if (err) {
        console.log(err);
        return res.redirect("/tutors");
      }
      res.render("profile", { tutor });
    });
  },

  async goLive(req, res) {
    const tutor = req.user.tutor;
    res.render("videoChat");
  },

  async sessionReq(req, res) {
    //check if has payment then reidrect to video page
    //check if tutor is online else send invitation & wait for to be online
    //if both are true then direct to video page and wait for tutor to accept
    var tutor = await Tutor.findById(req.params.id);
    if (!tutor || tutor.status !== "available") {
      res.redirect("back");
    } else {
      webSocket.requestTutor(tutor.id, req.user.id, req.body.session_len, tutor.price);
      res.render("videoChat");
    }
  }
};

module.exports = tutorsController;
