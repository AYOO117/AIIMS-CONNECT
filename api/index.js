const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (Atlas)
mongoose
  .connect(
    "mongodb+srv://ayush117:ayush117@cluster1.zi0br.mongodb.net/AIIMS-CONN",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// Import Patient Model
const Patient = require("./models/Patients");

// Register a new patient
app.post("/register", async (req, res) => {
  try {
    const {
      PatientId,
      PatientName,
      dateOfBirth,
      gender,
      ward,
      referringPhysician,
    } = req.body;
    const newPatient = new Patient({
      PatientId,
      PatientName,
      dateOfBirth,
      gender,
      ward,
      referringPhysician,
    });
    await newPatient.save();
    res
      .status(201)
      .json({ message: "✅ Patient added successfully!", patient: newPatient });
  } catch (error) {
    console.error("❌ Error adding patient:", error);
    res.status(500).json({ message: "❌ Internal Server Error" });
  }
});

// Fetch all patients
app.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    console.error("❌ Error fetching patients:", error);
    res.status(500).json({ message: "Failed to retrieve the patients" });
  }
});

//////////////////////////////////////////////////
///////////Procedure Planning////////////////////
////////////////////////////////////////////////
// Import Procedure Planning Model
const ProcedurePlanningModel = require("./models/procedurePlanning");

// Fetch Procedure Planning by Patient ID
app.get("/getProcedurePlanning/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const procedurePlanning = await ProcedurePlanningModel.findOne({
      patientId,
    });

    if (!procedurePlanning) {
      return res.status(404).json({ message: "Procedure planning not found" });
    }

    res.status(200).json(procedurePlanning);
  } catch (error) {
    console.error("❌ Backend error fetching procedure planning:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create or Update Procedure Planning Data
app.put("/updateProcedurePlanning/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const { procedurePlanning, nurseName, nurseSignature } = req.body;

    const existingEntry = await ProcedurePlanningModel.findOne({ patientId });

    if (existingEntry) {
      // Update existing entry
      await ProcedurePlanningModel.updateOne(
        { patientId },
        { $set: { procedurePlanning, nurseName, nurseSignature } }
      );
      return res
        .status(200)
        .json({ message: "✅ Procedure Planning updated successfully" });
    } else {
      // Create new entry if not found
      const newEntry = new ProcedurePlanningModel({
        patientId,
        procedurePlanning,
        nurseName,
        nurseSignature,
      });
      await newEntry.save();
      return res
        .status(201)
        .json({ message: "✅ Procedure Planning created successfully" });
    }
  } catch (error) {
    console.error("❌ Error saving procedure planning:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//////////////////////////////////////////////////
//////////////////Sign In////////////////////////
////////////////////////////////////////////////

//////////////////////////////////////////////////
/////////////////Sign Out////////////////////////
////////////////////////////////////////////////
// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
