import React, { useEffect, useState } from "react";
import ShopList from "../components/ShopList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";


const Shops = () => {

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedShops, setLoadedShops] = useState();

  const marketId = useParams().marketId;

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/shop/market/${marketId}`
        ); // solo necesita url, lo demas viene vacio y hace get predeterminado
        setLoadedShops(responseData.shops);
      } catch (err) {}
    };
    fetchShops();
  }, [sendRequest, marketId]); // allows to run certain code only when certain dependencies change (first argument),  . Second arg = array of dependencies , data that needs to change for this return. recarga cada vez que se hace una request

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedShops && <ShopList items={loadedShops} />}
    </React.Fragment>
  );
};

export default Shops;
