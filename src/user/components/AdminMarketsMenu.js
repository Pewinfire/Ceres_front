import React, { useState, useEffect } from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./ShopMenu.css";
import NewMarket from "../../market/pages/NewMarket";

const AdminMarketsMenu = (props) => {
  const [newMarket, setNewMarket] = useState(false);
  const [marketList, setMarketList] = useState(false);
  const [general, setGeneral] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const buttonHandler = (value) => async () => {
    switch (value) {
      case "createMarket":
        setNewMarket(true);
        setMarketList(false);
        setGeneral(false);
        break;
      case "marketList":
        setNewMarket(false);
        setMarketList(true);
        setGeneral(false);
        break;
      case "general":
        setNewMarket(false);
        setMarketList(false);
        setGeneral(true);
        break;
    }
  };

  return (
    <React.Fragment>
      <>
        {general && (
          <ul>
            <li>
              <Card className="ds-card">
                <img
                  src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/Newmarket.png`}
                  alt="new"
                ></img>
                <Button
                  dClassName="ds-button"
                  onClick={buttonHandler("createMarket")}
                >
                  <p>Añadir Mercado </p>
                </Button>
              </Card>
            </li>
            <li>
              <Card className="ds-card">
                <img
                  src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/market-list.png`}
                  alt="admin"
                ></img>
                <Button
                  dClassName="ds-button"
                  onClick={buttonHandler("marketList")}
                >
                  <p>Administrar Mercados </p>
                </Button>
              </Card>
            </li>
            <li className="relleno">
            <h1>&nbsp;</h1>
            
            </li>
          
          </ul>
        )}
        {newMarket && (
          <NewMarket token={props.token} close={buttonHandler("general")} />
        )}
        {/*      {productList && (
          <ShopItems
            shop={loadedShop.id}
            token={props.token}
            close={buttonHandler("general")}
          />
        )} */}
      </>
    </React.Fragment>
  );
};

export default AdminMarketsMenu;
