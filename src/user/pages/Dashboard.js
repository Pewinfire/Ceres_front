import React from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

import "./Dashboard.css";

// falta autentificacion.

const Dashboard = () => {
  return (
    <div className="ds-list">
        <ul>
        <li className="ds-item">
      <Card className="ds-item__content">
        <div className="ds-item__icon">
          <i className="far fa-user fa-7x"></i>
        </div>
        <div className="ds-item__actions">
          <Button to={`/user/list`} inverse>
            Consultar y modificar
          </Button>
          <Button to={`/user/NewUser`} inverse>
            Crear Nuevo Usuario
          </Button>
        </div>
      </Card>
      </li>
      <li className="ds-item">
      <Card className="ds-item__content">
        <div className="ds-item__icon">
          <i className="fas fa-map-marker-alt fa-7x"></i>
        </div>
        <div className="ds-item__actions">
          <Button to={`/markets/list`} inverse>
            Consultar y modificar
          </Button>
          <Button to={`/markets/new`} inverse>
            Crear Nuevo Mercado
          </Button>
        </div>
      </Card>
      </li>
      <li className="ds-item">
      <Card className="ds-item__content">
        <div className="ds-item__icon">
          <i className="fas fa-store fa-7x"></i>
        </div>
        <div className="ds-item__actions">
          <Button to={`/shops/list`} inverse>
            Consultar y modificar
          </Button>
          <Button to={`/shops/new`} inverse>
            Crear Nuevo Puesto
          </Button>
        </div>
      </Card>
      </li>
      </ul>
    </div>
  );
};

export default Dashboard;
