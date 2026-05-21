import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  text: string;
  onDelete: () => void;
};

export default function PedidoItem({
  text,
  onDelete,
}: Props) {
  return (
    <View style={styles.container}>
      
      {/* TEXTO */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {text}
        </Text>
      </View>

      {/* BOTÓN */}
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={onDelete}
      >
        <Text style={styles.delete}>
          Eliminar
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fcfcfc",

    borderRadius: 18,

    paddingVertical: 14,
    paddingHorizontal: 16,

    marginBottom: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#F5D7B2",
  },

  textContainer: {
    flex: 1,
    paddingRight: 10,
  },

  text: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2C1200",

    lineHeight: 22,
  },

  deleteBtn: {
    backgroundColor: "#FFE8E8",

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 14,
  },

  delete: {
    color: "#D62828",
    fontWeight: "700",
    fontSize: 13,
  },
});