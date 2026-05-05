import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  tipo: 1 | 2 | null;
  setTipo: (tipo: 1 | 2) => void;
};

export default function TipoSelector({ tipo, setTipo }: Props) {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.button, tipo === 1 && styles.active]}
        onPress={() => setTipo(1)}
      >
        <Text>1 guiso</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, tipo === 2 && styles.active]}
        onPress={() => setTipo(2)}
      >
        <Text>2 guisos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 10, marginVertical: 10 },

  button: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },

  active: {
    backgroundColor: "#ddd",
  },
});