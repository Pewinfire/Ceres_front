import React, { useState, useContext, useEffect } from "react";
import Button from "../../../shared/components/FormElements/Button";
import Card from "../../../shared/components/UIElements/Card";
import { Avatar } from "@mui/material";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import UsersList from "../components/adminDashboardComponents/UsersList";
import AdminMarketsMenu from "../components/adminDashboardComponents/AdminMarketsMenu";
import "./SellerDashboard.css";
import AdminShopsMenu from "../components/adminDashboardComponents/AdminShopsMenu";

// falta autentificacion.

const AdminDashboard = () => {
  const [general, setGeneral] = useState(false);
  const [users, setUsers] = useState(true);
  const [markets, setMarkets] = useState(false);
  const [shops, setShops] = useState(false);
  const [user, setUser] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.token) {
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
    }
  }, [sendRequest, auth.userId, auth.token]);

  const buttonHandler = (value) => async () => {
    switch (value) {
      case "general": {
        setUsers(false);
        setMarkets(false);
        setShops(false);
        setGeneral(true);
        break;
      }
      case "users":
        setUsers(true);
        setMarkets(false);
        setShops(false);
        setGeneral(false);
        break;
      case "markets":
        setUsers(false);
        setMarkets(true);
        setShops(false);
        setGeneral(false);
        break;
      case "shops":
        setUsers(false);
        setMarkets(false);
        setShops(true);
        setGeneral(false);
        break;
      default:
        break;
    }
  };

  return (
    <div>
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
              <Button dClassName="ds-button" onClick={buttonHandler("users")}>
                <i className="fas fa-users fa-2x">
                  <p>Usuarios</p>
                </i>
              </Button>
              <Button dClassName="ds-button" onClick={buttonHandler("markets")}>
                <i className="fas fa-map-marker-alt fa-2x">
                  <p>Mercados</p>
                </i>
              </Button>
              <Button dClassName="ds-button" onClick={buttonHandler("shops")}>
                <i className="fas fa-store fa-2x">
                  <p>Tiendas</p>
                </i>
              </Button>
              <Button dClassName="ds-button" onClick={buttonHandler("general")}>
                <i className="fas fa-cogs fa-2x">
                  <p>General</p>
                </i>
              </Button>
            </div>
          </div>
          <div className="contenedor">
            {users && (
              <div className="options">
                <UsersList token={auth.token} />
              </div>
            )}
            {general && (
              <div className="ds-list">
              
              </div>
            )}
            {markets && (
              <div className="ds-list">
                <AdminMarketsMenu token={auth.token} />
              </div>
            )}
            {shops && (
              <div className="ds-list">
                <AdminShopsMenu token={auth.token} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
