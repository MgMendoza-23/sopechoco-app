import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },

  // HERO
  hero: {
    backgroundColor: "#fff",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 25,

    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,

    marginBottom: 15,

    elevation: 2,
  },

  heroContent: {
    flex: 1,
    paddingRight: 10,
  },

  heroTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111",
  },

  heroSubtitle: {
    marginTop: 8,
    color: "#666",
    fontSize: 16,
  },

  heroImage: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },

  // CARD
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    borderRadius: 26,
    padding: 20,

    elevation: 2,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#111",
  },

  // RESUMEN
  resumeCard: {
    backgroundColor: "#FAFAFA",
    borderRadius: 22,
    padding: 18,
    marginTop: 20,
  },

  resumeTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#111",
  },

  resumeText: {
    marginTop: 6,
    color: "#555",
    fontSize: 16,
  },

  resumePrice: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: "bold",
    color: "#E63946",
  },

  // BOTÓN AGREGAR
  addBtn: {
    marginTop: 18,
    backgroundColor: "#E63946",
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: "center",
  },

  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  // PEDIDOS
  ordersSection: {
    marginTop: 22,
    paddingHorizontal: 15,
    paddingBottom: 30,
  },

  // BOTÓN CARRITO
  cartBtn: {
    backgroundColor: "#111",
    paddingVertical: 18,
    borderRadius: 22,
    alignItems: "center",
    marginTop: 20,
  },

  cartBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});