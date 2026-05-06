import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import BebidaItem from "../../../components/BebidaItem";
import { bebidas } from "../../../constants/bebidas";
import { useCart } from "../../../hooks/useCart";

type Bebida = {
  id: number;
  por:string;
  name: string;
  price: number;
  image: any;
};

type Pedido = {
  id: string;
  bebida: Bebida;
  cantidad: number;
};

export default function Bebida() {
  const { addToCart } = useCart();

  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  // ➕ aumentar
  const aumentar = (bebida: Bebida) => {
    setPedidos((prev) => {
      const existe = prev.find(
        (p) => p.bebida.id === bebida.id
      );

      // si ya existe → aumentar cantidad
      if (existe) {
        return prev.map((p) =>
          p.bebida.id === bebida.id
            ? {
                ...p,
                cantidad: p.cantidad + 1,
              }
            : p
        );
      }

      // si no existe → crear pedido
      return [
        ...prev,
        {
          id: Date.now().toString(),
          bebida,
          cantidad: 1,
        },
      ];
    });
  };

  // ➖ disminuir
  const disminuir = (bebida: Bebida) => {
    setPedidos((prev) =>
      prev
        .map((p) =>
          p.bebida.id === bebida.id
            ? {
                ...p,
                cantidad: Math.max(0, p.cantidad - 1),
              }
            : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  // ❌ eliminar pedido
  const eliminarPedido = (id: string) => {
    setPedidos((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };

  // 🛒 enviar al carrito
  const enviarAlCarrito = () => {
    pedidos.forEach((p) =>
      addToCart({
        id: p.id,
        producto: "bebida",
        guisos: Array(p.cantidad).fill({
          id: p.bebida.id,
          name: p.bebida.name,
        }),
      })
    );

    setPedidos([]);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        🥤 Elige tus bebidas
      </Text>

      {/* 🥤 LISTA */}
      {bebidas.map((b) => (
        <BebidaItem
          key={b.id}
          name={b.name}
          por={b.por}
          price={b.price}
          image={b.image}
          quantity={
            pedidos.find(
              (p) => p.bebida.id === b.id
            )?.cantidad || 0
          }
          onIncrease={() => aumentar(b)}
          onDecrease={() => disminuir(b)}
        />
      ))}

      {/* 🧾 TUS BEBIDAS */}
      {pedidos.length > 0 && (
        <>
          <Text style={styles.subtitle}>
            Tus bebidas
          </Text>

          {pedidos.map((p) => (
            <View
              key={p.id}
              style={styles.orderCard}
            >
              <View>
                <Text style={styles.orderText}>
                  {p.cantidad} x {p.bebida.name}
                </Text>

                <Text style={styles.orderPrice}>
                  $
                  {p.cantidad *
                    p.bebida.price}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  eliminarPedido(p.id)
                }
              >
                <Text style={styles.deleteText}>
                  Eliminar
                </Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* 🛒 BOTÓN */}
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={enviarAlCarrito}
          >
            <Text style={styles.cartBtnText}>
              Agregar al carrito (
              {pedidos.length})
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
    color: "#333",
  },

  orderCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 2,
  },

  orderText: {
    fontWeight: "bold",
    fontSize: 15,
  },

  orderPrice: {
    marginTop: 4,
    color: "#E63946",
    fontWeight: "bold",
  },

  deleteText: {
    color: "red",
    fontWeight: "bold",
  },

  cartBtn: {
    backgroundColor: "#E63946",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },

  cartBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});