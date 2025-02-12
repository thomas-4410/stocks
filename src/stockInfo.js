import React from "react";

const StockInfo = ({ stock }) => {
    return (
        <div className="stock-info">
            {stock ? (
                <>
                    <p>{stock.name}</p>
                    <h2>{stock.symbol}</h2>
                    <p>${stock.price}</p>
                    <p>High: ${stock.high}</p>
                    <p>Low: ${stock.low}</p>
                </>
            ) : (
                <p>No stock selected</p>
            )}
        </div>
    );
};

export default StockInfo;
