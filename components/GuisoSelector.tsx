import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Guiso } from "../types/guiso";

type Props = {
  title: string;
  selected: Guiso | null;
  setSelected: (guiso: Guiso) => void;
  options: Guiso[];
};

export default function GuisoSelector({
  title,
  selected,
  setSelected,
  options,
}: Props) {
  return (
    <View>
      <Text>{title}</Text>

      <View style={styles.container}>
        {options.map((g) => (
          <TouchableOpacity
            key={g.id}
            style={[
              styles.button,
              selected?.id === g.id && styles.active,
            ]}
            onPress={() => setSelected(g)}
          >
            <Text>{g.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },

  button: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },

  active: {
    backgroundColor: "#ddd",
  },
});