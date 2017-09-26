const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const statuses = ["pending", "insession", "finished"];

const TutorSessionSchema = new mongoose.Schema({
    tutor: { type: String, required: true },
    user: { type: String, required: true },
    price: Number,
    status: {type: String, enum: statuses},
    duration : {type: Number, required: true },
    startTime: {type: Date},
    endTime: {type: Date}
}, { timestamps: true });


TutorSessionSchema.methods.setStatus = function (word) {
    if (statuses.includes(word)) {
        this.status = word;
        this.save();
    } else {
        throw new Error('incorrect status value for tutorsessoin');
    }
};

TutorSessionSchema.statics.isInSession = async function (user, tutor) {
    let ts = null;
    if (user) {
        ts = this.findOne({user, status: 'insession'});
    } else if (tutor) {
        ts = this.findOne({tutor, status: 'insession'});
    }
    return ts;
};

module.exports = mongoose.model('TutorSession', TutorSessionSchema);

