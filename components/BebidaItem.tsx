import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  name: string;
  price: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function BebidaItem({
  name,
  price,
  quantity,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>

      <View style={styles.counter}>
        <TouchableOpacity onPress={onDecrease}>
          <Text style={styles.btn}>-</Text>
        </TouchableOpacity>

        <Text style={styles.qty}>{quantity}</Text>

        <TouchableOpacity onPress={onIncrease}>
          <Text style={styles.btn}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  name: {
    fontWeight: "bold",
  },

  price: {
    color: "#666",
  },

  counter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  btn: {
    fontSize: 20,
    fontWeight: "bold",
  },

  qty: {
    fontSize: 16,
  },
});