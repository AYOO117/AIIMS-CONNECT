import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface SignOutFormProps {
  onClose: () => void;
  patientId: string;
}

const SignOutForm: React.FC<SignOutFormProps> = ({ onClose, patientId }) => {
  return (
    <View>
      <Text>SignOutForm</Text>
    </View>
  );
};

export default SignOutForm;

const styles = StyleSheet.create({});
