import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  tipo: 1 | 2 | null;
  setTipo: (tipo: 1 | 2) => void;
};

export default function TipoSelector({
  tipo,
  setTipo,
}: Props) {
  return (
    <View style={styles.wrapper}>

      <View style={styles.container}>

        {/* 1 GUISO */}
        <TouchableOpacity
          style={[
            styles.button,
            tipo === 1 && styles.activeButton,
          ]}
          onPress={() => setTipo(1)}
        >
          <Text
            style={[
              styles.text,
              tipo === 1 && styles.activeText,
            ]}
          >
           De 1 Guiso
          </Text>
        </TouchableOpacity>

        {/* 2 GUISOS */}
        <TouchableOpacity
          style={[
            styles.button,
            tipo === 2 && styles.activeButton,
          ]}
          onPress={() => setTipo(2)}
        >
          <Text
            style={[
              styles.text,
              tipo === 2 && styles.activeText,
            ]}
          >
            De 2 Guisos
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginHorizontal: 5,

    // sombra Android
    elevation: 2,

    // sombra iOS
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  activeButton: {
    backgroundColor: "#D94F00",
  },

  text: {
    color: "#333",
    fontWeight: "600",
  },

  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});