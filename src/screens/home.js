import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FocusedStatusBar } from "../component/focusedStatusBar";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const screen = Dimensions.get("window");

export default function Home() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState("");
  const [widthImage, setWidthImage] = useState(0);
  const [heightImage, setHeightImage] = useState(0);
  // const [type, setType] = useState(BarCodeScanner.Constants.Type);

  const askPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.getPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };
  useEffect(() => {
    askPermission();
  }, []);

  const finderWidth = 350;
  const finderHeight = 350;

  const viewMinX = (screen.width - finderWidth) / 2;
  const viewMinY = (screen.height - finderHeight) / 2;

  const handleBarCodeScanned = ({ type, data, bounds }) => {
    // console.log(bounds.origin);
    if (bounds.origin.x >= viewMinX && bounds.origin.y >= viewMinY) {
      setScanned(true);
      alert(`Tipe barcode adalah ${type} dengan data berisi ${data}`);
    }
    // BarCodeScanner.scanFromURLAsync(imageUri);
    // alert(`Tipe barcode adalah ${type} dengan data berisi ${data}`);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={{ marginVertical: 20 }}>
          Requesting for camera permission
        </Text>

        <Button
          title="Press button to grant permission"
          onPress={() => askPermission()}
        />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ marginVertical: 20 }}>
          Requesting for camera permission
        </Text>

        <Button
          title="Press button to grant permission"
          onPress={() => askPermission()}
        />
      </View>
    );
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setWidthImage(result.width);
      setHeightImage(result.height);
      setImageUri(result.uri);
      alert(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <FocusedStatusBar barStyle="light-content" backgroundColor="#222" />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.container]}
      >
        <BarcodeMask
          edgeColor="#62B1F6"
          width={300}
          height={300}
          showAnimatedLine={false}
        />
      </BarCodeScanner>

      {/* {scanned && (
        <View style={styles.scanAgain}>
          <Button
            title={"Tap to scan again"}
            onPress={() => setScanned(false)}
          />
        </View>
      )} */}

      <View style={[styles.bottomContainer, { flexDirection: "row" }]}>
        <TouchableOpacity
          style={{ marginHorizontal: 20 }}
          onPress={() => pickImage()}
        >
          <Ionicons
            name="image"
            size={24}
            color="white"
            style={{ marginVertical: 10, alignSelf: "center" }}
          />
          <Text style={{ color: "white" }}>Scan Image</Text>
        </TouchableOpacity>

        {scanned && (
          <TouchableOpacity
            style={{ marginHorizontal: 20 }}
            onPress={() => setScanned(false)}
          >
            <Ionicons
              name="refresh"
              size={24}
              color="white"
              style={{ marginVertical: 10, alignSelf: "center" }}
            />
            <Text style={{ color: "white" }}>Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
    // <View style={styles.container}>
    //   <FocusedStatusBar barStyle="dark-content" backgroundColor="transparent" />
    //   <Camera
    //     onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
    //     ratio="16:9"
    //     style={StyleSheet.absoluteFillObject}
    //   >
    //     <BarcodeMask
    //       edgeColor="#62B1F6"
    //       width={300}
    //       height={300}
    //       showAnimatedLine={false}
    //     />
    //     {scanned && (
    //       <View style={styles.scanAgain}>
    //         <Button
    //           title={"Tap to scan again"}
    //           onPress={() => setScanned(false)}
    //         />
    //       </View>
    //     )}
    //   </Camera>
    // </View>
  );
}

const opacity = "rgba(0, 0, 0, .6)";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scanAgain: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: screen.height / 1.5,
  },
});
