const mongoose = require("mongoose");

const signOutSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  signOut: {
    postOpNoteWritten: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    vitalSignsNormal: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    medicationRecorded: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    labTestsOrdered: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    samplesLabelled: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    resultsDiscussed: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    dischargeInstruction: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    followUpTests: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    followUpAppointment: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    resultsCommunicated: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
  },
  nurseName: { type: String, required: true },
  nurseSignature: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const SignOutModel = mongoose.model("SignOut", signOutSchema);
module.exports = SignOutModel;
