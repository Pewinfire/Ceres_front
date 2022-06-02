import React, { useState, useContext, useEffect } from "react";
import CheckoutForm from "../components/CheckoutForm";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import UserCart from "../components/UserCart";
import { Modal } from "@mui/material";
import "./Checkout.css";
import Button from "../../../shared/components/FormElements/Button";

const Checkout = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  const [updateRender, setUpdateRender] = useState();
  const auth = useContext(AuthContext);
  const checkoutMode = true;
  const [makeOrder, setMakeOrder] = useState(false);
  const [options, setOptions] = useState({ payType: "", agreement: false });
  const history = useHistory();
  const cancelOrderHandler = () => {
    setMakeOrder(false);
  };

  const update = () => {
    updateRender = false ? setUpdateRender(true) : setUpdateRender(false);
  };

  const checkoutOrder = async (event) => {
    setMakeOrder(false);
    event.preventDefault();
    try {
    const responseData =   await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/makeOrder`,
        "POST",
        "",
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push(`/user/checkorder/${responseData.pedido}`);
    } catch (err) {
      console.log(err);
    }
  
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        setLoadedUser(responseData.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [sendRequest, auth.userId, updateRender]);

  return (
    <>
      <Modal open={makeOrder} onClose={cancelOrderHandler}>
        <div className="modalWindow">
          <div className="modalText">
            ¿Estas Seguro de que quieres realizar la compra?
          </div>
          <div className="modalButtons">
            {" "}
            <Button inverse onClick={cancelOrderHandler}>
              Cancelar
            </Button>
            <Button danger onClick={checkoutOrder}>
              Realizar compra
            </Button>
          </div>
        </div>
      </Modal>
      {!isLoading && loadedUser && (
        <React.Fragment>
          <div className="checkoutForm">
            <CheckoutForm
              user={loadedUser}
              token={auth.token}
              userId={auth.userId}
              update={update}
              options={options}
              setOptions={setOptions}
            ></CheckoutForm>
          </div>
          <div className="checkout--UserCart">
            <UserCart
              token={auth.token}
              userId={auth.userId}
              checkoutMode={checkoutMode}
              makeOrder={setMakeOrder}
              options={options}
            />
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default Checkout;
