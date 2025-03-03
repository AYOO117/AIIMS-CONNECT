///////////////////////// Procedure Planning Schema //////////////////////////

const mongoose = require("mongoose");

const procedurePlanningSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  procedurePlanning: {
    discussedPhysician: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    imagingReviewed: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    medicalHistory: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    informedConsent: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    cinProphylaxis: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    specificTools: { type: String, enum: ["YES", "NO", "N/A"], default: "N/A" },
    fastingOrder: { type: String, enum: ["YES", "NO", "N/A"], default: "N/A" },
    labTestsOrdered: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    anaesthesiologistNecessary: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    anticoagulantStopped: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    icuBedRequired: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
    contrastAllergy: {
      type: String,
      enum: ["YES", "NO", "N/A"],
      default: "N/A",
    },
  },
  nurseName: { type: String, required: true },
  nurseSignature: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ProcedurePlanning = mongoose.model(
  "ProcedurePlanning",
  procedurePlanningSchema
);
module.exports = ProcedurePlanning;
