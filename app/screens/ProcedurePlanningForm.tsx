import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";

interface ProcedurePlanningScreenProps {
  navigation: any;
  route: any;
}

const API_URL = "http://10.10.0.59:8000"; // Update with actual backend URL

const ProcedurePlanningScreen: React.FC<ProcedurePlanningScreenProps> = ({
  navigation,
  route,
}) => {
  const { patientId } = route.params; // Get patientId from navigation params

  const [procedurePlanning, setProcedurePlanning] = useState<
    Record<string, string>
  >({
    discussedPhysician: "N/A",
    imagingReviewed: "N/A",
    medicalHistory: "N/A",
    informedConsent: "N/A",
    cinProphylaxis: "N/A",
    specificTools: "N/A",
    fastingOrder: "N/A",
    labTestsOrdered: "N/A",
    anaesthesiologistNecessary: "N/A",
    anticoagulantStopped: "N/A",
    icuBedRequired: "N/A",
    contrastAllergy: "N/A",
  });

  const [nurseName, setNurseName] = useState("");
  const [nurseSignature, setNurseSignature] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProcedurePlanning = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/getProcedurePlanning/${patientId}`
        );

        if (response.data) {
          setProcedurePlanning(response.data.procedurePlanning || {});
          setNurseName(response.data.nurseName || "");
          setNurseSignature(response.data.nurseSignature || "");
        }
      } catch (error) {
        console.error("❌ Error fetching procedure planning data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProcedurePlanning();
  }, [patientId]);

  const saveProcedurePlanning = async () => {
    try {
      console.log("Updating Procedure Planning for patient:", patientId);

      await axios.put(`${API_URL}/updateProcedurePlanning/${patientId}`, {
        procedurePlanning,
        nurseName,
        nurseSignature,
      });

      alert("✅ Procedure Planning updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("❌ Error updating procedure planning:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Procedure Planning</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          {Object.keys(procedurePlanning).map((key) => (
            <View key={key} style={styles.rowContainer}>
              <Text style={styles.label}>{key}</Text>
              <View style={styles.buttonGroup}>
                {["YES", "NO", "N/A"].map((option) => (
                  <Pressable
                    key={option}
                    style={[
                      styles.optionButton,
                      procedurePlanning[key] === option &&
                        styles.selectedOption,
                    ]}
                    onPress={() =>
                      setProcedurePlanning((prev) => ({
                        ...prev,
                        [key]: option,
                      }))
                    }
                  >
                    <Text
                      style={
                        procedurePlanning[key] === option
                          ? styles.selectedText
                          : styles.optionText
                      }
                    >
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
          <Text style={styles.label}>Nurse Name:</Text>
          <TextInput
            style={styles.input}
            value={nurseName}
            onChangeText={setNurseName}
            placeholder="Enter nurse name"
          />
          <Text style={styles.label}>Nurse Signature:</Text>
          <TextInput
            style={styles.input}
            value={nurseSignature}
            onChangeText={setNurseSignature}
            placeholder="Enter nurse signature"
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <Pressable onPress={saveProcedurePlanning} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </Pressable>
      <Pressable onPress={() => navigation.goBack()} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </Pressable>
    </View>
  );
};

export default ProcedurePlanningScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: "row",
  },
  optionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 2,
  },
  selectedOption: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  selectedText: {
    fontSize: 14,
    color: "white",
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
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: "#D32F2F",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
