import axios from "axios";
import moment from "moment";

//as we get only numbers in field of sparkline_in_7d
//by this we can convert it into x and y values for chart
//x refers to time
//y refers to value
const formateSparkline = (numbers) => {
  //we need moment package for this
  const sevenDaysAgo = moment().subtract(7, "days").unix();
  let formatedSparkLine = numbers.map((item, index) => {
    return {
      //for each number that we can it will convert into x value
      x: sevenDaysAgo + (index + 1) * 3600,
      y: item,
    };
  });
  return formatedSparkLine;
};

const formate = (data) => {
  let FormatedData = [];

  data.forEach((e) => {
    const formatedSparkLine = formateSparkline(e.sparkline_in_7d.price);

    const formateditem = {
      ...e,
      sparkline_in_7d: {
        price: formatedSparkLine,
      },
    };
    FormatedData.push(formateditem);
  });

  return FormatedData;
};

export const getMarketData = async () => {
  try {
    //https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d

    //getting response from api with help of axios
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d"
    );

    const data = response.data;
    //formating data with function
    const foramtedData = formate(data);

    return foramtedData;
  } catch (error) {
    console.log(error.message);
  }
};
