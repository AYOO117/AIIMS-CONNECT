import React, { useState, useEffect } from "react"; // ✅ Import useState and useEffect
import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import CheckBox from "@react-native-community/checkbox"; // ✅ Ensure CheckBox is imported
import { useNavigation, useRoute } from "@react-navigation/native"; // ✅ Import navigation hooks

const API_URL = "http://10.10.0.59:8000"; // 🔹 Replace with your actual PC IP

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const patient = route.params?.patient; // ✅ Ensure the patient data is passed correctly

  if (!patient) {
    return (
      <LinearGradient
        colors={["#4B79A1", "#283E51"]}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
          Loading patient details...
        </Text>
      </LinearGradient>
    );
  }

  const [checklist, setChecklist] = useState({
    procedurePlanning: {
      discussedPhysician: false,
      imagingReviewed: false,
      medicalHistory: false,
      informedConsent: false,
      cinProphylaxis: false,
      specificTools: false,
      fastingOrder: false,
      labTestsOrdered: false,
      anaesthesiologistNecessary: false,
      anticoagulantStopped: false,
      icuBedRequired: false,
      contrastAllergy: false,
    },
    signIn: {
      teamIntroduced: false,
      allRecordsWithPatient: false,
      correctPatientSide: false,
      patientFasting: false,
      ivAccess: false,
      monitoringEquipment: false,
      labTestsChecked: false,
      allergiesChecked: false,
      antibioticsAdministered: false,
      consentDiscussed: false,
    },
    signOut: {
      postOpNoteWritten: false,
      vitalSignsNormal: false,
      medicationRecorded: false,
      labTestsOrdered: false,
      samplesLabelled: false,
      resultsDiscussed: false,
      dischargeInstruction: false,
      followUpTests: false,
      followUpAppointment: false,
      resultsCommunicated: false,
    },
    nurseName: "",
    nurseSignature: "",
  });

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/getChecklist/${patient.PatientId}`
        );
        if (response.data) {
          setChecklist(response.data);
        }
      } catch (error) {
        console.error("❌ Error fetching checklist:", error);
      }
    };
    fetchChecklist();
  }, []);

  const saveChecklist = async () => {
    try {
      await axios.post(`${API_URL}/saveChecklist`, {
        patientId: patient.PatientId,
        ...checklist,
      });
      alert("✅ Checklist saved successfully!");
    } catch (error) {
      console.error("❌ Error saving checklist:", error);
    }
  };

  return (
    <LinearGradient colors={["#4B79A1", "#283E51"]} style={{ flex: 1 }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>Patient Checklist</Text>
      </View>

      <View>
        <Text style={styles.sectionTitle}>Procedure Planning</Text>
        <CheckBox
          value={checklist.procedurePlanning.discussedPhysician}
          onValueChange={() =>
            setChecklist({
              ...checklist,
              procedurePlanning: {
                ...checklist.procedurePlanning,
                discussedPhysician:
                  !checklist.procedurePlanning.discussedPhysician,
              },
            })
          }
        />
        <Text>Discussed Referring Physician</Text>
      </View>

      <Pressable onPress={saveChecklist} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Checklist</Text>
      </Pressable>
    </LinearGradient>
  );
};

export default Detail;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginVertical: 10 },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
