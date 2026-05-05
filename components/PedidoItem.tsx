import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  text: string;
  onDelete: () => void;
};

export default function PedidoItem({ text, onDelete }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>• {text}</Text>

      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  text: {
    flex: 1,
  },

  delete: {
    color: "red",
    fontWeight: "bold",
  },
});