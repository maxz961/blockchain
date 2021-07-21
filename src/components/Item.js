import React from "react";

const Card = ({ name, usdCapitalization, percentageChange }) => {
  return (
    <div className="card">
      <div className="card-name">{name}</div>
      <div className="card-price">$100 / 0.04 ETH</div>
      <div className="card-footer">
        <div className="card-total-cash">${usdCapitalization}</div>
        <div className="card-total-percent">{percentageChange}%</div>
      </div>
    </div>
  );
};

export default Card;
