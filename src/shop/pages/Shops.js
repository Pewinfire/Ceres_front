import React, { useEffect, useState } from "react";
import ShopList from "../components/ShopList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import { Box } from "@mui/system";
import Input from "@mui/material/Input";

const Shops = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedShops, setLoadedShops] = useState();
  const [search, setSearch] = useState("shop");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(6);

  const marketId = useParams().marketId;

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/shop/market/${marketId}/${
            page - 1
          }/${size}/${search}`
        ); // solo necesita url, lo demas viene vacio y hace get predeterminado
        setLoadedShops(responseData.shops);
        setTotalPages(responseData.totalPages);
      } catch (err) {}
    };
    fetchShops();
  }, [sendRequest, search, page, size, totalPages]); // allows to run certain code only when certain dependencies change (first argument),  . Second arg = array of dependencies , data that needs to change for this return. recarga cada vez que se hace una request

  const handleTextFieldKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        if (event.target.value) {
          setSearch(event.target.value);
        } else {
          setSearch("shop");
        }
        break;
      case "Escape":
        setSearch("shop");
        break;
      default:
        break;
    }
  };
  const selectPage = (event, value) => {
    setPage(value);
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedShops && (
        <div>
          <Box
            className="search-box"
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <Input
              fullWidth
              label="Buscar"
              id="fullWidth"
              className="search"
              inputProps={{ style: { fontSize: 30 } }} // font size of input text
              inputlabelprops={{ style: { fontSize: 30 } }}
              placeholder="  Buscar"
              onKeyDown={handleTextFieldKeyDown}
            />
          </Box>
          <ShopList items={loadedShops} />{" "}
          <Pagination
            count={totalPages}
            page={page}
            className="pagination"
            color="success"
            onChange={selectPage}
            size="large"
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default Shops;
