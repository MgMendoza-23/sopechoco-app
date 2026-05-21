import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
    <View style={styles.wrapper}>
      
      <Text style={styles.title}>{title}</Text>

      <View style={styles.container}>
        {options.map((g) => {
          const active = selected?.id === g.id;

          return (
            <TouchableOpacity
              key={g.id}
              style={[
                styles.button,
                active && styles.activeButton,
              ]}
              onPress={() => setSelected(g)}
            >
              <Text
                style={[
                  styles.text,
                  active && styles.activeText,
                ]}
              >
                {g.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },

  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  button: {
    backgroundColor: "#F1F1F1",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,

    // sombra Android
    elevation: 2,

    // sombra iOS
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  activeButton: {
    backgroundColor: "#D94F00",
  },

  text: {
    color: "#333",
    fontWeight: "500",
  },

  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});