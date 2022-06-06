import React from "react";
import "./sellerDashboardComponents/OrdersTable.css";
import Button from "../../../shared/components/FormElements/Button";
import { useTranslation } from "react-i18next";
const UserOrderTable = (props) => {
  const { t } = useTranslation();
  const dateParser = (string) => {
    const fecha = new Date(string);
    return fecha.toLocaleString();
  };
  return (
    <div className="orders-table">
      <table>
        <tr>
          <th className="ts-primero"> {t("PEDIDOS")}</th>
          <th> {t("VENDEDOR")} </th>
          <th>  {t("FECHA")}</th>
          <th>{t("DETALLES")}</th>
          <th className="ts-final"> {t("Estado")}</th>
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
                  {!elem.aceptado && !elem.cancelado && t("EN_PROCESO")}
                  {elem.aceptado && t("ACEPTADO")}
                  {elem.cancelado && t("RECHAZADO")}
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default UserOrderTable;
