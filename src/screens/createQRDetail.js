import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";

const screen = Dimensions.get("window");

export default function DetailQR({ navigation, route = {} }) {
  const params = route.params || {};
  const { createOptions, data } = params;
  const [textData, setTextData] = useState(data);

  useLayoutEffect(() => {
    navigation.setParams({ data: textData });
  }, [textData]);
  // console.log(textData.length);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Hello, world!"
        value={textData}
        onChangeText={(value) => setTextData(value)}
        autoFocus={true}
        // editable={createOptions === "Clipboard" ? false : true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    width: screen.width,
    height: 40,
    paddingHorizontal: 10,
    borderColor: "#85B6FF",
    borderBottomWidth: 2,
  },
});
