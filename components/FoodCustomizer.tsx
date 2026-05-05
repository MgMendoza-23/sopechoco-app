import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import GuisoSelector from "./GuisoSelector";
import PedidoItem from "./PedidoItem";
import TipoSelector from "./TipoSelector";

import { guisos } from "../constants/guisos";
import { useCart } from "../hooks/useCart";
import { Guiso } from "../types/guiso";

type Pedido = {
  id: string;
  tipo: 1 | 2;
  guisos: Guiso[];
};

type Props = {
  title: string;
  producto: "sope" | "quesadilla";
};

export default function FoodCustomizer({ title, producto }: Props) {
  const { addToCart } = useCart();

  const [tipo, setTipo] = useState<1 | 2 | null>(null);
  const [guiso1, setGuiso1] = useState<Guiso | null>(null);
  const [guiso2, setGuiso2] = useState<Guiso | null>(null);

  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const agregarPedido = () => {
    if (tipo === 1 && guiso1) {
      setPedidos((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          tipo: 1,
          guisos: [guiso1],
        },
      ]);
    }

    if (tipo === 2 && guiso1 && guiso2) {
      setPedidos((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          tipo: 2,
          guisos: [guiso1, guiso2],
        },
      ]);
    }

    setTipo(null);
    setGuiso1(null);
    setGuiso2(null);
  };

  const eliminarPedido = (id: string) => {
    setPedidos((prev) => prev.filter((p) => p.id !== id));
  };

const enviarAlCarrito = () => {
  pedidos.forEach((p) =>
    addToCart({
      id: p.id,
      producto: producto,
      tipo: p.tipo,
      guisos: p.guisos,
    })
  );

  setPedidos([]);
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elige tu {title}:</Text>

      <TipoSelector tipo={tipo} setTipo={setTipo} />

      {tipo && (
        <GuisoSelector
          title="Selecciona tu guiso"
          selected={guiso1}
          setSelected={setGuiso1}
          options={guisos}
        />
      )}

      {tipo === 2 && (
        <GuisoSelector
          title="Segundo guiso"
          selected={guiso2}
          setSelected={setGuiso2}
          options={guisos}
        />
      )}

      {((tipo === 1 && guiso1) ||
        (tipo === 2 && guiso1 && guiso2)) && (
        <TouchableOpacity style={styles.addBtn} onPress={agregarPedido}>
          <Text style={{ color: "#fff" }}>Agregar</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.subtitle}>Tus pedidos:</Text>

      {pedidos.map((p) => (
        <PedidoItem
          key={p.id}
          text={`${title} de ${p.guisos
            .map((g) => g.name)
            .join(" + ")}`}
          onDelete={() => eliminarPedido(p.id)}
        />
      ))}

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

  addBtn: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  cartBtn: {
    backgroundColor: "#E63946",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
});