import {
  View,
  Text,
  ScrollView,
  Pressable,
  FlexAlignType,
  ViewStyle,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

import { NavigationProp } from "@react-navigation/native";

export default function index({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const handleSignOut = () => {
    FIREBASE_AUTH.signOut();
    navigation.navigate("Login"); // Ensure "Login" exists in your navigator
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient colors={["#4B79A1", "#283E51"]} style={{ flex: 1 }}>
        {/* Top Header (Fixed) */}
        <View
          style={{
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(255,255,255,0.3)",
            paddingVertical: 15,
          }}
        >
          <FontAwesome5 name="hospital-user" size={24} color="black" />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>AIIMS-CONN</Text>
          <Entypo name="lock" size={24} color="black" />
        </View>

        {/* Centered Buttons */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          {/* Patient List Button */}
          <Pressable
            onPress={() => navigation.navigate("PatientList")}
            style={styles.button}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="people" size={26} color="black" />
            </View>
            <Text style={styles.buttonText}>Patient List</Text>
          </Pressable>

          {/* Ready for OT Button */}
          <Pressable
            onPress={() => navigation.navigate("ReadyForOT")}
            style={styles.button}
          >
            <View style={styles.iconContainer}>
              <FontAwesome5 name="check-circle" size={26} color="black" />
            </View>
            <Text style={styles.buttonText}>Ready for OT</Text>
          </Pressable>
        </View>

        {/* Sign Out Button at Bottom */}
        <View style={styles.signOutContainer}>
          <Pressable onPress={handleSignOut} style={styles.signOutButton}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

// ✅ Beautiful Styling
import { TextStyle } from "react-native";

const styles: { [key: string]: ViewStyle | TextStyle } = {
  button: {
    backgroundColor: "#D3CCE3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  signOutContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  signOutButton: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  signOutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
};
