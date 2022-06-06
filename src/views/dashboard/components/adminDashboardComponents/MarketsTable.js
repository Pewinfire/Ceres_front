import React from "react";
import "../sellerDashboardComponents/OrdersTable.css";
import Button from "../../../../shared/components/FormElements/Button";

const UserOrderTable = (props) => {
  const dateParser = (string) => {
    const fecha = new Date(string);
    return fecha.toLocaleString();
  };
  return (
    <div className="orders-table admin">
      <table>
        <tr>
          <th className="ts-primero"> Id </th>
          <th> Nombre </th>
          <th> Dirección </th>
          <th> Codigo Postal</th>
          <th className="ts-final"> Acciones</th>
        </tr>

        {props.items.map((elem) => {
          return (
            <tr>
              <td>{elem.id.slice(0, 10)}</td>
              <td>{elem.name}</td>
              <td>{elem.address}</td>
              <td>{elem.postalCode}</td>
              <td>
                <Button inverse>
                  <i className="fas fa-cogs "></i>
                </Button>
                <Button danger>
                  <i className="fas fa-trash-alt"></i>
                </Button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default UserOrderTable;
