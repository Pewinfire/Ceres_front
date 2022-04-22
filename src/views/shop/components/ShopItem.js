import React from "react";
//import { Link } from "react-router-dom";

import Button from "../../../shared/components/FormElements/Button";
import Card from "../../../shared/components/UIElements/Card";

import "./ShopItem.css";

const ShopsItem = (props) => {
  return (
    <React.Fragment>
      <li className="shop-item">
          <div className="shop-item__image">
            <img
              src={`${process.env.REACT_APP_BACKEND_IMG}/${props.image}`}
              alt={props.name}
            />
          </div>
          <div className="shop-item__info">
            <h1>{props.name}</h1>
            
            <p>
              {props.description.length > 100
                ? props.description.slice(0, 100) + "..."
                : props.description}
            </p>
            <h2 className="score">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                  </h2>
          </div>
               
          <div className="shop-item__actions">
            <Button to={`/shopPage/${props.id}`}><i class="fa fa-arrow-circle-right fa-2xl" aria-hidden="true"></i></Button>
          </div>
      </li>
    </React.Fragment>
  );
};

export default ShopsItem;
