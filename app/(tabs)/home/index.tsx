import FoodCard from "@/components/FoodCard";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Menu() {
  const router = useRouter();
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>

        {/* HEADER PERSONALIZADO */}
        <View style={styles.header}>
          <Text style={styles.title}>El Sopechoco</Text>
          <Text style={styles.subtitle}>¿Qué vas a pedir hoy?</Text>
        </View>

        {/* SECCIÓN */}
        <Text style={styles.section}>
             PLATILLOS PRINCIPALES
        </Text>

        <FoodCard
          title="Sopes"
          description=" · Un solo guiso o combinado de 2"
          price={105}
          image={require("../../../assets/images/sope1.png")}
          color="#F97316"
          onPress={() => router.push("/(tabs)/home/sope")}
        />

        <FoodCard
          title="Quesadillas"
          description="Con tu guiso favorito o combinado de 2"
          price={100}
          image={require("../../../assets/images/quesa.png")}
          color="#DC2626"
          onPress={() => router.push("/(tabs)/home/quesadilla")}
        />

        <FoodCard
          title="Taco"
          description="Elige tu guiso al momento"
          price={22}
          image={require("../../../assets/images/android-icon-foreground.png")}
          color="#F59E0B"
          onPress={() => router.push("/(tabs)/home/taco") }
        />

        <Text style={styles.section}>
          🥤 BEBIDAS
        </Text>

        <FoodCard
          title="Aguas y Refrescos"
          description="Jamaica, Horchata, Coca, Sprite y más"
          price={30}
          image={require("../../../assets/images/bebidas.png")}
          color="#065F46"
          onPress={() => router.push("/(tabs)/home/bebidas")}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f1b780",
    padding: 15,
  },

  header: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ad6620",
    paddingBottom: 10,
  },

  title: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 40,
    color: "#221915",
    letterSpacing: 5,
    lineHeight: 46,
  },

  subtitle: {
    fontSize: 18,
    color: "#c1440e",
    marginTop: 2,
  },

  section: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#EA580C",
    marginVertical: 10,
  },
});