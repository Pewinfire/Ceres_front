import React, { useState, useContext, useEffect } from "react";
import CheckoutForm from "../components/CheckoutForm";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import UserCart from "../components/UserCart";

const Checkout = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  const auth = useContext(AuthContext);

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
  }, [sendRequest, auth.userId]);

  return (
    <>
      {!isLoading && loadedUser && (
        <React.Fragment>
          <div className="checkoutForm">
            <CheckoutForm user={loadedUser}></CheckoutForm>
          </div>
          <div className="checkout--UserCart">
            <UserCart token={auth.token}  userId={auth.userId} />
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default Checkout;
