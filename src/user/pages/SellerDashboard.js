import React, { useState, useContext, useEffect } from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { Avatar } from "@mui/material";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ShopMenu from "../components/ShopMenu";
import ProfileMenu from "../components/ProfileMenu";
import "./SellerDashboard.css";
// falta autentificacion.

const Dashboard = () => {
  const [profile, setProfile] = useState(true);
  const [orders, setOrders] = useState(false);
  const [shop, setShop] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [user, setUser] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        setUser(responseData.user);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, auth.userId, auth.token]);

  const buttonHandler = (value) => async () => {
    switch (value) {
      case "profile":
        setProfile(true);
        setOrders(false);
        setReviews(false);
        setShop(false);
        break;
      case "orders":
        setProfile(false);
        setOrders(true);
        setReviews(false);
        setShop(false);
        break;
      case "shop":
        setProfile(false);
        setShop(true);
        setOrders(false);
        setReviews(false);
        break;
      case "reviews":
        setProfile(false);
        setOrders(false);
        setReviews(true);
        setShop(false);
        break;
      default:
        break;
    }
  };

  if (!user && !error && !isLoading) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find User!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && user && (
        <>
          <div className="top">
            <Avatar
              alt="avatar"
              src={`${process.env.REACT_APP_BACKEND_IMG}/${user.image}`}
              sx={{ width: "12vw", height: "12vw" }}
              className="avatarPos"
            />
            <div className="ButtonMenu">
              <Button dClassName="ds-button" onClick={buttonHandler("profile")}>
                <i className="fas fa-user fa-2x">
                  <p>Mi Perfil</p>
                </i>
              </Button>
              <Button dClassName="ds-button" onClick={buttonHandler("shop")}>
                <i className="fas fa-store fa-2x">
                  <p>Mi Tienda</p>
                </i>
              </Button>
              <Button dClassName="ds-button" onClick={buttonHandler("orders")}>
                <i className="fas fa-file-invoice fa-2x">
                  <p>Pedidos</p>
                </i>
              </Button>
              <Button dClassName="ds-button" onClick={buttonHandler("reviews")}>
                <i className="fas fa-star-half-alt fa-2x">
                  <p>Opiniones</p>
                </i>
              </Button>
            </div>
          </div>
          <div className="contenedor">
            {profile && (
              <div className="options">
                <ProfileMenu
                  user={auth.userId}
                  token={auth.token} /* back={{buttonHandler}} */
                />
              </div>
            )}
            {shop && (
              <div className="options">
                <ShopMenu shop={user.shop} token={auth.token} />
              </div>
            )}
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
