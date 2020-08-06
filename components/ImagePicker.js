import React, { useState } from "react";
import { View, Button, Image, Text, StyleSheet, Alert } from "react-native";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();
  const verifyPermission = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA);
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
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      // aspect: [16, 9],
      quality: 0.7,
    });
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
    console.log("image", image);
  };
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text style={styles.text}>No Image Taken Yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
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
  imagePicker: { alignItems: "center", marginBottom: 15 },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  text: { fontWeight: "bold" },
  image: { width: "100%", height: "100%" },
});

export default ImgPicker;
