import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import GuisoSelector from "./GuisoSelector";
import PedidoItem from "./PedidoItem";

import { guisos } from "../constants/guisos";
import { useCart } from "../hooks/useCart";
import { Guiso } from "../types/guiso";

type Pedido = {
  id: string;
  guiso: Guiso;
  cantidad: number;
};

export default function TacoCustomizer() {
  const { addToCart } = useCart();

  const [guiso, setGuiso] = useState<Guiso | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const agregarPedido = () => {
    if (!guiso) return;

    setPedidos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        guiso,
        cantidad,
      },
    ]);

    setGuiso(null);
    setCantidad(1);
  };

  const eliminarPedido = (id: string) => {
    setPedidos((prev) => prev.filter((p) => p.id !== id));
  };

    const enviarAlCarrito = () => {
    pedidos.forEach((p) =>
        addToCart({
        id: p.id,
        producto: "taco",
        guisos: Array(p.cantidad).fill(p.guiso),
        })
    );

    setPedidos([]);
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elige tu taco:</Text>

      <GuisoSelector
        title="Selecciona tu guiso"
        selected={guiso}
        setSelected={setGuiso}
        options={guisos}
      />

      {/* 🔢 Cantidad */}
      {guiso && (
        <View style={styles.counter}>
          <TouchableOpacity onPress={() => setCantidad(Math.max(1, cantidad - 1))}>
            <Text style={styles.btn}>-</Text>
          </TouchableOpacity>

          <Text style={styles.qty}>{cantidad}</Text>

          <TouchableOpacity onPress={() => setCantidad(cantidad + 1)}>
            <Text style={styles.btn}>+</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ➕ Agregar */}
      {guiso && (
        <TouchableOpacity style={styles.addBtn} onPress={agregarPedido}>
          <Text style={{ color: "#fff" }}>Agregar</Text>
        </TouchableOpacity>
      )}

      {/* 🧾 Lista */}
      <Text style={styles.subtitle}>Tus pedidos:</Text>

      {pedidos.map((p) => (
        <PedidoItem
          key={p.id}
          text={`${p.cantidad} tacos de ${p.guiso.name}`}
          onDelete={() => eliminarPedido(p.id)}
        />
      ))}

      {/* 🛒 Enviar */}
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

  title: { fontSize: 18, fontWeight: "bold" },
  subtitle: { marginTop: 20, fontWeight: "bold" },

  counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    gap: 20,
  },

  btn: {
    fontSize: 22,
    fontWeight: "bold",
  },

  qty: {
    fontSize: 18,
    fontWeight: "bold",
  },

  addBtn: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  cartBtn: {
    backgroundColor: "#E63946",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
});