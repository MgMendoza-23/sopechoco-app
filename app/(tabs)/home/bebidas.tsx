import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import BebidaItem from "../../../components/BebidaItem";
import { bebidas } from "../../../constants/bebidas";
import { useCart } from "../../../hooks/useCart";

type Bebida = {
  id: number;
  name: string;
  price: number;
};

type Pedido = {
  id: string;
  bebida: Bebida;
  cantidad: number;
};

export default function Bebida() {
  const { addToCart } = useCart();

  const [cantidades, setCantidades] = useState<{ [key: number]: number }>({});
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  // ➕ aumentar cantidad
  const aumentar = (id: number) => {
    setCantidades((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // ➖ disminuir cantidad
  const disminuir = (id: number) => {
    setCantidades((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  // ✅ agregar pedido a lista
  const agregarPedido = (bebida: Bebida) => {
    const cantidad = cantidades[bebida.id] || 0;

    if (cantidad === 0) return;

    setPedidos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        bebida,
        cantidad,
      },
    ]);

    // reset solo esa bebida
    setCantidades((prev) => ({
      ...prev,
      [bebida.id]: 0,
    }));
  };

  // ❌ eliminar pedido
  const eliminarPedido = (id: string) => {
    setPedidos((prev) => prev.filter((p) => p.id !== id));
  };

  // 🛒 enviar al carrito (IMPORTANTE FIX)
  const enviarAlCarrito = () => {
    pedidos.forEach((p) =>
      addToCart({
        id: p.id,
        producto: "bebida",
        guisos: Array(p.cantidad).fill(p.bebida),
      })
    );

    setPedidos([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elige tus bebidas</Text>

      {/* LISTA DE BEBIDAS */}
      {bebidas.map((b) => (
        <View key={b.id}>
          <BebidaItem
            name={b.name}
            price={b.price}
            quantity={cantidades[b.id] || 0}
            onIncrease={() => aumentar(b.id)}
            onDecrease={() => disminuir(b.id)}
          />

          {/* botón agregar por bebida */}
          {(cantidades[b.id] || 0) > 0 && (
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => agregarPedido(b)}
            >
              <Text style={{ color: "#fff" }}>
                Agregar ({cantidades[b.id]})
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* 🧾 LISTA DE PEDIDOS */}
      <Text style={styles.subtitle}>Tus bebidas:</Text>

      {pedidos.map((p) => (
        <View key={p.id} style={{ marginBottom: 10 }}>
          <Text>
            {p.cantidad} {p.bebida.name}
          </Text>

          <Text
            style={{ color: "red" }}
            onPress={() => eliminarPedido(p.id)}
          >
            Eliminar
          </Text>
        </View>
      ))}

      {/* 🛒 BOTÓN FINAL */}
      {pedidos.length > 0 && (
        <TouchableOpacity style={styles.cartBtn} onPress={enviarAlCarrito}>
          <Text style={{ color: "#fff" }}>
            Agregar al carrito ({pedidos.length})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  subtitle: {
    marginTop: 20,
    fontWeight: "bold",
  },

  addBtn: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },

  cartBtn: {
    backgroundColor: "#E63946",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
});