import React, { Fragment } from "react";
import ReactToPdf from "react-to-pdf";
import { useTranslation } from "react-i18next";
import Button from "../FormElements/Button";
import "./PDFcomponent.css";

const PDFcomponent = (props) => {
  const ref = React.createRef();
  const { t, i18n } = useTranslation();
  const maxRows = 16;
  const iva = {
    1: "SRED",
    2: "RED",
    3: "GEN",
  };
  const ivaT = {
    1: 0.96,
    2: 0.9,
    3: 0.79,
  };
  const fillRest = (prods) => {
    const blankRows = Array(prods).fill(0);
    const rows = blankRows.map((x, i) => (
      <tr className="invoice-table-blankrow">
        <td>&nbsp; </td>
        <td> &nbsp;</td>
        <td>&nbsp; </td>
        <td> &nbsp;</td>
        <td>&nbsp; </td>
        <td> &nbsp;</td>
      </tr>
    ));
    return <Fragment>{rows}</Fragment>;
  };
  const totalSinIva = (prods) => {
    console.log(prods);
    return prods
      .reduce((sum, cartItem) => {
        return (sum +=
          cartItem.quantity *
          cartItem.product.stats.price *
          ivaT[cartItem.product.stats.discount]);
      }, 0)
      .toFixed(2);
  };
  const totalConIva = (prods) => {
    console.log(prods);
    return prods
      .reduce((sum, cartItem) => {
        return (sum += cartItem.quantity * cartItem.product.stats.price);
      }, 0)
      .toFixed(2);
  };
  return (
    <div className={props.isOrder ? "isOrder" : "App"}>
      <div
        className={
          props.isOrder ? "invoice-pdf-order-button" : "invoice-pdf-button"
        }
      >
        <ReactToPdf targetRef={ref}  filename={`Factura ${props.order.id}`}>
          {({ toPdf }) => (
            <Button disabled={!props.order.aceptado} title={!props.order.aceptado ? "El vendedor debe aceptar el pedido" : ""} onClick={toPdf}>
              {t("PDF")}
            </Button>
          )}
        </ReactToPdf>
      </div>
      <div className="invoice-container" ref={ref}>
        <div className="invoice-header">
          <h1>CERES</h1>
        </div>
        <div className="invoice-trade-data">
          <div className="invoice-client">
            <h2>{t("CLIENTE")}</h2>
            <div className="invoice-client-data">
              <ul>
                <li>
                  {props.order.client.name} {props.order.client.lastname}
                </li>
                <li>{props.order.client.dni}</li>
                <li>{props.order.billingAddress.address}</li>
                <li>
                  {props.order.billingAddress.locality}{" "}
                  {props.order.billingAddress.province}
                </li>
                <li>{props.order.billingAddress.postalCode}</li>
              </ul>
            </div>
          </div>
          <div className="invoice-seller">
            <h2>{t("VENDEDOR")}</h2>
            <div className="invoice-seller-data">
              <ul>
                <li>
                  {props.order.vendor.owner.name}{" "}
                  {props.order.vendor.owner.lastname}
                </li>
                <li>{props.order.vendor.nif}</li>
                <li>{props.order.vendor.name}</li>
                <li>{props.order.vendor.marketo.name}</li>
                <li>{props.order.vendor.location}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="invoice-product-table">
          <table className="invoice-product-table">
            <tr className="invoice-product-table-header">
              <th>{t("PRODUCTO")}</th>
              <th>REF</th>
              <th>{t("CANTIDAD")}</th>
              <th>{t("PRECIO")}</th>
              <th>{t("IVA")}</th>
              <th className="invoice-product-amm">{t("IMPORTE")}</th>
            </tr>
            {props.order.soldProducts.map((prod) => {
              return (
                <tr>
                  <td>{prod.product.name}</td>
                  <td>{prod._id.slice(6, 12)}</td>
                  <td>{prod.quantity + " " + prod.product.stats.format}</td>
                  <td>
                    {prod.product.stats.price +
                      " €/" +
                      prod.product.stats.format}
                  </td>
                  <td>{iva[prod.product.stats.discount]}</td>
                  <td className="invoice-product-amm">
                    {(prod.product.stats.price * prod.quantity).toFixed(2) +
                      " €"}
                  </td>
                </tr>
              );
            })}
            {fillRest(maxRows - props.order.soldProducts.length)}
            <tr className="invoice-footer-first">
              <td colspan="4">
                {t("TOTAL")}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </td>
              <td colspan="2">
                {totalSinIva(props.order.soldProducts) + " €"}
              </td>
            </tr>
            <tr className="invoice-footer-sec">
              <td colspan="2" className="invoice-footer-IVA">
                {t("IVA") + ": SRED 4% , RED 10%, GEN 21%"}
              </td>
              <td colspan="2">{`${t("TOTAL")} (${t("IVA")})`}</td>
              <td colspan="2">
                {totalConIva(props.order.soldProducts) + " €"}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PDFcomponent;
