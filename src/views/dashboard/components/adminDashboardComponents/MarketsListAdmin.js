import React, { useEffect, useState } from "react";
import Button from "../../../../shared/components/FormElements/Button";
import { Box } from "@mui/system";
import { Input } from "@mui/material";
import { Pagination } from "@mui/material";
import ErrorModal from "../../../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../../../shared/hooks/http-hook";
import MarketsTable from "./MarketsTable";
import "../sellerDashboardComponents/OrdersList.css";

const UsersList = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedMarkets, setLoadedMarkets] = useState();
  const [search, setSearch] = useState("merca");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [size, setSize] = useState(10);

  const selectPage = (event, value) => {
    setPage(value);
  };
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

  return (
    <div>
      <React.Fragment>
        <React.Fragment>
          <ErrorModal error={error} onClear={clearError} />
          {!isLoading && loadedMarkets && totalPages &&(
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
              <MarketsTable items={loadedMarkets} />
              <div className="pagination">
                <Pagination
                  count={totalPages}
                  page={page}
                  color="success"
                  onChange={selectPage}
                  size="large"
                />
              </div>
            </div>
          )}
        </React.Fragment>
      </React.Fragment>
    </div>
  );
};

export default UsersList;
