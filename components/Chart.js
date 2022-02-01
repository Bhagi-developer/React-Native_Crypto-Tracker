import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} from "@rainbow-me/animated-charts";

import { useSharedValue } from "react-native-reanimated";
import { useEffect } from "react";

export const { width: SIZE } = Dimensions.get("window");

function Chart(props) {
  //function to format price
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const formatUSD = (value) => {
    "worklet";
    if (value == "") {
      return `$ ${props.currentPrice}`;
    }
    return `$ ${latestPrice.value.toLocaleString("en-US", {
      currency: "USD",
    })}`;
  };

  const latestPrice = useSharedValue(props.currentPrice);

  useEffect(() => {
    //when currentPrice updated then we assign it to latestPrice value
    latestPrice.value = props.currentPrice;
  }, [props.currentPrice]);

  return (
    <ChartPathProvider
      data={{ points: props.sparkline, smoothingStrategy: "bezier" }}
    >
      <View>
        <View style={styles.upperContainer}>
          <View style={styles.upperLeft}>
            <Image source={{ uri: props.imageURL }} style={styles.image} />
            <Text style={styles.upperTitle}>
              {props.Title}({props.symbol})
            </Text>
          </View>

          <Text style={styles.upperRight}>7d</Text>
        </View>

        <View style={styles.lowerContainer}>
          <ChartYLabel format={formatUSD} style={styles.priceTitle} />

          <Text style={styles.priceDrop}>{props.priceChangePercentage7d}%</Text>
        </View>
        <View style={styles.chartContainer}>
          <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
          <ChartDot style={{ backgroundColor: "black" }} />
        </View>
      </View>
    </ChartPathProvider>
  );
}

const styles = StyleSheet.create({
  upperContainer: {
    marginHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  upperLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  image: { height: 40, width: 40 },
  upperTitle: { color: "grey", marginLeft: 10 },
  upperRight: { color: "grey", marginRight: 5 },
  lowerContainer: {
    marginLeft: 17,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    marginHorizontal: 5,
  },
  priceDrop: { fontWeight: "100", fontSize: 14, marginRight: 10 },
  chartContainer: {
    marginTop: 20,
  },
});

export default Chart;
