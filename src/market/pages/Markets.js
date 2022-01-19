import React, { useEffect, useState } from "react";

import MarketList from "../components/MarketList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Markets = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedMarkets, setLoadedMarkets] = useState();


  useEffect(() => {
  
    const fetchMarkets = async () => {

      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/market`
        ); // solo necesita url, lo demas viene vacio y hace get predeterminado
        setLoadedMarkets(responseData.markets);
      } catch (err) {}
    };
    fetchMarkets();
  }, [sendRequest]); // allows to run certain code only when certain dependencies change (first argument),  . Second arg = array of dependencies , data that needs to change for this return. recarga cada vez que se hace una request

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedMarkets && <MarketList items={loadedMarkets} />}
    </React.Fragment>
  );
};

export default Markets;
