import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import Input from "@mui/material/Input";
import { Pagination } from "@mui/material";
import "./ShopPage.css"

const ShopItems = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedShopProducts, setLoadedShopProducts] = useState();
  const [search, setSearch] = useState("producto");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(5);
  const [update, setUpdate] = useState(false);
  const [sort, setSort] = useState("name");
  const [dir, setDir] = useState(1);
  const [loadedShop, setLoadedShop] = useState();
 
  const [status, setStatus] = useState();
  const shopId= useParams().shopId;

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
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedShopProducts && <div className="shopBanner">
            <div className="banner">

            </div>
            
            
            </div>}
      </React.Fragment>
    </div>
  );
};

export default ShopItems;
