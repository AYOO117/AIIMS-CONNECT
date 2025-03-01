const mongoose = require("mongoose");

const procedurePlanningSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  procedurePlanning: {
    discussedPhysician: Boolean,
    imagingReviewed: Boolean,
    medicalHistory: Boolean,
    informedConsent: Boolean,
    cinProphylaxis: Boolean,
    specificTools: Boolean,
    fastingOrder: Boolean,
    labTestsOrdered: Boolean,
    anaesthesiologistNecessary: Boolean,
    anticoagulantStopped: Boolean,
    icuBedRequired: Boolean,
    contrastAllergy: Boolean,
  },
  nurseName: { type: String, required: true },
  nurseSignature: { type: String, required: true },
  // createdAt: { type: Date, default: Date.now },
});

const ProcedurePlanning = mongoose.model(
  "procedurePlanning",
  procedurePlanningSchema
);
module.exports = ProcedurePlanning;
