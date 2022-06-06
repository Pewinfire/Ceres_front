import React from "react";
import "./sellerDashboardComponents/OrdersTable.css";
import Button from "../../../shared/components/FormElements/Button";

const UserOrderTable = (props) => {
  const dateParser = (string) => {
    const fecha = new Date(string);
    return fecha.toLocaleString();
  };
  return (
    <div className="orders-table">
      <table>
        <tr>
          <th className="ts-primero"> Order</th>
          <th> Vendedor </th>
          <th> Fecha</th>
          <th>Detalles</th>
          <th className="ts-final"> Estado</th>
        </tr>

        {props.orders
          .map((elem) => {
            return (
              <tr>
                <td>{elem.id.slice(0, 10)}</td>
                <td>
                  {elem.vendor.name} 
                </td>
                <td>{dateParser(elem.dateOrder)}</td>
                <td>
                  <Button
                    onClick={() => {
                      props.showOrder(elem.id);
                    }}
                  >
                    <i class="fa-solid fa-eye"></i>
                  </Button>
                </td>
                <td>
                  {!elem.aceptado && !elem.cancelado && "En Proceso"}
                  {elem.aceptado && "Aceptado"}
                  {elem.cancelado && "Rechazado"}
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default UserOrderTable;
