import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Input } from "@mui/material";
import { Pagination } from "@mui/material";
import ErrorModal from "../../../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../../../shared/hooks/http-hook";
import ShopsTable from "./ShopsTable";
import "../sellerDashboardComponents/OrdersList.css";

const ShopListAdmin = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedShops, setLoadedShops] = useState();
  const [search, setSearch] = useState("merca");
  const [page, setPage] = useState(1);
  const [totalPages] = useState(1);
  const [size] = useState(10);

  const selectPage = (value) => {
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
    const fetchShops = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/shop/`
        ); // solo necesita url, lo demas viene vacio y hace get predeterminado
        setLoadedShops(responseData.shops);
      } catch (err) {}
    };
    fetchShops();
  }, [sendRequest, search, page, size, totalPages]); // allows to run certain code only when certain dependencies change (first argument),  . Second arg = array of dependencies , data that needs to change for this return. recarga cada vez que se hace una request

  return (
    <div>
      <React.Fragment>
        <React.Fragment>
          <ErrorModal error={error} onClear={clearError} />
          {!isLoading && loadedShops && totalPages && (
            <div>
              <div className="searchBoxSeller">
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
              </div>
              <ShopsTable items={loadedShops} />
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

export default ShopListAdmin;
