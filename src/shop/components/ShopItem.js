import React from "react";
//import { Link } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

import "./ShopItem.css";

const ShopsItem = (props) => {
  return (
    /*  <li className="shop-item">
      <Card className="shop-item__content">
        <Link to={`/${props.id}/shops`}>
          <div className="shop-item__image">
            <img
              src={`${process.env.REACT_APP_BACKEND_IMG}/${props.image}`}
              alt={props.name}
            />
          </div>
          <div className="shop-item__info">
            <h2>{`${props.name}`}</h2>
            <h3>{`${props.address}`}</h3>
          </div>
        </Link>
      </Card>
    </li> */
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
            <h2>{props.name}</h2>
            <h4>{props.location}</h4>
            <p>{props.description}</p>
          </div>
          <div className="shop-item__actions">
            <Button to={`/shops/${props.id}`}>Ir</Button>
            <Button to={`/${props.id}/shop/edit`}>Editar</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ShopsItem;
