const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  PatientId: { type: String, required: true, unique: true },
  PatientName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  ward: { type: String, required: true },
  referringPhysician: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;
