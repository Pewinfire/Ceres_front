import React, { useEffect, useState, useContext } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";
import "./ShopPage.css";
import ShopPageProductList from "../components/ShopPageProductList";
import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import { Modal } from "@mui/material";
import Authenticate from "../../user/pages/Authenticate"

const ShopItems = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedShopProducts, setLoadedShopProducts] = useState();
  const [search, setSearch] = useState("producto");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(6);
  const [update, setUpdate] = useState(false);
  const [sort, setSort] = useState("name");
  const [dir, setDir] = useState(1);
  const [loadedShop, setLoadedShop] = useState();
  const auth = useContext(AuthContext);
  const [status, setStatus] = useState();
  const shopId = useParams().shopId;

  const [showConfirmModal, setShowConfirmModal] = useState(false);
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
  }, [sendRequest, status, shopId]);

  /* useEffect(() => {
    const fetchShopsProducts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/product/shop/${props.shop}/${
            page - 1
          }/${size}/${search}/${sort}/${dir}`
        );
        setLoadedShopProducts(responseData.products);
        setTotalPages(responseData.totalPages);
      } catch (err) {}
    };
    fetchShopsProducts();
  }, [sendRequest, shopId, search, page, size, totalPages, props.shop, update, sort, dir]);
 */
  const handleTextFieldKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        if (event.target.value) {
          setSearch(event.target.value);
        } else {
          setSearch("producto");
        }
        break;
      case "Escape":
        setSearch("producto");
        break;
      default:
        break;
    }
  };
  const selectPage = (event, value) => {
    setPage(value);
  };
  const updateList = () => {
    if (update) {
      setUpdate(false);
    } else {
      setUpdate(true);
    }
  };
  const updateOrder = (sort) => {
    setSort(sort);
    setDir(dir === 1 ? -1 : 1);
  };

  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
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
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                  </h2>
                  <h2>{loadedShop.description}</h2>
                  <h3>{loadedShop.location}</h3>
                </div>
              </div>
            </div>
            {/*  overflow:auto; */}
            <div className="shopPlist">
              {(loadedShop.active && (
                <ShopPageProductList shop={loadedShop.id} />
              )) || <h1>La tienda no esta activa en estos momentos</h1>}
            </div>
            <div className="shopCart">
              {(auth.userId && "cart") || (
                <div>
                  <h1>
                    Necesita loguearse primero para poder realizar una compra
                  </h1>
                  <Button onClick={showStatusWarningHandler}>Iniciar Sesión</Button>
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
