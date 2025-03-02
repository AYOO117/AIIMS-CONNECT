const mongoose = require("mongoose");

const signOutSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  signOut: {
    postOpNoteWritten: Boolean,
    vitalSignsNormal: Boolean,
    medicationRecorded: Boolean,
    labTestsOrdered: Boolean,
    samplesLabelled: Boolean,
    resultsDiscussed: Boolean,
    dischargeInstruction: Boolean,
    followUpTests: Boolean,
    followUpAppointment: Boolean,
    resultsCommunicated: Boolean,
  },
});
const SignOutModel = mongoose.model("SignOut", signOutSchema);
module.exports = SignOutModel;
