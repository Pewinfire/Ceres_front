import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
const resources = {
  es: {
    translation: {
      MERCADOS: "Mercados",
      CLIENTE: "Cliente",
      VENDEDOR: "Comerciante",
      PRODUCTO: "Producto",
      CANTIDAD: "Cantidad",
      PRECIO: "Precio",
      IVA: "IVA",
      IMPORTE: "Importe",
      TOTAL: "Total",
      PDF: "Generar PDF"
    },
  },
  val: {
    translation: {
      MERCADOS: "Mercat ",
      CLIENTE: "Client",
      VENDEDOR: "Comerciant",
      PRODUCTO: "Producte",
      CANTIDAD: "Quantitat",
      PRECIO: "Price",
      IVA: "IVA",
      IMPORTE: "Import",
      TOTAL: "Total",
      PDF: "Generar PDF",
    },
  },
  en: {
    translation: {
      MERCADOS: "Markets",
      CLIENTE: "Customer",
      VENDEDOR: "Seller",
      PRODUCTO: "Product",
      CANTIDAD: "Quantity",
      PRECIO: "Preu",
      IVA: "TAX",
      IMPORTE: "Amount",
      TOTAL: "Total",
      PDF: "Generate PDF"
    },
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: "es",

  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});
export default i18n;
