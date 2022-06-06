import React, { useState, useEffect } from "react";
import Button from "../../../shared/components/FormElements/Button";
import Card from "../../../shared/components/UIElements/Card";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Modal from "../../../shared/components/UIElements/Modal";
import ShopItems from "./sellerDashboardComponents/ShopItems";
import NewProduct from "./sellerDashboardComponents/NewProduct";
import { useTranslation } from "react-i18next";
import UpdateShop from "./UpdateShop";
import "./ShopMenu.css";

const ShopMenu = (props) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState();
  const [newProduct, setNewProduct] = useState(false);
  const [updateShop, setUpdateShop] = useState(false);
  const [productList, setProductList] = useState(false);
  const [general, setGeneral] = useState(true);
  const { isLoading, sendRequest } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loadedShop, setLoadedShop] = useState();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/shop/${props.shop}`
        ); // solo necesita url, lo demas viene vacio y hace get predeterminado
        setLoadedShop(responseData.shop);
        setStatus(responseData.shop.active);
      } catch (err) {}
    };
    fetchShop();
  }, [sendRequest, status, props.shop]);

  const buttonHandler = (value) => async () => {
    switch (value) {
      case "newProduct":
        setNewProduct(true);
        setProductList(false);
        setGeneral(false);
        setUpdateShop(false);
        break;
      case "adminProduct":
        setNewProduct(false);
        setProductList(true);
        setGeneral(false);
        setUpdateShop(false);
        break;
      case "updateShop":
        setNewProduct(false);
        setProductList(false);
        setGeneral(false);
        setUpdateShop(true);
        break;
      case "general":
        setNewProduct(false);
        setProductList(false);
        setGeneral(true);
        setUpdateShop(false);
    }
  };
  const showStatusWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const switchStatusHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/shop/status/${loadedShop.id}`,
        "PATCH",
        null,
        {
          Authorization: "Bearer " + props.token,
        }
      );
      setStatus(status ? "false" : "true");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <>
        {general && (
          <div className="ds-list">
            <Modal
              show={showConfirmModal}
              onCancel={cancelDeleteHandler}
              header={t("SEGURO_ESTADO")}
              footerClass="place-item_modal-actions"
              footer={
                <React.Fragment>
                  <Button inverse onClick={cancelDeleteHandler}>
                    {t("CANCELAR")}
                  </Button>
                  <Button danger onClick={switchStatusHandler}>
                    {(status && "Desactivar") || "Activar"}
                  </Button>
                </React.Fragment>
              }
            >
              <p> {t("CANCELAR")}</p>
            </Modal>
            {!isLoading && loadedShop && (
              <Card className="ds-tienda">
                <div className="ds-tienda">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMG}/${loadedShop.image}`}
                    alt={loadedShop.name}
                  />

                  <div className="ds-tienda-info">
                    <h2>{loadedShop.name}</h2>
                  </div>
                </div>
                <div className="ds-tienda-status">
                  <h2>{(status && t("ACTIVO")) || t("INACTIVO")}</h2>
                  <Button
                    dClassname="ds-tienda-status-button"
                    to={`/shopPage/${props.shop}`}
                  >
                    {t("IR_TIENDA")}
                  </Button>
                </div>
              </Card>
            )}
            <ul>
              <li>
                <Card className="ds-card">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/new.png`}
                    alt="new"
                  ></img>
                  <Button
                    dClassName="ds-button"
                    onClick={buttonHandler("newProduct")}
                  >
                    <p>{t("NUEVO_PRODUCTO")}</p>
                  </Button>
                </Card>
              </li>
              <li>
                <Card className="ds-card">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/admin.png`}
                    alt="admin"
                  ></img>
                  <Button
                    dClassName="ds-button"
                    onClick={buttonHandler("adminProduct")}
                  >
                    <p>{t("ADMINISTRAR_TIENDA")} </p>
                  </Button>
                </Card>
              </li>
              <li>
                <Card className="ds-card">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/shopUpdate.png`}
                    alt="Ayuda"
                  ></img>
                  <Button
                    dClassName="ds-button"
                    onClick={buttonHandler("updateShop")}
                  >
                    <p>{t("MODIFICAR_TIENDA")}</p>
                  </Button>
                </Card>
              </li>
              <li>
                <Card className="ds-card">
                  <img
                    src={
                      (status &&
                        `${process.env.REACT_APP_BACKEND_IMG}/uploads/images/closed.png`) ||
                      `${process.env.REACT_APP_BACKEND_IMG}/uploads/images/open.png`
                    }
                    alt="open/close"
                  ></img>

                  <Button
                    dClassName="ds-button"
                    onClick={showStatusWarningHandler}
                  >
                    <p>
                      {(status && t("DESACTIVAR_TIENDA")) ||
                        t("ACTIVAR_TIENDA")}
                    </p>
                  </Button>
                </Card>
              </li>
            </ul>
          </div>
        )}
        {newProduct && (
          <NewProduct
            shop={loadedShop.id}
            token={props.token}
            close={buttonHandler}
          />
        )}
        {productList && (
          <ShopItems
            shop={loadedShop.id}
            token={props.token}
            close={buttonHandler("general")}
          />
        )}
        {updateShop && (
          <UpdateShop
            shop={loadedShop.id}
            token={props.token}
            close={buttonHandler("general")}
          />
        )}
      </>
    </React.Fragment>
  );
};

export default ShopMenu;
