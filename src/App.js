import React, { useState } from 'react';
import axios from 'axios';
import StockSearch from './stockSearch';
import Portfolio from './portfolio';
import StockInfo from './stockInfo';
import "./App.css";


const App = () => {
  const [stock, setStock] = useState(null);
  const [portfolio, setPortfolio] = useState({});

  const fetchStockData = async (symbol) => {
    const apiKey = "KWYFQIZY4HMNK7FI";
    const apiURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    try {
      const response = await axios.get(apiURL);
      const data = response.data["Global Quote"];
      if (data) {
        setStock({
          name: data["01. symbol"],
          symbol: data["01. symbol"],
          price: parseFloat(data["05. price"]),
          high: parseFloat(data["03. high"]),
          low: parseFloat(data["04. low"]),
        });
      } else {
        setStock(null);
        alert("Stock not found");
      };
    } catch (error) {
      console.error("error fetching data", error);
      setStock(null);
      alert("Error fetching stock data. Try again");
    }
  };

  const buyStock = (shares) => {
    if (stock && stock.symbol) {
      setPortfolio((prevPortfolio) => {
        const newPortfolio = { ...prevPortfolio };
        if (newPortfolio[stock.symbol]) {
          newPortfolio[stock.symbol].shares += 1;
        } else {
          newPortfolio[stock.symbol] = {
            shares: 1,
            price: stock.price,
          };
        }
        return newPortfolio;
      });
    };
  };

  const sellStock = () => {
    if (stock && stock.symbol && portfolio[stock.symbol]) {
        setPortfolio((prevPortfolio) => {
            const newPortfolio = { ...prevPortfolio };
            if (newPortfolio[stock.symbol].shares > 1) {
                newPortfolio[stock.symbol].shares -= 1;
            } else {
                delete newPortfolio[stock.symbol];
            }
            return newPortfolio;
        });
    }
};

    return (
      <div className="App">
        <header>
          <h1>Stock Portfolio</h1>
        </header>
        <StockSearch onSearch={fetchStockData} />
        <StockInfo stock={stock} />
        <div className="actions">
          <button onClick={buyStock} disabled={!stock}>Buy</button>
          <button onClick={sellStock} disabled={!stock}>Sell</button>
        </div>
        <Portfolio portfolio={portfolio} />

      </div>
    );
  };
export default App;
