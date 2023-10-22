import {
  Image,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";

import Emoji1 from "../assets/images/emoji1.png";
import Emoji2 from "../assets/images/emoji2.png";
import Emoji3 from "../assets/images/emoji3.png";
import Emoji4 from "../assets/images/emoji4.png";
import Emoji5 from "../assets/images/emoji5.png";
import Emoji6 from "../assets/images/emoji6.png";

const emojis = [Emoji1, Emoji2, Emoji3, Emoji4, Emoji5, Emoji6] as const;

type Props = {
  onSelect: (value: ImageSourcePropType) => void;
  onCloseModal: () => void;
};

const EmojiList = ({ onSelect, onCloseModal }: Props) => (
  <FlatList
    horizontal
    data={emojis}
    contentContainerStyle={styles.listContainer}
    showsHorizontalScrollIndicator={Platform.OS === "web"}
    renderItem={({ item, index }) => (
      <Pressable
        onPress={() => {
          onSelect(item);
          onCloseModal();
        }}
      >
        <Image source={item} key={index} style={styles.image} />
      </Pressable>
    )}
  />
);

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});

export default EmojiList;
