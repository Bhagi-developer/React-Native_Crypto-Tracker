import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function ListItem(props) {
  // color for price drop

  const dropColor = props.priceChangePercentage7d > 0 ? "#04C315" : "#E03904";

  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress({
          imageURL: props.imageURL,
          Title: props.Title,
          symbol: props.Symbol,
          currentPrice: props.currentPrice,
          priceChangePercentage7d: props.priceChangePercentage7d,
          sparkline: props.sparkline,
        });
      }}
    >
      <View style={styles.ItemContainer}>
        {/* Left Protion */}
        {/* ----------------------------------------------------------
      ---------------------------------------------------------- */}
        <View style={styles.ItemLeft}>
          {/* Image Container  */}
          {/* ------------------------------------------------------------------ */}
          <View style={styles.ImageContainer}>
            <Image source={{ uri: props.imageURL }} style={styles.image} />
          </View>
          {/* ----------------------------------------------------------------------------- */}

          {/* Title Container */}
          {/* ----------------------------------------------------------------------------------------------- */}
          <View style={styles.TitleContainer}>
            <Text style={styles.title}>{props.Title}</Text>
            <Text style={styles.SubTitle}>{props.Symbol}</Text>
          </View>
          {/* --------------------------------------------------------------------------------------- */}
        </View>
        {/* --------------------------------------------------------------------------------------------------
        -------------------------------------------------------------------------------------------------- */}

        {/* Right Portion  */}

        {/* --------------------------------------------------------------------------
        -------------------------------------------------------------------------- */}
        <View style={styles.ItemRight}>
          {/* Price Container  */}
          {/* ------------------------------------------------------------------- */}
          <Text style={styles.title}>
            ${props.currentPrice.toLocaleString("en-IN")}
          </Text>
          <Text style={[styles.price, { color: dropColor }]}>
            {props.priceChangePercentage7d}%
          </Text>
          {/* ----------------------------------------------------------------------- */}
        </View>
        {/* --------------------------------------------------------------------------
        -------------------------------------------------------------------------- */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  ItemContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ItemLeft: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  ImageContainer: {},
  image: {
    height: 40,
    width: 40,
  },
  TitleContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    // fontWeight: 400,
  },

  SubTitle: {
    color: "grey",
  },
  ItemRight: {
    alignItems: "flex-end",
  },

  price: { textAlign: "left" },
});
