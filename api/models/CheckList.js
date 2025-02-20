const mongoose = require("mongoose");

const ChecklistSchema = new mongoose.Schema({
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
  signIn: {
    teamIntroduced: Boolean,
    allRecordsWithPatient: Boolean,
    correctPatientSide: Boolean,
    patientFasting: Boolean,
    ivAccess: Boolean,
    monitoringEquipment: Boolean,
    labTestsChecked: Boolean,
    allergiesChecked: Boolean,
    antibioticsAdministered: Boolean,
    consentDiscussed: Boolean,
  },
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
  nurseName: { type: String, required: true },
  nurseSignature: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Checklist = mongoose.model("Checklist", ChecklistSchema);
module.exports = Checklist;
