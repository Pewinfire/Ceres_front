import React, { useState, useEffect } from "react";
import Button from "../../../shared/components/FormElements/Button";
import Card from "../../../shared/components/UIElements/Card";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import NewShop from "../../shop/pages/NewShop";
import "./ShopMenu.css";

const AdminShopsMenu = (props) => {
  const [newShop, setNewShop] = useState(false);
  const [shopsList, setShopsList] = useState(false);
  const [general, setGeneral] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const buttonHandler = (value) => async () => {
    switch (value) {
      case "createShop":
        setNewShop(true);
        setShopsList(false);
        setGeneral(false);
        break;
      case "shopList":
        setNewShop(false);
        setShopsList(true);
        setGeneral(false);
        break;
      case "general":
        setNewShop(false);
        setShopsList(false);
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
                  onClick={buttonHandler("createShop")}
                >
                  <p>Añadir Puesto </p>
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
                  onClick={buttonHandler("shopsList")}
                >
                  <p>Administrar Puestos </p>
                </Button>
              </Card>
            </li>
            <li className="relleno">
              <h1>&nbsp;</h1>
            </li>
          </ul>
        )}
        {newShop && (
          <NewShop token={props.token} close={buttonHandler("general")} />
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

export default AdminShopsMenu;
