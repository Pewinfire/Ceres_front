import React, { useEffect, useState } from "react";
import Button from "../../../shared/components/FormElements/Button";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./UserCart.css";

const UserCart = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCart, setLoadedCard] = useState();
  const [update, setUpdateRender] = useState(true);
  const [total, setTotal] = useState(0);

  const formatFormat = (quantity, format) => {
    switch (format) {
      case "u":
        return quantity + "u";
      case "gr":
        return quantity /1000+ "kg";
      case "doc":
        if (quantity === 0.5) {
          return "1/2 doc";
        } else {
          return quantity + "doc";
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
    updateRender();
  };

  // total
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {loadedCart && (
        <>
          <div className="cart-header">
            <h1>
              Cesta <i className="fas fa-shopping-basket"></i>
            </h1>
          </div>
          <div className="cart-list">
            <ul>
              <TransitionGroup className="todo-list">
                {loadedCart.map((cartItem) => {
                  return (
                    <CSSTransition
                      key={cartItem.product.id}
                      timeout={500}
                      classNames="item"
                    >
                      <li>
                        <div className="cart-list-row">
                          <img
                            src={`${process.env.REACT_APP_BACKEND_IMG}/${cartItem.product.image}`}
                            alt={cartItem.product.name}
                          ></img>
                          <div className="cart-list-data">
                            <h2>{cartItem.product.name}</h2>
                            <h3>{cartItem.product.stats.price} €/Kg</h3>
                            <h3>
                              {formatFormat(cartItem.quantity, cartItem.product.stats.format)}
                            </h3>
                          </div>
                          <div className="cart-list-actions">
                            <h2>
                              <Button
                                onClick={() =>
                                  deleteCartItem(cartItem.product.id)
                                }
                              >
                                <i className="fa-solid fa-square-minus"></i>
                              </Button>
                            </h2>

                            <h3>
                              {/*  {Math.round(
                        (cartItem.quantity * cartItem.product.stats.price +
                          Number.EPSILON) *
                          100
                      ) / 100}{" "}
                      € */}
                            </h3>
                          </div>
                        </div>
                      </li>
                    </CSSTransition>
                  );
                })}
              </TransitionGroup>
            </ul>
          </div>
          <div className="cart-footer">
            <h2>Total= </h2>
            <h1>
            <Button to={`/user/checkout`}>Tramitar pedido</Button>
            </h1>
          </div>
        </>
      )}
    </>
  );
};

export default UserCart;

//  <h2>
/* {" "}
total=

;
</h2> */
