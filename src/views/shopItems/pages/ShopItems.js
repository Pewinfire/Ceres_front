import React, { useEffect, useState } from "react";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import Input from "@mui/material/Input";
import { Pagination } from "@mui/material";
import ProductList from "../components/ProductList";
import Button from "../../../shared/components/FormElements/Button";
import "./ShopItem.css";

const ShopItems = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedShopProducts, setLoadedShopProducts] = useState();
  const [search, setSearch] = useState("producto");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(5);
  const [update, setUpdate] = useState(false);
  const [sort, setSort] = useState("name");
  const [columna, setColumna] = useState("name");
  const [dir, setDir] = useState(1);
  const shopId = useParams().shopId;
  const [transition, setTransition] = useState(false);
  useEffect(() => {
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
  }, [
    sendRequest,
    shopId,
    search,
    page,
    size,
    totalPages,
    props.shop,
    update,
    sort,
    dir,
  ]);

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
        <>
          <table className="ds-table">
            <tr className="ds-table-head">
              <th className="ds-primero">
                Producto
                <Button
                  onClick={() => updateOrder("name")}
                  dClassName="dir-button"
                >
                  {(dir === 1 && <i className="fas fa-sort-up"></i>) || (
                    <i className="fas fa-sort-down"></i>
                  )}
                </Button>
              </th>
              <th className="ds-img">Imagen</th>
              <th className="ds-medium">
                Descripción
                <Button
                  onClick={() => updateOrder("description")}
                  dClassName="dir-button"
                >
                  {(dir === 1 && <i className="fas fa-sort-up"></i>) || (
                    <i className="fas fa-sort-down"></i>
                  )}
                </Button>
              </th>
              <th className="ds-short">
                Categorias
                <Button
                  onClick={() => updateOrder("category")}
                  dClassName="dir-button"
                >
                  {(dir === 1 && <i className="fas fa-sort-up"></i>) || (
                    <i className="fas fa-sort-down"></i>
                  )}
                </Button>
              </th>
              <th className="ds-short">
                Precio{" "}
                <Button
                  onClick={() => updateOrder("stats.price")}
                  dClassName="dir-button"
                >
                  {(dir === 1 && <i className="fas fa-sort-up"></i>) || (
                    <i className="fas fa-sort-down"></i>
                  )}
                </Button>
              </th>
              <></>
              <th className="ds-short">
                Stock
                <Button
                  onClick={() => updateOrder("stats.stock")}
                  dClassName="dir-button"
                >
                  {(dir === 1 && <i className="fas fa-sort-up"></i>) || (
                    <i className="fas fa-sort-down"></i>
                  )}
                </Button>
              </th>
              <th className="ds-ultimo">Acciones</th>
            </tr>

            {!isLoading && loadedShopProducts && (
              <ProductList
                items={loadedShopProducts}
                token={props.token}
                update={updateList}
                sort={updateOrder}
                dir={dir}
              />
            )}
            {isLoading && (
              <div className="center-container">
                <LoadingSpinner />
              </div>
            )}
          </table>
          <Box
            className="search-boxx"
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <Input
              fullWidth
              label="Buscar"
              id="fullWidth"
              className="searchx"
              /*   inputProps={{ style: { fontSize: 30 } }} // font size of input text
                inputlabelprops={{ style: { fontSize: 30 } }} */
              placeholder="  Buscar"
              onKeyDown={handleTextFieldKeyDown}
            />
          </Box>
          <Pagination
            count={totalPages}
            page={page}
            className="paginationx"
            color="success"
            onChange={selectPage}
            size="large"
          />
        </>
      </React.Fragment>
    </div>
  );
};

export default ShopItems;
