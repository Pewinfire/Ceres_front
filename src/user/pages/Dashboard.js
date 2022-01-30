import React, { useState, useContext } from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import NavLink from "../../shared/components/Navigation/NavLinks";
import { Avatar } from "@mui/material";
import { AuthContext } from "../../shared/context/auth-context";
import "./Dashboard.css";

// falta autentificacion.

const Dashboard = () => {
  const [profile, setProfile] = useState(true);
  const [orders, setOrders] = useState(false);
  const [reviews, setReviews] = useState(false);
  const auth = useContext(AuthContext);
  
  const buttonHandler = (value) => async () => {
    switch (value) {
      case "profile":
        setProfile(true);
        setOrders(false);
        setReviews(false);
        break;
      case "orders":
        setProfile(false);
        setOrders(true);
        setReviews(false);
        break;
      case "reviews":
        setProfile(false);
        setOrders(false);
        setReviews(true);
        break;
      default:
        break;
    }
  };
  return (
    <div className="contenedor">
      <Avatar
        alt="avatar"
        src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/pew.jpg`}
        sx={{ width: "12vw", height: "12vw" }}
        className="avatarPos"
      />
      <div className="ButtonMenu">
        <Button dClassName="ds-button" onClick={buttonHandler("profile")}>
          <i className="fas fa-user fa-2x">
            <p>Mi Perfil</p>
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
      {profile && (
        <div className="ds-list">
          <ul>
            <li>
              <Card className="ds-card">
                <img
                  src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/update.png`}
                  alt="update"
                ></img>     
                  <Button to={`/${auth.userId}/user/update`}dClassName="ds-button">
                    <p>Actualiza tus datos de usuario </p>
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
                  <p>Cambiar contraseña </p>
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
  );
};

export default Dashboard;
