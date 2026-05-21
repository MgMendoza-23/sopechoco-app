import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FDF6EE",
  },

  // HERO
  hero: {
    backgroundColor: "#D94F00",

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
    color: "#ffffff",
  },

  heroSubtitle: {
    marginTop: 8,
    color: "#ffffff",
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
    borderWidth:0.7,
    borderColor:"#F5C842",
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
    fontSize: 21,
    color: "#000",
  },

  resumeText: {
    marginTop: 6,
    color: "#2C1200",
    fontSize: 16,
  },


  // BOTÓN AGREGAR
  addBtn: {
    marginTop: 18,
    backgroundColor: "#D94F00",
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
    marginTop: 24,
    paddingHorizontal: 15,
    paddingBottom: 40,
  },

  // BOTÓN CARRITO
  cartBtn: {
  backgroundColor: "#D94F00",

  paddingVertical: 18,

  borderRadius: 22,

  alignItems: "center",

  marginTop: 18,

  shadowColor: "#D94F00",
  shadowOpacity: 0.2,
  shadowRadius: 8,
  shadowOffset: {
    width: 0,
    height: 4,
  },

  elevation: 4,
  },

  cartBtnText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 17,
},
ordersCard: {
  backgroundColor: "#fff",
  borderRadius: 28,
  padding: 18,
  borderWidth: 1,
  borderColor: "#F5D7B2",
  elevation: 2,
},

});