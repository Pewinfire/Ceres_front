import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MarketList from "../components/MarketList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const MarketNear = () => {
  const [loadedMarkets, setLoadedMarkets] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const address = useParams().addr;

  useEffect(() => {
    console.log(address)
    const fetchMarkets = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/market/near/${address}`,
        );

        setLoadedMarkets(responseData.markets);
      } catch (err) {}
    };
    fetchMarkets();
  }, [sendRequest, address]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedMarkets && <MarketList items={loadedMarkets} />};
    </React.Fragment>
  );
};

export default MarketNear;
