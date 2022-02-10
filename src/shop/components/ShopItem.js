import React from "react";
//import { Link } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

import "./ShopItem.css";

const ShopsItem = (props) => {
  return (
       <React.Fragment>
      <li className="shop-item">
        <Card className="shop-item__content">
          <div className="shop-item__image">
            <img
              src={`${process.env.REACT_APP_BACKEND_IMG}/${props.image}`}
              alt={props.name}
            />
          </div>
          <div className="shop-item__info">
            <h1>{props.name}</h1>
            <p>{props.description}</p>
          </div>
          <div className="shop-item__actions">
            <Button to={`/shopPage/${props.id}`}>Ir</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>

  );
};

export default ShopsItem;
