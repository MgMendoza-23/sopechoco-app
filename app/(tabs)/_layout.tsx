import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useCart } from "../../hooks/useCart";

export default function TabsLayout() {
  const { cart } = useCart();

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      
      <Tabs.Screen
        name="home"
        options={{
          title: "MENÚ",
          tabBarIcon: ({ color }) => (
            <Ionicons name="restaurant-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Carrito",
          tabBarIcon: ({ color }) => (
            <View>
              <Ionicons name="cart-outline" size={24} color={color} />

              {cart.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {cart.length}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="beer"
        options={{
          title: "Bebidas",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cafe-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});