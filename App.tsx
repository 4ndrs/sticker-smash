import { StatusBar } from "expo-status-bar";
import { captureRef } from "react-native-view-shot";
import { useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ImageSourcePropType, StyleSheet, View } from "react-native";

import Button from "./components/button";
import EmojiList from "./components/emoji-list";
import IconButton from "./components/icon-button";
import ImageViewer from "./components/image-viewer";
import EmojiPicker from "./components/emoji-picker";
import EmojiSticker from "./components/emoji-sticker";
import CircleButton from "./components/circle-button";
import PlaceholderImage from "./assets/images/background-image.png";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

const App = () => {
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType>();
  const [selectedImage, setSelectedImage] = useState<ImageSourcePropType>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);

  const viewRef = useRef<View>(null);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      alert("You did not select any image.");
      return;
    }

    setSelectedImage(result.assets);
    setShowAppOptions(true);
  };

  const handleSaveImage = async () => {
    const response = await MediaLibrary.requestPermissionsAsync();

    if (!response.granted) {
      alert("Permission to access the library has been denied.");
      return;
    }

    const localUri = await captureRef(viewRef, {
      height: 440,
      quality: 1,
    });

    await MediaLibrary.saveToLibraryAsync(localUri);

    alert("Saved!");
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.imageContainer}>
        <View ref={viewRef} collapsable={false}>
          <ImageViewer
            placeholderSource={PlaceholderImage}
            selectedImage={selectedImage}
          />

          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton
              icon="refresh"
              label="Reset"
              onPress={() => setShowAppOptions(false)}
            />

            <CircleButton onPress={() => setIsModalVisible(true)} />

            <IconButton
              icon="save-alt"
              label="Save"
              onPress={handleSaveImage}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            onPress={handlePickImage}
            theme="primary"
            label="Choose a photo"
          />

          <Button
            onPress={() => setShowAppOptions(true)}
            label="Use this photo"
          />
        </View>
      )}

      <EmojiPicker
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <EmojiList
          onSelect={(emoji) => setPickedEmoji(emoji)}
          onCloseModal={() => setIsModalVisible(false)}
        />
      </EmojiPicker>
    </GestureHandlerRootView>
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
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export default App;
