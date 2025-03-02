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

interface SignOutScreenProps {
  navigation: any;
  route: any;
}

const API_URL = "http://192.168.1.5:8000";

const SignOutScreen: React.FC<SignOutScreenProps> = ({ navigation, route }) => {
  const { patientId } = route.params;

  const [signOut, setSignOut] = useState<Record<string, boolean>>({
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
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSignOut = async () => {
      try {
        const response = await axios.get(`${API_URL}/getSignOut/${patientId}`);
        if (response.data) {
          setSignOut(response.data.signOut || {});
        }
        console.log("fetching sign-out data...");
      } catch (error) {
        console.error("❌ Error fetching sign-out data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSignOut();
  }, [patientId]);

  const saveSignOut = async () => {
    try {
      await axios.put(`${API_URL}/updateSignOut/${patientId}`, { signOut });
      alert("✅ Sign-out updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("❌ Error updating sign-out:", error);
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
      <Text style={styles.title}>Sign Out</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          {Object.keys(signOut).map((key) => (
            <View key={key} style={styles.checkboxContainer}>
              <Checkbox
                value={signOut[key]}
                onValueChange={() =>
                  setSignOut((prev) => ({
                    ...prev,
                    [key]: !prev[key],
                  }))
                }
                color={signOut[key] ? "#4CAF50" : undefined}
              />
              <Text style={styles.checkboxLabel}>{key}</Text>
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
      <Pressable onPress={saveSignOut} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </Pressable>
      <Pressable onPress={() => navigation.goBack()} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </Pressable>
    </View>
  );
};

export default SignOutScreen;

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
