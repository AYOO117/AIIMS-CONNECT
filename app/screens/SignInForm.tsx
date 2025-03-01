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
import Checkbox from "expo-checkbox";
import axios from "axios";

interface SignInScreenProps {
  navigation: any;
  route: any;
}

const API_URL = "http://192.168.1.5:8000";

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation, route }) => {
  const { patientId } = route.params;

  const [signIn, setSignIn] = useState<Record<string, boolean>>({
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
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSignIn = async () => {
      try {
        const response = await axios.get(`${API_URL}/getSignIn/${patientId}`);
        if (response.data) {
          setSignIn(response.data.signIn || {});
        }
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
      await axios.put(`${API_URL}/updateSignIn/${patientId}`, { signIn });
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
            <View key={key} style={styles.checkboxContainer}>
              <Checkbox
                value={signIn[key]}
                onValueChange={() =>
                  setSignIn((prev) => ({
                    ...prev,
                    [key]: !prev[key],
                  }))
                }
                color={signIn[key] ? "#4CAF50" : undefined}
              />
              <Text style={styles.checkboxLabel}>{key}</Text>
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
      <Pressable onPress={saveSignIn} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </Pressable>
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
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
  closeButton: {
    backgroundColor: "#D32F2F",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
