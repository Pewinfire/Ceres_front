import React from "react";
import "./OrdersTable.css";
import Button from "../../../../shared/components/FormElements/Button";
const OrdersTable = (props) => {
  const dateParser = (string) => {
    const fecha = new Date(string);
    return fecha.toLocaleString();
  };
  return (
    <div className="orders-table">
      <table>
        <tr>
          <th className="ts-primero"> Order</th>
          <th> Cliente </th>
          <th> Fecha</th>
          <th>Detalles</th>
          <th className="ts-final"> Acciones</th>
        </tr>

        {props.orders
          // .sort((a, b) => new Date(b.dateOrder) - new Date(a.dateOrder))
          .map((elem) => {
            return (
              <tr>
                <td>{elem.id.slice(0, 10)}</td>
                <td>
                  {elem.client.name} {elem.client.lastname}
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
                  {!elem.aceptado && !elem.cancelado && (
                    <>
                      <Button
                        onClick={() => {
                          props.acceptOrder(elem.id);
                        }}
                      >
                        <i class="fa-solid fa-check"></i>
                      </Button>
                      <Button
                        danger
                        onClick={() => {
                          props.cancelOrder(elem.id);
                        }}
                      >
                        <i class="fa-solid fa-xmark"></i>
                      </Button>
                    </>
                  )}
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

export default OrdersTable;
