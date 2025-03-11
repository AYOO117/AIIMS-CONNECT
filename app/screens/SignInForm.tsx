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

interface SignInScreenProps {
  navigation: any;
  route: any;
  userRole: string | null;
}

const API_URL = "http://192.168.198.119:8000";

const SignInScreen: React.FC<SignInScreenProps> = ({
  navigation,
  route,
  userRole,
}) => {
  const { patientId } = route.params;

  const [signIn, setSignIn] = useState<Record<string, string>>({
    teamIntroduced: "N/A",
    allRecordsWithPatient: "N/A",
    correctPatientSide: "N/A",
    patientFasting: "N/A",
    ivAccess: "N/A",
    monitoringEquipment: "N/A",
    labTestsChecked: "N/A",
    allergiesChecked: "N/A",
    antibioticsAdministered: "N/A",
    consentDiscussed: "N/A",
  });

  const [nurseName, setNurseName] = useState("");
  const [nurseSignature, setNurseSignature] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSignIn = async () => {
      try {
        const response = await axios.get(`${API_URL}/getSignIn/${patientId}`);
        if (response.data) {
          setSignIn(response.data.signIn || {});
          setNurseName(response.data.nurseName || "");
          setNurseSignature(response.data.nurseSignature || "");
        }
        console.log("fetching sign-out data...");
      } catch (error) {
        console.error("❌ Error fetching sign-in data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSignIn();
  }, [patientId]);

  const saveSignIn = async () => {
    try {
      await axios.put(`${API_URL}/updateSignIn/${patientId}`, {
        signIn,
        nurseName,
        nurseSignature,
      });
      alert("✅ Sign-In updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("❌ Error updating sign-in:", error);
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
      <Text style={styles.title}>Sign In</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          {Object.keys(signIn).map((key) => (
            <View key={key} style={styles.rowContainer}>
              <Text style={styles.label}>{key}</Text>
              <View style={styles.buttonGroup}>
                {["YES", "NO", "N/A"].map((option) => (
                  <Pressable
                    key={option}
                    style={[
                      styles.optionButton,
                      signIn[key] === option && styles.selectedOption,
                      userRole === "doctor" && styles.disabledButton,
                    ]}
                    onPress={() => {
                      if (userRole !== "doctor") {
                        setSignIn((prev) => ({ ...prev, [key]: option }));
                      }
                    }}
                    disabled={userRole === "doctor"} // Prevent clicking for doctors
                  >
                    <Text
                      style={
                        signIn[key] === option
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
            style={[
              styles.input,
              userRole === "doctor" && styles.disabledInput,
            ]} // Disable for doctors
            value={nurseName}
            onChangeText={setNurseName}
            placeholder="Enter nurse name"
            editable={userRole !== "doctor"} // Prevent typing for doctors
          />
          <Text style={styles.label}>Nurse Signature:</Text>
          <TextInput
            style={[
              styles.input,
              userRole === "doctor" && styles.disabledInput,
            ]} // Disable for doctors
            value={nurseSignature}
            onChangeText={setNurseSignature}
            placeholder="Enter nurse signature"
            editable={userRole !== "doctor"} // Prevent typing for doctors
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ✅ Hide Save Button for Doctors */}
      {userRole !== "doctor" && (
        <Pressable onPress={saveSignIn} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      )}

      <Pressable onPress={() => navigation.goBack()} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </Pressable>
    </View>
  );
};

export default SignInScreen;

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
  disabledInput: {
    backgroundColor: "#e0e0e0",
    color: "#a0a0a0",
  },
  disabledButton: {
    backgroundColor: "#d3d3d3",
    borderColor: "#a0a0a0",
  },
});
