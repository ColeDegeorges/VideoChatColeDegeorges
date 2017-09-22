var Tutor = require("../models/Tutor");
var tutorsController = {};

tutorsController.searchIndex = async function (req, res) {
    const tutors = await Tutor.find();
    res.render('tutors', { tutors });
};

tutorsController.profile = async function (req, res) {
    const id = req.params.id;
    Tutor.findById(id, (err, tutor) => { 
        if (err) {
            console.log(err);
            return res.redirect('/tutors');
        }
        res.render('profile', { tutor });
    });
};


tutorsController.goLive = async function (req, res) {
    const tutors = await Tutor.find();
    res.render('videoChat');
};

module.exports = tutorsController;