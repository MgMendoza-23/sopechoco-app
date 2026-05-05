import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../../hooks/useCart";
export default function Cart() {
  const { cart, removeFromCart, getTotal } = useCart();
  const router = useRouter();
  const formatItem = (item: any) => {
    switch (item.producto) {
      case "sope":
        return `Sope de ${item.guisos.map((g: any) => g.name).join(" + ")}`;

      case "quesadilla":
        return `Quesadilla de ${item.guisos.map((g: any) => g.name).join(" + ")}`;

      case "taco":
        return `${item.guisos.length} tacos de ${item.guisos[0]?.name}`;

      case "bebida":
        return `${item.guisos.length} x ${item.guisos[0]?.name}`;

      default:
        return "";
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.header}>🛒 Tu carrito</Text>

        {cart.length === 0 ? (
          <Text style={styles.empty}>No hay pedidos aún</Text>
        ) : (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              {cart.map((item) => (
                <View key={item.id} style={styles.card}>
                  <Text style={styles.itemText}>
                    {formatItem(item)}
                  </Text>

                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Text style={styles.deleteText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            {/* 💰 TOTAL */}
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalAmount}>${getTotal()}</Text>
            </View>

            {/* 🚀 BOTÓN FINAL */}
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => router.push("/confirm")}
            >
              <Text style={styles.checkoutText}>Finalizar pedido</Text>
</TouchableOpacity>
          </>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 15,
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  empty: {
    marginTop: 20,
    textAlign: "center",
    color: "#666",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,

    // sombra
    elevation: 3,
  },

  itemText: {
    fontSize: 15,
    fontWeight: "600",
  },

  deleteBtn: {
    marginTop: 8,
    alignSelf: "flex-end",
  },

  deleteText: {
    color: "#E63946",
    fontWeight: "bold",
  },

  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E63946",
  },

  checkoutBtn: {
    marginTop: 15,
    backgroundColor: "#E63946",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});