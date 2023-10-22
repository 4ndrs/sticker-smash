import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  label: string;
  onPress: () => void;
};

const IconButton = ({ icon, label, onPress }: Props) => (
  <Pressable onPress={onPress} style={styles.iconButton}>
    <MaterialIcons name={icon} size={24} color="#fff" />
    <Text style={styles.iconButtonLabel}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});

export default IconButton;
