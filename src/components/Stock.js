import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stock = () => {
  const [apiData, setApiData] = useState();
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const [stock, setStock] = useState('F');

  const API_KEY = '4J02TAATISR9F7W6';
  let API = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock}&outputsize=compact&apikey=${API_KEY}`;

  useEffect(() => {
    axios
      .get(API)
      .then((res) => {
        setApiData(res.data);
        console.log('apiData state', apiData);
        let timeSeries = Object.values(apiData['Time Series (Daily)']);
        console.log('timeSeries', timeSeries);
        let openDates = timeSeries.map(() => {
          return Object.keys(apiData['Time Series (Daily)']);
        });
        console.log('openDates', openDates[0]);
        setStockChartXValues(openDates[0]);
        console.log('stockChartXValues', stockChartXValues);

        let openPrices = timeSeries.map((e) => {
          return e['1. open'];
        });
        setStockChartYValues(openPrices);
        console.log('stockChartYValues', stockChartYValues);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Stock</h1>
    </div>
  );
};

export default Stock;
