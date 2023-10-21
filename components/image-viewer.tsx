import { Image, ImageSourcePropType, StyleSheet } from "react-native";

type Props = {
  placeholderSource: ImageSourcePropType;
  selectedImage?: ImageSourcePropType;
};
const ImageViewer = ({ placeholderSource, selectedImage }: Props) => (
  <Image
    source={selectedImage ? selectedImage : placeholderSource}
    style={styles.image}
  />
);

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

export default ImageViewer;
