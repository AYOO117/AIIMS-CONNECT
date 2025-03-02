const mongoose = require("mongoose");

const signInSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
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
});
const SignInModel = mongoose.model("SignIn", signInSchema);
module.exports = SignInModel;
