import React from "react";
import "../sellerDashboardComponents/OrdersTable.css";
import Button from "../../../../shared/components/FormElements/Button";

const UserOrderTable = (props) => {
  return (
    <div className="orders-table seller">
      <table>
        <tr>
          <th className="ts-primero"> Id </th>
          <th> Nombre </th>
          <th> Tipo </th>
          <th> Nif</th>

          <th> Vendedor </th>
          <th> Mercado</th>
          <th className="ts-final"> Acciones</th>
        </tr>

        {props.items.map((elem) => {
          return (
            <tr>
              <td>{elem.id.slice(0, 10)}</td>
              <td>{elem.name}</td>
              <td>{elem.type}</td>

              <td>{elem.nif}</td>
              <td>
                {elem.owner
                  ? elem.owner.name + " " + elem.owner.lastname
                  : "No asignado"}
              </td>
              <td>{elem.marketo.name}</td>
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
