import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { Patient } from "../../types";

const Detail = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  type RouteParams = {
    params: {
      patient: Patient;
    };
  };
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const patient = route.params?.patient;

  const navigateToForm = (
    formType: "ProcedurePlanningForm" | "SignInForm" | "SignOutForm"
  ) => {
    navigation.navigate(formType, { patientId: patient.PatientId });
  };

  return (
    <LinearGradient colors={["#4B79A1", "#283E51"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </Pressable>
          <Text style={styles.title}>Patient Details</Text>
          <Text style={styles.label}>Name: {patient.PatientName}</Text>
          <Text style={styles.label}>ID: {patient.PatientId}</Text>
          <Text style={styles.label}>DOB: {patient.dateOfBirth}</Text>
          <Text style={styles.label}>Gender: {patient.gender}</Text>
          <Text style={styles.label}>Ward: {patient.ward}</Text>
          <Text style={styles.label}>
            Referring Physician: {patient.referringPhysician}
          </Text>

          <View style={styles.cardContainer}>
            <Pressable
              style={styles.card}
              onPress={() => navigateToForm("ProcedurePlanningForm")}
            >
              <Text style={styles.cardText}>Procedure Planning</Text>
            </Pressable>
            <Pressable
              style={styles.card}
              onPress={() => navigateToForm("SignInForm")}
            >
              <Text style={styles.cardText}>Sign In</Text>
            </Pressable>
            <Pressable
              style={styles.card}
              onPress={() => navigateToForm("SignOutForm")}
            >
              <Text style={styles.cardText}>Sign Out</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "white",
  },
  cardContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
