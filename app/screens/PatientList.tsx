import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  Modal,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Patient } from "../../types"; // ✅ Import Patient type from types.ts
const API_URL = "http://10.10.0.59:8000"; // Update with your actual backend URL
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types"; // Adjust the import path based on your project structure

type PatientListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PatientList"
>;

const PatientList = () => {
  const navigation = useNavigation<PatientListScreenNavigationProp>();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPatient, setNewPatient] = useState({
    PatientId: "",
    PatientName: "",
    dateOfBirth: "",
    gender: "",
    ward: "",
    referringPhysician: "",
  });

  // Fetch Patients from Backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${API_URL}/patients`);
        setPatients(response.data);
      } catch (error) {
        console.error("❌ Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  // Handle New Patient Addition
  const handleAddPatient = async () => {
    if (!newPatient.PatientId || !newPatient.PatientName) {
      alert("⚠️ Patient ID and Name are required!");
      return;
    }
    try {
      console.log("🟢 Sending data:", newPatient);

      const response = await axios.post(`${API_URL}/register`, newPatient, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Response from server:", response.data);
      setPatients([...patients, response.data.patient]);
      setModalVisible(false);
      setNewPatient({
        PatientId: "",
        PatientName: "",
        dateOfBirth: "",
        gender: "",
        ward: "",
        referringPhysician: "",
      });

      alert("✅ Patient added successfully!");
    } catch (error) {
      console.error("❌ Error adding patient:", error);
    }
  };

  return (
    <LinearGradient colors={["#4B79A1", "#283E51"]} style={{ flex: 1 }}>
      {/* Top Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>Patient List</Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={30} color="black" />
        </Pressable>
      </View>

      {/* Patient List */}
      <FlatList
        data={patients}
        keyExtractor={(item) => item.PatientId}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Pressable
            style={styles.patientCard}
            onPress={() => navigation.navigate("Detail", { patient: item })} // ✅ Pass patient data
          >
            <Text style={styles.patientName}>{item.PatientName}</Text>
            <Text style={styles.patientDetails}>ID: {item.PatientId}</Text>
          </Pressable>
        )}
      />

      {/* Add Patient Form Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Register New Patient</Text>
            <TextInput
              style={styles.input}
              placeholder="Patient Name"
              value={newPatient.PatientName}
              onChangeText={(text) =>
                setNewPatient({ ...newPatient, PatientName: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Patient ID"
              value={newPatient.PatientId}
              onChangeText={(text) =>
                setNewPatient({ ...newPatient, PatientId: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Date of Birth (DD/MM/YYYY)"
              value={newPatient.dateOfBirth}
              onChangeText={(text) =>
                setNewPatient({ ...newPatient, dateOfBirth: text })
              }
            />

            {/* Gender Selection */}
            <View style={styles.genderContainer}>
              <Pressable
                style={[
                  styles.genderButton,
                  newPatient.gender === "Male" && styles.selectedGender,
                ]}
                onPress={() => setNewPatient({ ...newPatient, gender: "Male" })}
              >
                <Text style={styles.genderText}>Male</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.genderButton,
                  newPatient.gender === "Female" && styles.selectedGender,
                ]}
                onPress={() =>
                  setNewPatient({ ...newPatient, gender: "Female" })
                }
              >
                <Text style={styles.genderText}>Female</Text>
              </Pressable>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Ward"
              value={newPatient.ward}
              onChangeText={(text) =>
                setNewPatient({ ...newPatient, ward: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Referring Physician"
              value={newPatient.referringPhysician}
              onChangeText={(text) =>
                setNewPatient({ ...newPatient, referringPhysician: text })
              }
            />

            <View style={styles.modalButtons}>
              <Pressable style={styles.addButton} onPress={handleAddPatient}>
                <Text style={styles.buttonText}>Add Patient</Text>
              </Pressable>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonTextSecondary}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default PatientList;

// ✅ Styles
const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.3)",
    paddingVertical: 15,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  listContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  patientCard: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  patientName: { fontSize: 18, fontWeight: "bold" },
  patientDetails: { fontSize: 14, color: "#708090", fontWeight: "bold" },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "90%",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    width: "100%",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  genderButton: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
  },
  selectedGender: { backgroundColor: "#4CAF50" },
  genderText: { fontSize: 16, fontWeight: "bold" },

  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  cancelButton: {
    backgroundColor: "#FF5722",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextSecondary: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
