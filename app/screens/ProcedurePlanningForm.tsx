// import React, { useState, useEffect } from "react";
// import {
//   Modal,
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
// } from "react-native";
// import Checkbox from "expo-checkbox";
// import axios from "axios";
// import { KeyboardAvoidingView, Platform } from "react-native";

// interface ProcedurePlanningFormProps {
//   onClose: () => void;
//   patientId: string;
// }
// const API_URL = "http://10.10.0.59:8000"; // Update with actual backend URL

// const ProcedurePlanningForm: React.FC<ProcedurePlanningFormProps> = ({
//   onClose,
//   patientId,
// }) => {
//   const [procedurePlanning, setProcedurePlanning] = useState({
//     discussedPhysician: false,
//     imagingReviewed: false,
//     medicalHistory: false,
//     informedConsent: false,
//     cinProphylaxis: false,
//     specificTools: false,
//     fastingOrder: false,
//     labTestsOrdered: false,
//     anaesthesiologistNecessary: false,
//     anticoagulantStopped: false,
//     icuBedRequired: false,
//     contrastAllergy: false,
//   });

//   const [nurseName, setNurseName] = useState("");
//   const [nurseSignature, setNurseSignature] = useState("");
//   const [loading, setLoading] = useState(true);

//   // Fetch existing procedure planning data
//   useEffect(() => {
//     const fetchProcedurePlanning = async () => {
//       try {
//         const response = await axios.get(
//           `${API_URL}/getProcedurePlanning/${patientId}`
//         );

//         if (response.data) {
//           setProcedurePlanning(response.data.procedurePlanning || {});
//           setNurseName(response.data.nurseName || "");
//           setNurseSignature(response.data.nurseSignature || "");
//         }
//       } catch (error) {
//         console.error("❌ Error fetching procedure planning data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProcedurePlanning();
//   }, [patientId]);

//   // Save procedure planning data
//   const saveProcedurePlanning = async () => {
//     try {
//       console.log("Updating Procedure Planning for patient:", patientId);

//       await axios.put(`${API_URL}/updateProcedurePlanning/${patientId}`, {
//         procedurePlanning,
//         nurseName,
//         nurseSignature,
//       });

//       alert("✅ Procedure Planning updated successfully!");
//       onClose();
//     } catch (error) {
//       console.error("❌ Error updating procedure planning:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.modalOverlay}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.modalOverlay}>
//       <View style={styles.modalContent}>
//         <Text style={styles.title}>Procedure Planning</Text>
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={{ flex: 1 }}
//         >
//           <ScrollView keyboardShouldPersistTaps="handled">
//             {Object.keys(procedurePlanning).map((key) => (
//               <View key={key} style={styles.checkboxContainer}>
//                 <Checkbox
//                   value={procedurePlanning[key]}
//                   onValueChange={() =>
//                     setProcedurePlanning((prev) => ({
//                       ...prev,
//                       [key]: !prev[key],
//                     }))
//                   }
//                   color={procedurePlanning[key] ? "#4CAF50" : undefined}
//                 />
//                 <Text style={styles.checkboxLabel}>{key}</Text>
//               </View>
//             ))}

//             {/* Nurse Name Input */}
//             <Text style={styles.label}>Nurse Name:</Text>
//             <TextInput
//               style={styles.input}
//               value={nurseName}
//               onChangeText={setNurseName}
//               placeholder="Enter nurse name"
//             />

//             {/* Nurse Signature Input */}
//             <Text style={styles.label}>Nurse Signature:</Text>
//             <TextInput
//               style={styles.input}
//               value={nurseSignature}
//               onChangeText={setNurseSignature}
//               placeholder="Enter nurse signature"
//             />
//           </ScrollView>
//         </KeyboardAvoidingView>

//         <Pressable onPress={saveProcedurePlanning} style={styles.saveButton}>
//           <Text style={styles.saveButtonText}>Save</Text>
//         </Pressable>
//         <Pressable onPress={onClose} style={styles.closeButton}>
//           <Text style={styles.closeButtonText}>Close</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// export default ProcedurePlanningForm;

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     width: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//     width: "80%",
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   checkboxContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 5,
//   },
//   checkboxLabel: {
//     marginLeft: 10,
//     fontSize: 16,
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     padding: 10,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   saveButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   closeButton: {
//     backgroundColor: "#D32F2F",
//     padding: 10,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 5,
//   },
//   closeButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   label: {
//     fontSize: 16,
//     marginTop: 10,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 12,
//     width: "100%",
//   },
// });

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

interface ProcedurePlanningScreenProps {
  navigation: any;
  route: any;
}

const API_URL = "http://192.168.1.5:8000"; // Update with actual backend URL

const ProcedurePlanningScreen: React.FC<ProcedurePlanningScreenProps> = ({
  navigation,
  route,
}) => {
  const { patientId } = route.params; // Get patientId from navigation params

  const [procedurePlanning, setProcedurePlanning] = useState<
    Record<string, boolean>
  >({
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
      navigation.goBack(); // Go back to the previous screen after saving
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
            <View key={key} style={styles.checkboxContainer}>
              <Checkbox
                value={procedurePlanning[key]}
                onValueChange={() =>
                  setProcedurePlanning((prev) => ({
                    ...prev,
                    [key]: !prev[key],
                  }))
                }
                color={procedurePlanning[key] ? "#4CAF50" : undefined}
              />
              <Text style={styles.checkboxLabel}>{key}</Text>
            </View>
          ))}
          {/*Nurse Name Input*/}
          <Text style={styles.label}>Nurse Name:</Text>
          <TextInput
            style={styles.input}
            value={nurseName}
            onChangeText={setNurseName}
            placeholder="Enter nurse name"
          />
          {/* Nurse Signature Input */}
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
  label: {
    fontSize: 16,
    marginTop: 10,
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
});
