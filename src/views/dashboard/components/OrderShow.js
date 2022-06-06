import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import PDFcomponent from "../../../shared/components/PDF/PDFcomponent";
import "./OrderShow.css"

const OrderShow = (props) => {
  const [loadedOrder, setLoadedOrder] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/get/order/${props.order}`
        );
        setLoadedOrder(responseData.order);
      } catch (err) {}
    };
    fetchOrder();
  }, [sendRequest, props.order]);

  return (
    <div className="modalOrder">
      {loadedOrder && <PDFcomponent order={loadedOrder} isOrder={true}></PDFcomponent>}
    </div>
  );
};

export default OrderShow;
