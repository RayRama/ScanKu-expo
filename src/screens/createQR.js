import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { FocusedStatusBar } from "../component/focusedStatusBar";

export default function CreateQR() {
  return (
    <View>
      <FocusedStatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <Text>Create</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
