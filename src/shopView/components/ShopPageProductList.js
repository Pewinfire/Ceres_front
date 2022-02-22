import React, { useEffect, useState } from "react";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
/* import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import Input from "@mui/material/Input";
import { Pagination } from "@mui/material"; */
import { Modal } from "@mui/material";
import ShopPageProducts from "./ShopPageProducts";
import Card from "../../shared/components/UIElements/Card";
import Chip from "@mui/material/Chip";
import Button from "../../shared/components/FormElements/Button";
import { ListItem } from "@mui/material";
import "./ShopPageProductList.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const ShopPageProductList = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedShopProducts, setLoadedShopProducts] = useState();
  /*   const [search, setSearch] = useState("producto");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(33);
  const [sort, setSort] = useState("name");
  const [dir, setDir] = useState(1);
  const [totalPages, setTotalPages] = useState(0); */
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productId, setProductId] = useState();
  const [productSizes, setProductSizes] = useState([]);
  const [cartItem, setCartItem] = useState({ productId: "", productSize: "" });

  useEffect(() => {
    const fetchShopsProducts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/product/shop/${props.shop}/0/100/producto/name/1`
        );
        setLoadedShopProducts(responseData.products);
        /*         setTotalPages(responseData.totalPages); */
      } catch (err) {}
    };
    fetchShopsProducts();
  }, [
    sendRequest,
    /*   search,
    page,
    size,
    sort,
    dir, 
    totalPages,*/
    props.shop,
  ]);

  const addToCart = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/cart/addto`,
        "PATCH",
        JSON.stringify({
          productId: cartItem.productId,
          productSize: Number(cartItem.productSize),
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        }
      );
    } catch (err) {}

    setCartItem({ productId: "", productSize: "" });
    setShowConfirmModal(false);
    props.update();
  };

  const showStatusWarningHandler =  (id, sizes) => {
    setProductSizes(sizes);
    setProductId(id);
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  /* 
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
  const updateOrder = (sort) => {
    setSort(sort);
    setDir(dir === 1 ? -1 : 1);
  }; */
  const format = (productId) => {
    const format = loadedShopProducts.find(
      (product) => product.id === productId
    );
    return format.stats.format;
  };

  const handleSizeClick = (selecteedProductId, selectedSize) => {
    setCartItem({
      productId: selecteedProductId,
      productSize: selectedSize,
    });
  };

  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />
      <React.Fragment>
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}

        {!isLoading && loadedShopProducts && (
          <div>
            <Modal open={showConfirmModal} onClose={cancelDeleteHandler}>
              <Card className="sp-sizes">
                <h2>Selecciona la cantidad</h2>
                <div className="sp-lista">
                  {productSizes.map((data) => {
                    return (
                      <ListItem key={data.value}>
                        <Chip
                          label={data.value + "  " + format(productId)}
                          variant="outlined"
                          className={"sp-chip"}
                          color={
                            (cartItem.productSize === data.value &&
                              "primary") ||
                            undefined
                          }
                          onClick={() => handleSizeClick(productId, data.value)}
                        />
                      </ListItem>
                    );
                  })}
                </div>
                <Button
                  type="submit"
                  dClassname="sp-chip-button"
                  onClick={addToCart}
                >
                  <i className="fas fa-shopping-basket"></i>
                </Button>
              </Card>
            </Modal>
            <ul className="shopPageProduct-List">
              {loadedShopProducts.map((product) => {
                if (
                  product.stats.price &&
                  product.stats.stock &&
                  product.stats.price !== 0
                ) {
                  return (
                    <li>
                      <ShopPageProducts
                        id={product.id}
                        name={product.name}
                        img={product.image}
                        description={product.description}
                        price={product.stats.price}
                        sizes={product.stats.size}
                        format={product.stats.format}
                        categories={product.categories}
                        selectSizes={showStatusWarningHandler}
                      />
                    </li>
                  );
                } else {
                  return null;
                }
              })}
            </ul>
          </div>
        )}
      </React.Fragment>
    </div>
  );
};

export default ShopPageProductList;
