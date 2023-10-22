import { Image, ImageSourcePropType, View } from "react-native";

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

const EmojiSticker = ({ imageSize, stickerSource }: Props) => (
  <View style={{ top: -350 }}>
    <Image
      source={stickerSource}
      resizeMode="contain"
      style={{ width: imageSize, height: imageSize }}
    />
  </View>
);

export default EmojiSticker;
