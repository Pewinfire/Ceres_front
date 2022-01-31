import React, { useState, useContext, useEffect } from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { Avatar } from "@mui/material";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Users from "./User";
import "./AdminDashboard.css";

// falta autentificacion.

const Dashboard = () => {
  const [general, setGeneral] = useState(true);
  const [profile, setProfile] = useState(false);
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
        setProfile(false);
        setMarkets(false);
        setShops(false);
        setGeneral(true);
        break;
      }
      case "profile":
        setProfile(true);
        setMarkets(false);
        setShops(false);
        setGeneral(false);
        break;
      case "markets":
        setProfile(false);
        setMarkets(true);
        setShops(false);
        setGeneral(false);
        break;
      case "shops":
        setProfile(false);
        setMarkets(false);
        setShops(true);
        setGeneral(false);
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
        <div className="contenedor">
          <Avatar
            alt="avatar"
            src={`${process.env.REACT_APP_BACKEND_IMG}/${user.image}`}
            sx={{ width: "12vw", height: "12vw" }}
            className="avatarPos"
          />
          <div className="ButtonMenu">
            <Button dClassName="ds-button" onClick={buttonHandler("general")}>
              <i className="fas fa-cogs fa-2x">
                <p>General</p>
              </i>
            </Button>
            <Button dClassName="ds-button" onClick={buttonHandler("profile")}>
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
          </div>
          {general && (
            <div className="ds-list">
              <Users />
            </div>
          )}
          {markets && (
            <div className="ds-list">
              <ul>
                <li>
                  <Card className="ds-card">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/update.png`}
                      alt="update"
                    ></img>
                    <Button to={`/markets/new`} dClassName="ds-button">
                      <p>Create Market </p>
                    </Button>
                  </Card>
                </li>
                <li>
                  <Card className="ds-card">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/shield.png`}
                      alt="Seguridad y datos de inicio de sesión"
                    ></img>
                    <Button dClassName="ds-button">
                      <p>`/:marketId/market/edit` </p>
                    </Button>
                  </Card>
                </li>
                <li>
                  <Card className="ds-card">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/customer-service.png`}
                      alt="Ayuda"
                    ></img>
                    <Button dClassName="ds-button">
                      <p>Asistencia</p>
                    </Button>
                  </Card>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
