import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Welcome() {
  const router = useRouter();
  return (
    <LinearGradient
      colors={["#f5ede0", "#fde8c8", "#f5ede0"]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
     <Image
        source={require("../assets/images/logo.png")} // tu archivo de logo
        style={styles.logo}
      />

      <View style={styles.menuContainer}>
        <Text style={styles.welcome}>¡Bienvenido! Haz tu pedido <Ionicons name="arrow-down-circle-outline" size={24} /></Text>
        <TouchableOpacity
        style={styles.btnPrimary}
        onPress={() =>router.replace ("/(tabs)/home")}
                >
        <Text style={styles.btnText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>📍 Balancán, Tabasco · 934 344 1846</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: { fontSize: 60 },
  titleSmall: {
    fontFamily: "BebasNeue-Regular",
    fontSize: 46,
    color: "#c1440e",
    letterSpacing: 2,
    textAlign: "center",
  }, 
  logo: {
    width: 350, // ajusta según tu imagen
    height: 350,
    resizeMode: "contain", // mantiene proporciones
    marginBottom: 10,
  },
  titleBig: {
    fontFamily: "BebasNeue-Regular",
    fontSize: 56,
    color: "#e85d04",
    letterSpacing: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "#8b4513",
    fontStyle: "italic",
    marginTop: 4,
    fontFamily: "Georgia",
  },
  menuContainer: {
    marginTop: 36,
    alignItems: "center",
    gap: 8,
  },
  welcome: {
    fontSize: 18,
    color: "#7a4420",
    fontFamily: "Georgia",
  },
  btnPrimary: {
    backgroundColor: "#e85d04",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    boxShadow:"0 4px 18px #e85d0440",
    
    
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
   fontWeight: "bold",
    letterSpacing:0.5,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    fontSize: 13,
    color: "#b08060",
    fontFamily: "Georgia",
  },
});
