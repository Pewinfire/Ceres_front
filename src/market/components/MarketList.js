import React from "react";

import MarketItem from "./MarketItem";
import Card from "../../shared/components/UIElements/Card";
import "./MarketList.css"

const MarketList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
        <h2> No Markets Found</h2>
        </Card>
      </div>
    );
  }

  return (
      <div >
    <ul className="market-list">
      {props.items.map((market) => {
        return (
          <MarketItem
            key={market.id}
            id={market.id}
            image={market.image}
            name={market.name}
            coordinates={market.location}
            address={market.address}
            
          />
        );
      })}
    </ul>
    </div>
  );
};

export default MarketList;
