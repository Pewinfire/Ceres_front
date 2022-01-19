import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import "./MarketItem.css"

const MarketsItem = (props) => {
  return (
    <li className="market-item">
      <Card className="market-item__content">
        <Link to={`/${props.id}/shops`}>
          <div className="market-item__image">
            <Avatar image={`${process.env.REACT_APP_BACKEND_IMG}/${props.image}`} alt={props.name} />
          </div>
          <div className="market-item__info">
            <h2>{`${props.name}`}</h2>
            <h3>{`${props.address}`}</h3>
         
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default MarketsItem;
