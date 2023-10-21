import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ImageSourcePropType, StyleSheet, View } from "react-native";

import Button from "./components/button";
import ImageViewer from "./components/image-viewer";
import PlaceholderImage from "./assets/images/background-image.png";

import * as ImagePicker from "expo-image-picker";

const App = () => {
  const [selectedImage, setSelectedImage] = useState<ImageSourcePropType>();

  const pickImageSync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      alert("You did not select any image.");
      return;
    }

    setSelectedImage(result.assets);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>

      <View style={styles.footerContainer}>
        <Button
          onPress={pickImageSync}
          theme="primary"
          label="Choose a photo"
        />
        <Button onPress={() => alert("yo!")} label="Use this photo" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});

export default App;
