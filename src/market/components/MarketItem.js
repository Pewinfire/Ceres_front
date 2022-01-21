import React, {useState} from "react";
//import { Link } from "react-router-dom";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

import "./MarketItem.css";

const MarketsItem = (props) => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="market-item__modal-content"
        footerClass="market-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <li className="market-item">
        <Card className="market-item__content">
          <div className="market-item__image">
            <img
              src={`${process.env.REACT_APP_BACKEND_IMG}/${props.image}`}
              alt={props.name}
            />
          </div>
          <div className="market-item__info">
            <h2>{props.name}</h2>
            <h3>{props.address}</h3>
          </div>
          <div className="market-item__actions">
            <Button inverse onClick={openMapHandler}>
              View on map
            </Button>
            <Button to={`/${props.id}/shops`}>Ir</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default MarketsItem;
