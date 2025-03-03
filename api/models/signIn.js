const mongoose = require("mongoose");

const signInSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  signIn: {
    teamIntroduced: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    allRecordsWithPatient: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    correctPatientSide: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    patientFasting: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    ivAccess: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    monitoringEquipment: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    labTestsChecked: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    allergiesChecked: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    antibioticsAdministered: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    consentDiscussed: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
  },
  nurseName: { type: String, required: true },
  nurseSignature: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const SignInModel = mongoose.model("SignIn", signInSchema);
module.exports = SignInModel;
