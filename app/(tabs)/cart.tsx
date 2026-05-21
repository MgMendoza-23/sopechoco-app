import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../../hooks/useCart";
export default function Cart() {
  const { cart, removeFromCart, getTotal } = useCart();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [tipoPedido, setTipoPedido] =
  useState<"mesa" | "llevar">("mesa");

const [cliente, setCliente] =
  useState("");

const [indicaciones, setIndicaciones] =
  useState("");
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
  const [errorCliente, setErrorCliente] =
  useState(false);
  const finalizarPedido = () => {

  // validar nombre o mesa
if (!cliente.trim()) {

  setErrorCliente(true);

  // 🔥 mover automáticamente
  scrollRef.current?.scrollTo({
    y: 500,
    animated: true,
  });

  return;
}

  setErrorCliente(false);

  router.push("/confirm");
};

return (
  <SafeAreaView
    style={styles.container}
    edges={["top"]}
  >
    
    {/* HEADER */}
    <View style={styles.headerContainer}>
      
      <Text style={styles.header}>
        Tu carrito
      </Text>

      <Text style={styles.subHeader}>
        {cart.length} productos agregados
      </Text>

    </View>

    {cart.length === 0 ? (

      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>
          🛒
        </Text>

        <Text style={styles.empty}>
          Tu carrito está vacío
        </Text>
      </View>

    ) : (

      <View style={styles.checkoutCard}>

        {/* PRODUCTOS */}
        <ScrollView ref={scrollRef}
          showsVerticalScrollIndicator={false}
          style={styles.productsContainer}
        >
          {cart.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.productRow,

                index !== cart.length - 1 && {
                  borderBottomWidth: 1,
                },
              ]}
            >
              
              {/* INFO */}
              <View style={styles.productInfo}>
                
                <Text style={styles.itemText}>
                  {formatItem(item)}
                </Text>

                <Text style={styles.productPrice}>
                  $
                  {item.tipo === 1
                    ? 35
                    : item.tipo === 2
                    ? 45
                    : 20}
                </Text>

              </View>

              {/* DELETE */}
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() =>
                  removeFromCart(item.id)
                }
              >
                <Text style={styles.deleteText}>
                  ✕
                </Text>
              </TouchableOpacity>

            </View>
          ))}
      {/* DATOS PEDIDO */}
      <View style={styles.extraSection}>

        <Text style={styles.extraTitle}>
          Tipo de pedido
        </Text>

        {/* OPCIONES */}
        <View style={styles.typeRow}>

          {/* MESA */}
          <TouchableOpacity
            style={[
              styles.typeButton,

              tipoPedido === "mesa" &&
                styles.typeButtonActive,
            ]}
            onPress={() =>
              setTipoPedido("mesa")
            }
          >
            <Text
              style={[
                styles.typeText,

                tipoPedido === "mesa" &&
                  styles.typeTextActive,
              ]}
            >
              Comer aquí
            </Text>
          </TouchableOpacity>

          {/* LLEVAR */}
          <TouchableOpacity
            style={[
              styles.typeButton,

              tipoPedido === "llevar" &&
                styles.typeButtonActive,
            ]}
            onPress={() =>
              setTipoPedido("llevar")
            }
          >
            <Text
              style={[
                styles.typeText,

                tipoPedido === "llevar" &&
                  styles.typeTextActive,
              ]}
            >
              Para llevar
            </Text>
          </TouchableOpacity>

        </View>

        {/* INPUT */}
        <TextInput
          placeholder={
            tipoPedido === "mesa"
              ? "Número de mesa"
              : "Nombre del cliente"
          }
          value={cliente}
          onChangeText={setCliente}
          style={[
            styles.input,
            errorCliente && styles.inputError,
          ]}
        />
        {errorCliente && (
          <Text style={styles.errorText}>
            Este campo es obligatorio
          </Text>
        )}

        {/* INDICACIONES */}
        <TextInput
          placeholder="Indicaciones especiales"
          value={indicaciones}
          onChangeText={setIndicaciones}
          multiline
          style={styles.textArea}
        />

      </View>
      </ScrollView>
        {/* TOTAL */}
        <View style={styles.totalSection}>
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Total
            </Text>

            <Text style={styles.totalAmount}>
              ${getTotal()}
            </Text>
          </View>

          {/* BOTÓN */}
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={finalizarPedido}
          >
            <Text style={styles.checkoutText}>
              Finalizar pedido
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    )}
  </SafeAreaView>
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
    color: "#d94f00",
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
    color: "#d94f00",
  },

  checkoutBtn: {
    marginTop: 15,
    backgroundColor: "#d94f00",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
headerContainer: {
  marginBottom: 20,
},

subHeader: {
  marginTop: 4,
  color: "#777",
  fontSize: 15,
},

checkoutCard: {
  flex: 1,

  backgroundColor: "#fff",

  borderRadius: 30,

  padding: 20,

  elevation: 3,

  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 10,
  shadowOffset: {
    width: 0,
    height: 4,
  },
},

productsContainer: {
  flex: 1,
},

productRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  paddingVertical: 18,

  borderColor: "#F0F0F0",
},

productInfo: {
  flex: 1,
  paddingRight: 10,
},

productPrice: {
  marginTop: 6,
  color: "#D94F00",
  fontWeight: "bold",
  fontSize: 16,
},
extraSection: {
  marginTop: 20,
  marginBottom: 25,
},

extraTitle: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 15,
  color: "#111",
},

typeRow: {
  flexDirection: "row",
  gap: 10,
  marginBottom: 15,
},

typeButton: {
  flex: 1,

  backgroundColor: "#F4F4F4",

  paddingVertical: 14,

  borderRadius: 16,

  alignItems: "center",
},

typeButtonActive: {
  backgroundColor: "#D94F00",
},

typeText: {
  fontWeight: "600",
  color: "#444",
},

typeTextActive: {
  color: "#fff",
},

input: {
  backgroundColor: "#F8F8F8",

  borderRadius: 16,

  paddingHorizontal: 15,
  paddingVertical: 15,

  marginBottom: 15,

  fontSize: 15,

  borderWidth: 1,
  borderColor: "#EEE",
},

textArea: {
  backgroundColor: "#F8F8F8",

  borderRadius: 16,

  paddingHorizontal: 15,
  paddingVertical: 15,

  minHeight: 100,

  textAlignVertical: "top",

  fontSize: 15,

  borderWidth: 1,
  borderColor: "#EEE",
},
totalSection: {
  borderTopWidth: 1,
  borderColor: "#F0F0F0",

  paddingTop: 20,
},

totalRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  marginBottom: 20,
},

totalLabel: {
  fontSize: 18,
  color: "#444",
},

emptyContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},

emptyEmoji: {
  fontSize: 50,
  marginBottom: 15,
},
inputError: {
  borderColor: "#D62828",
  borderWidth: 1.5,
},

errorText: {
  color: "#D62828",
  marginTop: -8,
  marginBottom: 12,
  fontSize: 13,
  fontWeight: "600",
},
});