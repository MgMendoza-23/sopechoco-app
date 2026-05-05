import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../hooks/useCart";
export default function Confirm() {
  const router = useRouter();
const { clearCart } = useCart();
  return (
    <View style={styles.container}>
      
      <Text style={styles.icon}>✅</Text>

      <Text style={styles.title}>Pedido confirmado</Text>

      <Text style={styles.subtitle}>
        Tu orden está en preparación
      </Text>

      <Text style={styles.time}>
        Tiempo estimado: 20 - 30 min
      </Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
            clearCart();
            router.replace("/(tabs)/home");
            }}
      >
        <Text style={styles.btnText}>Volver al menú</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  icon: {
    fontSize: 60,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },

  time: {
    fontSize: 14,
    color: "#999",
    marginBottom: 30,
  },

  btn: {
    backgroundColor: "#E63946",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});