import React from "react";

import ShopItem from "./ShopItem";
import Card from "../../shared/components/UIElements/Card";
import "./ShopList.css"

const ShopList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
        <h2> No Shops Found</h2>
        </Card>
      </div>
    );
  }

  return (
      <div >
    <ul className="shop-list">
      {props.items.map((shop) => {
        return (
          <ShopItem
            key={shop.id}
            id={shop.id}
            name={shop.name}
            image={shop.image}
            description={shop.description}
            location={shop.location}
            
          />
        );
      })}
    </ul>
    </div>
  );
};

export default ShopList;
