
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles/FoodCustomizer.styles";
import GuisoSelector from "./GuisoSelector";
import PedidoItem from "./PedidoItem";
import TipoSelector from "./TipoSelector";

import { useCart } from "../hooks/useCart";
import { Guiso } from "../types/guiso";

import { supabase } from "../utils/supabase";
type Pedido = {
  id: string;
  producto: "sope" | "quesadilla";
  tipo: 1 | 2;
  guisos: Guiso[];
};

type Props = {
  title: string;
  producto: "sope" | "quesadilla";
  image: any;
};

export default function FoodCustomizer({
  title,
  producto,
  image,
}: Props) {
  const router = useRouter();

  const { addToCart } = useCart();
  const [guisos, setGuisos] =
    useState<Guiso[]>([]);
  const [tipo, setTipo] =
    useState<1 | 2 | null>(null);

  const [guiso1, setGuiso1] =
    useState<Guiso | null>(null);

  const [guiso2, setGuiso2] =
    useState<Guiso | null>(null);

  const [pedidos, setPedidos] =
    useState<Pedido[]>([]);

   // =========================
  // OBTENER GUISOS
  // =========================


  useEffect(() => {
    getGuisos();
  }, []);

  const getGuisos = async () => {

    const { data, error } =
      await supabase
        .from("guisos")
        .select("*")
        .eq("available", true);

    if (error) {
      console.log(
        "ERROR GUISOS:",
        error
      );
      return;
    }

    setGuisos(data || []);
  };

  // ➕ agregar pedido
  const agregarPedido = () => {
    
    // 1 GUISO
    if (tipo === 1 && guiso1) {

      const pedido: Pedido = {
        id: Date.now().toString(),
        producto,
        tipo: 1,
        guisos: [guiso1],
      };

      // carrito
      addToCart(pedido);

      // visual local
      setPedidos((prev) => [
        ...prev,
        pedido,
      ]);
    }

    // 2 GUISOS
    if (
      tipo === 2 &&
      guiso1 &&
      guiso2
    ) {

      const pedido: Pedido = {
        id: Date.now().toString(),
        producto,
        tipo: 2,
        guisos: [guiso1, guiso2],
      };

      // carrito
      addToCart(pedido);

      // visual local
      setPedidos((prev) => [
        ...prev,
        pedido,
      ]);
    }

    // reset
    setTipo(null);
    setGuiso1(null);
    setGuiso2(null);
  };

  // ❌ eliminar pedido visual
  const eliminarPedido = (id: string) => {
    setPedidos((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };

  return (
    <ScrollView
      style={styles.screen}
      showsVerticalScrollIndicator={false}
    >
      {/* HERO */}
      <View style={styles.hero}>
        
        {/* TEXTOS */}
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>
            Personaliza tu {title}
          </Text>

          <Text style={styles.heroSubtitle}>
            Elige tus guisos favoritos
          </Text>
        </View>

        {/* IMAGEN */}
        <Image
          source={image}
          style={styles.heroImage}
        />
      </View>

      {/* CARD PRINCIPAL */}
      <View style={styles.card}>
        
        <Text style={styles.sectionTitle}>
          ¿Cuántos guisos quieres?
        </Text>

        {/* TIPO */}
        <TipoSelector
          tipo={tipo}
          setTipo={setTipo}
        />

        {/* PRIMER GUISO */}
        {tipo && (
          <GuisoSelector
            title="Primer guiso"
            selected={guiso1}
            setSelected={setGuiso1}
            options={guisos}
          />
        )}

        {/* SEGUNDO GUISO */}
        {tipo === 2 && (
          <GuisoSelector
            title="Segundo guiso"
            selected={guiso2}
            setSelected={setGuiso2}
            options={guisos}
          />
        )}

        {/* RESUMEN */}
        {((tipo === 1 && guiso1) ||
          (tipo === 2 &&
            guiso1 &&
            guiso2)) && (
          <View style={styles.resumeCard}>
            
            <Text style={styles.resumeTitle}>
              Tu {title} es de:
            </Text>

            <Text style={styles.resumeText}>
              {tipo === 1
                ? guiso1?.name
                : `${guiso1?.name} + ${guiso2?.name}`}
            </Text>

            <TouchableOpacity
              style={styles.addBtn}
              onPress={agregarPedido}
            >
              <Text style={styles.addBtnText}>
                Agregar {title}
              </Text>
            </TouchableOpacity>

          </View>
        )}
      </View>

      {/* PEDIDOS */}
      {pedidos.length > 0 && (
        <View style={styles.ordersSection}>

          <View style={styles.ordersCard}>
            
            {/* TITLE */}
            <Text style={styles.sectionTitle}>
              Tus pedidos
            </Text>

            {/* ITEMS */}
            {pedidos.map((p) => (
              <PedidoItem
                key={p.id}
                text={`${title} de ${p.guisos
                  .map((g) => g.name)
                  .join(" + ")}`}
                onDelete={() =>
                  eliminarPedido(p.id)
                }
              />
            ))}

            {/* BOTÓN */}
            <TouchableOpacity
              style={styles.cartBtn}
              onPress={() =>
                router.push("/(tabs)/cart")
              }
            >
              <Text style={styles.cartBtnText}>
                Ir al carrito
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      )}
    </ScrollView>
  );
}