

export const foods= [
  {
    id: 1,
    title: "SOPE",
    description: "1 guiso o combinado de 2",
    price: 50,
    image: require("../assets/images/sope1.png"),
    route: "/(tabs)/home/sope",
  },
  {
    id: 2,
    title: "Bebidas",
    description: "Jamaica, horchata, refrescos",
    price: 25,
    image: require("../assets/images/bebidas.png"),
    route: '/(tabs)/home/bebidas',
  },
] as const;