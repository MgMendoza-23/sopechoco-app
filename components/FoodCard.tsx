import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";

import { useRef } from "react";

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
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();

    onPress();
  };
  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.card,
          {
            borderLeftColor: color,
            transform: [{ scale }],
          },
        ]}
      >
        <Image source={image} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        <View
          style={[
            styles.priceContainer,
            { backgroundColor: color },
          ]}
        >
          <Text style={styles.price}>${price}</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 6,
    borderWidth:0.7,
    borderColor:"#F5C842",
  },

  image: {
    width: 70,
    height: 70,
    marginRight: 5,
    resizeMode:"contain"
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
    paddingVertical: 14,
    borderRadius: 12,
  },

  price: {
    color: "#fff",
    fontWeight: "bold",
  },
});