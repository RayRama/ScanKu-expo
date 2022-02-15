import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Clipboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import * as Clipboard from "expo-clipboard";

import { FocusedStatusBar } from "../component/focusedStatusBar";
import { RowItem, RowSeparator } from "../component/rowItem";

export default function CreateQR({ navigation }) {
  const [copiedText, setCopiedText] = useState("");

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString().then((data) => {
      if (data === "null") {
        alert("Clipboard not found !");
      } else {
        // setCopiedText(data);
        navigation.push("DetailQR", { createOptions: "Clipboard", data: data });
      }
    });
  };

  return (
    <View style={styles.container}>
      <FocusedStatusBar barStyle="light-content" backgroundColor="#222" />

      <RowItem
        title="Create from clipboard"
        onPress={() => fetchCopiedText()}
        leftIcon={
          <View
            style={{
              backgroundColor: "green",
              height: 36,
              width: 36,
              borderRadius: 18,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="clipboard" size={18} color="white" />
          </View>
        }
      />
      <RowSeparator />

      <RowItem
        title="Text"
        onPress={() => navigation.push("DetailQR", { data: "" })}
        leftIcon={
          <View
            style={{
              backgroundColor: "green",
              height: 36,
              width: 36,
              borderRadius: 18,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="ios-text" size={18} color="white" />
          </View>
        }
      />
      <RowSeparator />

      <RowItem
        title="URL"
        onPress={() => alert("todo")}
        leftIcon={
          <View
            style={{
              backgroundColor: "green",
              height: 36,
              width: 36,
              borderRadius: 18,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="link" size={18} color="white" />
          </View>
        }
      />
      <RowSeparator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
  },
});
