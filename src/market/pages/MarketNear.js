import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MarketList from "../components/MarketList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Box } from "@mui/system";
import Input from "@mui/material/Input";

const MarketNear = () => {
  const [loadedMarkets, setLoadedMarkets] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [search, setSearch] = useState("merca");
  const address = useParams().addr;

  useEffect(() => {
    console.log(address);
    const fetchMarkets = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/market/near/${address}`
        );

        setLoadedMarkets(responseData.markets);
      } catch (err) {}
    };
    fetchMarkets();
  }, [sendRequest, address]);


  const handleTextFieldKeyDown = event => {
    switch (event.key) {
        case 'Enter':
          if(event.target.value){
          setSearch(event.target.value);}
          else{
            setSearch("merca")
          }
            break
        case 'Escape':
          setSearch("merca")
            break
        default: break
    }
}

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
        </div>
      )}
    </React.Fragment>
  );
};

export default MarketNear;
