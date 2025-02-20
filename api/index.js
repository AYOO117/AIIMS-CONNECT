const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json()); // Use built-in JSON parser

// MongoDB Connection (Hardcoded)
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

// Save checklist data
const Checklist = require("./models/CheckList");

app.post("/saveChecklist", async (req, res) => {
  try {
    const newChecklist = new Checklist(req.body);
    await newChecklist.save();
    res.status(201).json({ message: "Checklist saved successfully" });
  } catch (error) {
    console.error("❌ Error saving checklist:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Fetch all checklists
app.get("/getChecklist/:patientId", async (req, res) => {
  try {
    const checklist = await Checklist.findOne({
      patientId: req.params.patientId,
    });
    if (!checklist) {
      return res.status(404).json({ message: "Checklist not found" });
    }
    res.status(200).json(checklist);
  } catch (error) {
    console.error("❌ Error fetching checklist:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
