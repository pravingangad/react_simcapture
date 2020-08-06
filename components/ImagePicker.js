import React from "react";
import { View, Button, Image, Text, StyleSheet, Alert } from "react-native";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
const ImgPicker = (props) => {
  const verifyPermission = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "you need to grand the camera permissions to use this app",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission){
        return
    }
    ImagePicker.launchCameraAsync();
  };
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <Text style={styles.text}>No Image Taken Yet.</Text>
        <Image style={styles.image} />
        <Button
          title="Take Image"
          color={Colors.primary}
          onPress={takeImageHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: { alignItems: "center" },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  text: { fontWeight: "18" },
  image: { width: "100%", height: "100%" },
});

export default ImgPicker;
