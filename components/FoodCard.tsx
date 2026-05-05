import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  title: string;
  description: string;
  price: number;
  image: any;
  color: string;
  onPress: () => void;
};

export default function FoodCard({
  title,
  description,
  price,
  image,
  color,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: color }]}
      onPress={onPress}
    >
      <Image source={image} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={[styles.priceContainer, { backgroundColor: color }]}>
        <Text style={styles.price}>${price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 6,
  },

  image: {
    width: 55,
    height: 55,
    marginRight: 10,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  description: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },

  priceContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  price: {
    color: "#fff",
    fontWeight: "bold",
  },
});