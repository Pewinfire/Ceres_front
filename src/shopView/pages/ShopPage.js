import React, { useEffect, useState, useContext } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";
import ShopPageProductList from "../components/ShopPageProductList";
import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import { Modal } from "@mui/material";
import Authenticate from "../../user/pages/Authenticate";
import UserCart from "../../user/components/UserCart";

import "./ShopPage.css";

const ShopItems = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedShop, setLoadedShop] = useState();
  const auth = useContext(AuthContext);
  const [status, setStatus] = useState();
  const shopId = useParams().shopId;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [update, setUpdate] = useState(true);

  const updateRender = () => {
    setUpdate(update == true ? false : true);
  };

  const showStatusWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/shop/${shopId}`
        );
        setLoadedShop(responseData.shop);
        setStatus(responseData.shop.active);
      } catch (err) {}
    };
    fetchShop();
  }, [sendRequest, status]);

  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />
      <React.Fragment>
        <Modal open={showConfirmModal} onClose={cancelDeleteHandler}>
          <Authenticate close={cancelDeleteHandler} />
        </Modal>

        {!isLoading && loadedShop && (
          <div>
            <div className="shopBanner">
              <div className="banner">
                <img
                  src={`${process.env.REACT_APP_BACKEND_IMG}/${loadedShop.image}`}
                  alt={loadedShop.name}
                />
                <div className="banner-text">
                  <h1>{loadedShop.name}</h1>
                  <h2 className="score">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                  </h2>
                  <h2>{loadedShop.description}</h2>
                  <h3>{loadedShop.location}</h3>
                </div>
              </div>
            </div>
            <div className="shopPlist">
              {(loadedShop.active && (
                <ShopPageProductList
                  shop={loadedShop.id}
                  token={auth.token}
                  update={updateRender}
                />
              )) || <h1>La tienda no esta activa en estos momentos</h1>}
            </div>
            <div className="shopCart">
              {(auth.userId && (
                <UserCart token={auth.token} update={update} />
              )) || (
                <div>
                  <h1>
                    Necesita loguearse primero para poder realizar una compra
                  </h1>
                  <Button onClick={showStatusWarningHandler}>
                    Iniciar Sesión
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </React.Fragment>
    </div>
  );
};

export default ShopItems;
