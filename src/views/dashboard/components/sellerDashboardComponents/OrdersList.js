import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../../../shared/hooks/http-hook";
import { Modal, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import Input from "@mui/material/Input";
import OrdersTable from "./OrdersTable";
import "./OrdersList.css";
import OrderShow from "../OrderShow";

const OrdersList = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedOrders, setLoadedOrders] = useState();
  const [search, setSearch] = useState("shop");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(10);
  const [order, setOrder] = useState();
  const [showModal, setShowModal] = useState(false);
  const [ reload, setReload] = useState(false);

  const showOrder = (order) => {
    setOrder(order);
    setShowModal(true);
  };

  const closeOrder = () => {
    setShowModal(false);
    setOrder();
  };


  const acceptOrder = async (order) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/accept/order/${order}`
      ); // solo necesita url, lo demas viene vacio y hace get predeterminado
    } catch (err) {}
    setReload( reload == false ? true : false)
  };

  const cancelOrder = async (order) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/cancel/order/${order}`
      ); // solo necesita url, lo demas viene vacio y hace get predeterminado
    } catch (err) {}
    setReload( reload == false ? true : false )
    
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/orders/vendor/${
            props.shop
          }/${page - 1}/${size}/${search}`
        ); // solo necesita url, lo demas viene vacio y hace get predeterminado
        setLoadedOrders(responseData.orders);
        setTotalPages(responseData.totalPages);
      } catch (err) {}
    };
    fetchOrders();
  }, [sendRequest, search, page, size, totalPages, reload]);

  const handleTextFieldKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        if (event.target.value) {
          setSearch(event.target.value);
        } else {
          setSearch("order");
        }
        break;
      case "Escape":
        setSearch("order");
        break;
      default:
        break;
    }
  };
  const selectPage = (event, value) => {
    setPage(value);
  };
  return (
    <>
      {order && (
        <Modal open={showModal} onClose={closeOrder}>
          <OrderShow order={order} />
        </Modal>
      )}

      <div className="orderslist">
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
        {loadedOrders && (
          <>
            {" "}
            <OrdersTable
              orders={loadedOrders}
              showOrder={showOrder}
              acceptOrder={acceptOrder}
              cancelOrder={cancelOrder}
            />
            <Pagination
              count={totalPages}
              page={page}
              className="pagination"
              color="success"
              onChange={selectPage}
              size="large"
            />
          </>
        )}
      </div>
    </>
  );
};

export default OrdersList;
