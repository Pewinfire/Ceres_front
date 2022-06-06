import React, { useEffect, useState } from "react";
import Button from "../../../shared/components/FormElements/Button";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useTranslation } from "react-i18next";
import "./UserCart.css";

const UserCart = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCart, setLoadedCard] = useState();
  const [update, setUpdateRender] = useState(true);
  const [total, setTotal] = useState(0);
  const { t, i18n } = useTranslation();

  const formatFormat = (quantity, format) => {
    switch (format) {
      case "u":
        return quantity + " u";
      case "gr":
        return quantity / 1000 + " kg";
      case "doc":
        if (quantity === 0.5) {
          return "1/2 doc";
        } else {
          return quantity + " doc";
        }
    }
  };

  const updateRender = () => {
    setUpdateRender(update === true ? false : true);
  };

  useEffect(() => {
    if (props.token) {
      const fetchCart = async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/cart/get`,
            "GET",
            null,
            {
              Authorization: "Bearer " + props.token,
            }
          );
          setLoadedCard(responseData.user.cart.cartItem);

          setTotal(
            responseData.user.cart.cartItem.reduce((sum, cartItem) => {
              return (sum += cartItem.quantity * cartItem.product.stats.price);
            }, 0)
          );
        } catch (err) {}
      };
      fetchCart();
    }
  }, [sendRequest, props.token, update, props.update]);

  const deleteCartItem = async (pid) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/cart/deleteItem/${pid}`,
        "PATCH",
        null,
        {
          Authorization: "Bearer " + props.token,
        }
      );
    } catch (err) {}
    setTotal(0);
    updateRender();
  };

  // total
  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />
      {loadedCart && (
        <>
          <div className="cart-header">
            <h1>
              {t("CESTA")} <i className="fas fa-shopping-basket"></i>
            </h1>
          </div>
          <div className="cart-list">
            <ul>
              {loadedCart && (
                <TransitionGroup className="todo-list">
                  {loadedCart.map((cartItem) => {
                    return (
                      <CSSTransition
                        key={cartItem.product.id}
                        timeout={500}
                        classNames="item"
                      >
                        <li>
                          <div className="Cart-Items">
                            <div className="image-box">
                              <img
                                src={`${process.env.REACT_APP_BACKEND_IMG}/${cartItem.product.image}`}
                                alt={cartItem.product.name}
                              ></img>
                            </div>
                            <div className="about">
                              <h1 className="title">
                                {cartItem.product.name.length > 19
                                  ? cartItem.product.name.slice(0, 20) + "..."
                                  : cartItem.product.name}
                              </h1>
                              <h3 className="subtitle">{cartItem.shop.name}</h3>
                            </div>
                            <div className="counter">
                              <div className="count">
                                {" "}
                                {formatFormat(
                                  cartItem.quantity,
                                  cartItem.product.stats.format
                                )}
                              </div>
                              <div className="amount">
                                {cartItem.product.stats.price} €/
                                {cartItem.product.stats.format}
                              </div>
                            </div>
                            <div className="btn">
                              {" "}
                              <Button
                                onClick={() =>
                                  deleteCartItem(cartItem.product.id)
                                }
                              >
                                <i className="fa-solid fa-square-minus"></i>
                              </Button>
                            </div>
                          </div>
                        </li>
                      </CSSTransition>
                    );
                  })}
                </TransitionGroup>
              )}
            </ul>
          </div>
          <div className="cart-footer">
            <h2 className="totalo">Total= {total > 0 ? total.toFixed(2) + " €" : " "}</h2>
            <h1>
              {props.checkoutMode && (
                <Button
                  title="Debes marcar la forma de pago y aceptar los terminos de uso"
                  disabled={!props.options.payTipe && !props.options.agreement}
                  onClick={() => {
                    props.makeOrder(true);
            
                  }}
                >
                  {t("FINALIZAR_COMPRA")}
                </Button>
              )}
              {!props.checkoutMode && (
                <Button to={`/user/checkout`}>{t("TRAMITAR_PEDIDO")}</Button>
              )}
            </h1>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCart;

//  <h2>
/* {" "}
total=

;
</h2> */
