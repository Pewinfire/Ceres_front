import React, { useEffect, useState } from "react";
import MarketList from "../components/MarketList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Pagination } from "@mui/material";
import { Box } from "@mui/system";
import Input from "@mui/material/Input";

const Markets = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedMarkets, setLoadedMarkets] = useState();
  const [search, setSearch] = useState("merca");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(3);
  
  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/market/name/${
            page - 1
          }/${size}/${search}`
        ); // solo necesita url, lo demas viene vacio y hace get predeterminado
        setLoadedMarkets(responseData.markets);
        setTotalPages(responseData.totalPages);
      } catch (err) {}
    };
    fetchMarkets();
  }, [sendRequest, search, page, size, totalPages]); // allows to run certain code only when certain dependencies change (first argument),  . Second arg = array of dependencies , data that needs to change for this return. recarga cada vez que se hace una request

  const handleTextFieldKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        if (event.target.value) {
          setSearch(event.target.value);
        } else {
          setSearch("merca");
        }
        break;
      case "Escape":
        setSearch("merca");
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
      {!isLoading && loadedMarkets && (
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
          <MarketList items={loadedMarkets} />
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

export default Markets;
