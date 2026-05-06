import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  name: string;
  por: string;
  price: number;
  quantity: number;
  image: any;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function BebidaItem({
  name,
  por,
  price,
  quantity,
  image,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <View style={styles.card}>
      
      {/* IZQUIERDA */}
      <View style={styles.left}>
        <Image source={image} style={styles.image} />

        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subtitle}>
            {por}
          </Text>
        </View>
      </View>

      {/* DERECHA */}
      <View style={styles.right}>
        
        {/* PRECIO */}
        <Text style={styles.price}>${price}</Text>

        {/* CONTADOR */}
        <View style={styles.counter}>
          
          {/* ➖ */}
          <TouchableOpacity
            style={styles.counterBtn}
            onPress={onDecrease}
          >
            <Text style={styles.counterText}>−</Text>
          </TouchableOpacity>

          {/* CANTIDAD */}
          <Text style={styles.qty}>
            {quantity}
          </Text>

          {/* ➕ */}
          <TouchableOpacity
            style={styles.counterBtn}
            onPress={onIncrease}
          >
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>

        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 15,
    marginBottom: 15,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 3,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 12,
  },

  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
  },

  subtitle: {
    marginTop: 4,
    color: "#777",
    fontSize: 14,
  },

  right: {
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
  },

  price: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#E63946",
  },

  counter: {
    flexDirection: "row",
    alignItems: "center",
  },

  counterBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EF3340",

    justifyContent: "center",
    alignItems: "center",
  },

  counterText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  qty: {
    marginHorizontal: 12,
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    minWidth: 20,
    textAlign: "center",
  },
});