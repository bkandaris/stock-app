import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

const Stock = () => {
  const [apiData, setApiData] = useState();
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const [stockTicker, setStockTicker] = useState();
  const [stock, setStock] = useState('FB');
  const Plot = createPlotlyComponent(Plotly);

  const API_KEY = '4J02TAATISR9F7W6';
  let API = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock}&outputsize=compact&apikey=${API_KEY}`;

  useEffect(() => {
    axios
      .get(API)
      .then((res) => {
        setApiData(res.data);
        console.log('res', res.data);
        let timeSeries = Object.values(apiData['Time Series (Daily)']);

        let openDates = timeSeries.map(() => {
          return Object.keys(apiData['Time Series (Daily)']);
        });

        setStockChartXValues(openDates[0]);

        let openPrices = timeSeries.map((e) => {
          return e['1. open'];
        });

        setStockChartYValues(openPrices);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [stock, API]);

  const handleChange = (e) => {
    e.preventDefault();
    setStockTicker(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStock(stockTicker);
  };
  console.log('stock', stock);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='enter ticker symbol here'
          type='text'
          name='stock'
          onChange={handleChange}
        />
        <button type='submit'>Change Ticker</button>
      </form>
      <Plot
        data={[
          {
            x: stockChartXValues,
            y: stockChartYValues,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
        ]}
        layout={{ width: 720, height: 440, title: { stock } }}
      />
    </div>
  );
};

export default Stock;
