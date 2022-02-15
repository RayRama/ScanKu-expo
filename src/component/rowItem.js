import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export const RowItem = ({ title, onPress, leftIcon }) => {
  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity onPress={onPress} style={styles.row}>
        {leftIcon}
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const RowSeparator = () => <View style={styles.separator}></View>;

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    color: "#222",
    fontSize: 16,
    marginHorizontal: 16,
    textAlign: "left",
  },
  separator: {
    backgroundColor: "#222",
    height: StyleSheet.hairlineWidth,
    width: "100%",
    marginLeft: 25,
  },
});
