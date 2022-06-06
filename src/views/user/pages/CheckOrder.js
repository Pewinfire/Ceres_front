import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";
import "./CheckOrder.css";
import PDFcomponent from "../../../shared/components/PDF/PDFcomponent";
import Confetti from "react-confetti";
import Button from "../../../shared/components/FormElements/Button";
import AuthButton from "../../../shared/components/FormElements/AuthButton";
import { useTranslation } from "react-i18next";
import { Pagination } from "@mui/material";



const CheckOrder = (props) => {
  const orderId = useParams().orderId;
  const { t, i18n } = useTranslation();
  const [loadedOrders, setLoadedOrders] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [page, setPage] = useState(1);
  const [style, setStyle] = useState("text-focus-in");
  const [pages, setPages] = useState();

  const selectPage = (event, value) => {
    setStyle("text-blur-out");
    setTimeout(() => {
      setStyle("text-focus-in")
    }, 500);
    setTimeout(() => {
      setPage(value)
    }, 501);
   
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/pedido/${orderId}`
        );
        setLoadedOrders(responseData.pedido);
        setPages(responseData.pedido.length);
      } catch (err) {}
    };
    fetchOrders();
  }, [sendRequest, orderId]); // allows to run certain code only when certain dependencies change (first argument),  . Second arg = array of dependencies , data that needs to change for this return. recarga cada vez que se hace una request

  return (
    <div className="order-container ">
      {!props.consulta && (
        <div className="potato">
          {" "}
          <Confetti
            width={3000}
            height={2000}
            tweenDuration={10000}
            numberOfPieces={150}
            colors={[
              "#1A976E",
              "#0cd3ab",
              "#3E8E7E",
              "#7CD1B8",
              "#F8BB62",
              "#FAEDC6",
            ]}
          />
          <div className="order-msg text-focus-in">
            <h1>{t("PEDIDO_COMPLETO")}</h1>
          </div>
        </div>
      )}
  
      {loadedOrders && (
        <>
          <div >
            <div className="order-details">
              <h2>{t("VER_DETALLES")}</h2>
              <div className={style}>
                <PDFcomponent order={loadedOrders[page - 1]}></PDFcomponent>
              </div>
            </div>
          </div>
          <div className="order-actions-uno">
            <Button to={`/`}>{t("PAGINA_PRINCIPAL")}</Button>
       
            <AuthButton isButton={true}></AuthButton>
          </div>
        </>
      )}
          {loadedOrders && loadedOrders.length >= 1 && (
        <div className="invoice-pagination">
          <Pagination
            count={loadedOrders.length}
            page={page}
            onChange={selectPage}
      
          />
        </div>
      )}
    </div>
  );
};

export default CheckOrder;
