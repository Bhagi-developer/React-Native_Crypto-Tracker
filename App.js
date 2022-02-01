import { StatusBar } from "expo-status-bar";
import React, { useRef, useMemo, useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import ListItem from "./components/listItem";
import Data from "./components/data/sampleData";
import Chart from "./components/Chart";
import { getMarketData } from "./components/Services/CoinDeckoApi";

export default function App() {
  // for api data
  const [data, setData] = useState([]);

  //it will run only once and at the begining
  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    };

    //calling this function
    fetchMarketData();
  });

  // for chart data
  const [chartData, setChartData] = useState({
    imageURL: null,
    Title: null,
    symbol: null,
    currentPrice: null,
    priceChangePercentage7d: null,
    sparkline: null,
  });
  // function to format the price number

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  //code for bottom sheet
  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["49%"], []);

  const openModal = (itemData) => {
    // console.warn(itemData.imageURL);

    setChartData({
      imageURL: itemData.imageURL,
      Title: itemData.Title,
      symbol: itemData.symbol,
      currentPrice: itemData.currentPrice,
      priceChangePercentage7d: itemData.priceChangePercentage7d,
      sparkline: itemData.sparkline,
    });

    // setSelectedCoinData(item);
    bottomSheetModalRef.current?.present();
  };

  const handleOutSideClick = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        {/* //Heading 
    // ----------------------------------------------------- */}
        <View
          style={styles.HeaderTextContainer}
          onStartShouldSetResponder={handleOutSideClick}
        >
          <Text style={styles.HeadingText}>Markets</Text>
        </View>
        <View style={styles.HeadingDevider} />

        {/* -------------------------------------------------------- */}

        {/* List Of Currency  */}
        {/* ---------------------------------------------------------------------- */}
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItem
              imageURL={item.image}
              Title={item.name}
              Symbol={item.symbol}
              currentPrice={formatNumber(item.current_price)}
              priceChangePercentage7d={item.price_change_percentage_7d_in_currency.toFixed(
                3
              )}
              sparkline={item.sparkline_in_7d.price}
              onPress={openModal}
            />
          )}
          showsVerticalScrollIndicator={false}
          snapToAlignment={"start"}
          decelerationRate={"normal"}
          snapToInterval={Dimensions.get("window").height}
        />

        {/* ---------------------------------------------------------------------------------- */}
      </SafeAreaView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        <Chart
          imageURL={chartData.imageURL}
          Title={chartData.Title}
          symbol={chartData.symbol}
          currentPrice={chartData.currentPrice}
          priceChangePercentage7d={chartData.priceChangePercentage7d}
          sparkline={chartData.sparkline}
        />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  HeadingText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  HeaderTextContainer: {
    marginTop: 50,
    marginLeft: 16,
  },
  HeadingDevider: {
    // height: StyleSheet.hairlineWidth,
    height: 1,
    backgroundColor: "grey",
    marginHorizontal: 16,
    marginTop: 12,
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
    borderRadius: 10,
  },
  contentContainer: {},
});
