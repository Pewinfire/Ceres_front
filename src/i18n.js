import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
const resources = {
  es: {
    translation: {
      EN_PROCESO: "En proceso",
      ESTADO: "Estado",
      TIENDAS: "Tiendas",
      SEGURO_ESTADO: "Estas seguro de que quieres cambiar el estado de la tienda?",
      METODO_PAGO:"Metodo de pago",
      COMPRA_PROPIA: "No puede realizar compras en su propia tienda",
      PAGO_TIENDA: "Pago en tienda",
      MERCADOS: "Mercados",
      CLIENTE: "Cliente",
      VENDEDOR: "Comerciante",
      PRODUCTO: "Producto",
      CANTIDAD: "Cantidad",
      PRECIO: "Precio",
      IVA: "IVA",
      IMPORTE: "Importe",
      TOTAL: "Total",
      PDF: "Generar PDF",
      BUSCAR_RESULTADOS: "Buscar resultados",
      INICIAR_SESS: "Iniciar sesión",
      CERRAR_SESS: "Cerrar sesión",
      INTRODUCIR_DIREC: "Introduce una dirección",
      BUSCAR: "Buscar",
      TIENDA_DESACTIVA: "La tienda no está activa en estos momentos",
      NECESITA_LOGUEAR:
        "Necesita loguearse primero para poder realizar la compra",
      EMAIL: "Email",
      PASSWORD: "Contraseña",
      INICIAR: "Iniciar",
      REGISTRAR_CUENTA: "Registrar cuenta",
      NOMBRE: "Nombre",
      APELLIDO: "Apellido",
      NIF: "NIF",
      TELEFONO_CONTACTO: "Teléfono de contacto",
      DIRECCION: "Dirección",
      PROVINCIA: "Provincia",
      LOCALIDAD: "Localidad",
      CODIGO_POSTAL: "Código postal",
      ELIJA_IMAGEN: "Por favor, elija una imagen",
      CONFIRMACION_CONTRAS: "Confirmación de la contraseña",
      REGISTRASE: "Registrarse",
      CESTA: "Cesta",
      TOTAL: "Total",
      TRAMITAR_PEDIDO: "Tramitar pedido",
      NUEVA_DIRECC_FACTURA: "Añadir nueva dirección de facturación",
      USAR_SOLO_ESTA_COMPRA: "Usar solo en esta compra",
      VOLVER: "Volver",
      ACTUALIZAR: "Actualizar",
      TARJETA_CREDITO: "Tarjeta de crédito",
      FINALIZAR_COMPRA: "Finalizar Compra",
      ACEPTO_TERMINOS: "Acepto los términos de uso y la politica de privacidad",
      SEGURO_COMPRAR: "Estás seguro de que quieres realizar la compra",
      CANCELAR: "Cancelar",
      REALIZAR_COMPRA: "Realizar compra",
      PEDIDO_COMPLETO: "Tu pedido se ha completado",
      VER_DETALLES: "Aquí puedes ver los detalles",
      PAGINA_PRINCIPAL: "Página principal",
      GENERAR_FACTURA: "Generar factura",
      MI_CUENTA: "Mi cuenta",
      VENDE_DEBE_ACEPTAR: "El vendedor debe aceptar el pedido",
      MI_PERFIL: "Mi perfil",
      MI_TIENDA: "Mi tienda",
      PEDIDOS: "Pedidos",
      ACTUALIZAR_DATOS: "Actualiza tus datos de usuario",
      CAMBIAR_CONTRASEÑA: "Cambiar contraseña",
      ASISTENCIA: "Asistencia",
      IR_TIENDA: "Ir a tienda",
      INACTIVO: "Inactivo",
      ACTIVO: "Activo",
      NUEVO_PRODUCTO: "Nuevo producto",
      ADMINISTRAR_TIENDA: "Administrar tienda",
      MODIFICAR_TIENDA: "Modificar datos de la tienda",
      ACTIVAR_TIENDA: "Activar tienda",
      DESACTIVAR_TIENDA: "Desactivar tienda",
      PRODUCTO: "Producto",
      IMAGEN: "Imagen",
      DESCRIPCION: "Descripción",
      CATEGORIAS: "Categorías",
      PRECIO: "Precio",
      STOCK: "Stock",
      ACCIONES: "Acciones",
      MODIFICAR_CARACTER: "Modificar características del producto",
      MODIFICAR_PRODUCTO: "Modificar producto",
      CLIENTE: "Cliente",
      FECHA: "Fecha",
      DETALLES: "Detalles",
      ACEPTADO: "Aceptado",
      RECHAZADO: "Rechazado",
      USUARIO: "Usuario",
      ROL: "Rol",
      AÑADIR_MERCADO: "Añadir mercado",
      ADMINISTRAR_MERCADO: "Administrar mercados",
      AÑADIR_PUESTO: "Añadir puesto",
      ADMINISTRAR_PUESTO: "Administrar puestos",
    },
  },
  val: {
    translation: {
      EN_PROCESO: "En procés",
      ESTADO: "Estat",
      TIENDAS: "Botigas",
      SEGURO_ESTADO: "Estàs segur que vols canviar l'estat de la botiga?",
      METODO_PAGO:"Mètode de pagament",
      COMPRA_PROPIA: "No pots fer compres a la seva pròpia botiga",
      PAGO_TIENDA: "Pagament a la botiga",
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
      IDENTIFICADOR: "ES",
      BUSCAR_RESULTADOS: "Buscar resultats",
      INICIAR_SESS: "Iniciar sessió",
      CERRAR_SESS: "Tancar sessió",
      INTRODUCIR_DIREC: "Introduir una direcció",
      BUSCAR: "Buscar",
      TIENDA_DESACTIVA: "La botiga no està activa en aquestos moments",
      NECESITA_LOGUEAR: "Cal loguear-se primer per a poder realitzar la compra",
      EMAIL: "e-mail",
      PASSWORD: "Contrasenya",
      INICIAR: "Iniciar",
      REGISTRAR_CUENTA: "Registrar compte",
      NOMBRE: "Nom",
      APELLIDO: "Cognoms",
      NIF: "NIF",
      TELEFONO_CONTACTO: "Telèfon de contacte",
      DIRECCION: "Direcció",
      PROVINCIA: "Província",
      LOCALIDAD: "Localitat",
      CODIGO_POSTAL: "Codi Postal",
      ELIJA_IMAGEN: "Per favor, escogeix una imatge",
      CONFIRMACION_CONTRAS: "Confirmació de la contrasenya",
      REGISTRASE: "Registrar-se",
      CESTA: "Cistella",
      TOTAL: "Total",
      TRAMITAR_PEDIDO: "Tramitar comanda",
      NUEVA_DIRECC_FACTURA: "Incloure nova direcció de facturació",
      USAR_SOLO_ESTA_COMPRA: "Usar sòlament en aquesta compra",
      VOLVER: "Tornar",
      ACTUALIZAR: "Actualitzar",
      TARJETA_CREDITO: "Targeta de crèdit",
      FINALIZAR_COMPRA: "Finalitzar la compra",
      ACEPTO_TERMINOS: "Acepte els termes d'ús i la política de privacitat",
      SEGURO_COMPRAR: "Estàs segur que vols realitzar la compra",
      CANCELAR: "Cancelar",
      REALIZAR_COMPRA: "Realitzar la compra",
      PEDIDO_COMPLETO: "La teua comanda s'ha completat",
      VER_DETALLES: "Aquí pots veure els detalls",
      PAGINA_PRINCIPAL: "Pàgina princial",
      GENERAR_FACTURA: "Generar factura",
      MI_CUENTA: "El meu compte",
      VENDE_DEBE_ACEPTAR: "El venedor ha d'acceptar la comanda",
      MI_PERFIL: "El meu perfil",
      MI_TIENDA: "La meua botiga",
      PEDIDOS: "Comandes",
      ACTUALIZAR_DATOS: "Actualitza les teues dades d'usuari",
      "CAMBIAR_CONTRASEÑA": "Canviar la contrasenya",
      ASISTENCIA: "Assistència",
      IR_TIENDA: "Ir a la botiga",
      INACTIVO: "Inactiu",
      ACTIVO: "Actiu",
      NUEVO_PRODUCTO: "Nou producte",
      ADMINISTRAR_TIENDA: "Administrar botiga",
      MODIFICAR_TIENDA: "Modificar dades de la botiga",
      ACTIVAR_TIENDA: "Activar botiga",
      DESACTIVAR_TIENDA: "Desactivar botiga",
      PRODUCTO: "Producte",
      IMAGEN: "Imatge",
      DESCRIPCION: "Descripció",
      CATEGORIAS: "Categoríes",
      PRECIO: "Preu",
      STOCK: "Stock",
      ACCIONES: "Accions",
      MODIFICAR_CARACTER: "Modificar característiques del producte",
      MODIFICAR_PRODUCTO: "Modificar producte",
      CLIENTE: "Client",
      FECHA: "Data",
      DETALLES: "Detalls",
      ACEPTADO: "Acceptat ",
      RECHAZADO: "Rebutjat",
      USUARIO: "Usuari",
      ROL: "Rol",
      "AÑADIR_MERCADO": "Afegir mercat",
      ADMINISTRAR_MERCADO: "Administrar mercats",
      "AÑADIR_PUESTO": "Afegir stand",
      ADMINISTRAR_PUESTO: "Administrar stand"
    },
  },
  en: {
    translation: {
      EN_PROCESO: "In procces",
      ESTADO: "Status",
      TIENDAS: "Shops",
      SEGURO_ESTADO: "Are you sure you want to change the store's status?",
      METODO_PAGO:"Payment method",
      COMPRA_PROPIA: "You can't buy in your own shop",
      PAGO_TIENDA: "Payment in store",
      MERCADOS: "Markets",
      CLIENTE: "Customer",
      VENDEDOR: "Seller",
      PRODUCTO: "Product",
      CANTIDAD: "Quantity",
      PRECIO: "Preu",
      IVA: "TAX",
      IMPORTE: "Amount",
      TOTAL: "Total",
      PDF: "Generate PDF",
      BUSCAR: "Search",
      IDENTIFICADOR: "ES",
      BUSCAR_RESULTADOS: "Search results",
      INICIAR_SESS: "Authenticate",
      CERRAR_SESS: "Close session",
      INTRODUCIR_DIREC: "Enter an address",
      BUSCAR: "Search",
      TIENDA_DESACTIVA: "The shop is not active in these moments",
      NECESITA_LOGUEAR: "You need to log first in order to continue shopping",
      EMAIL: "Email",
      PASSWORD: "Password",
      INICIAR: "Login",
      REGISTRAR_CUENTA: "Register an account",
      NOMBRE: "Name",
      APELLIDO: "Surname",
      NIF: "ID number",
      TELEFONO_CONTACTO: "Contact phone",
      DIRECCION: "Direction",
      PROVINCIA: "Province",
      LOCALIDAD: "Town",
      CODIGO_POSTAL: "Postal Code",
      ELIJA_IMAGEN: "Please, choose a picture",
      CONFIRMACION_CONTRAS: "Password confirmation",
      REGISTRASE: "Sign up",
      CESTA: "Basket",
      TOTAL: "Order total",
      TRAMITAR_PEDIDO: "Checkout",
      NUEVA_DIRECC_FACTURA: "Add new billing adress",
      USAR_SOLO_ESTA_COMPRA: "Use only in this purchase",
      VOLVER: "Turn",
      ACTUALIZAR: "Actualize",
      TARJETA_CREDITO: "Credit card",
      FINALIZAR_COMPRA: "Finish purchase",
      ACEPTO_TERMINOS:
        "I have read and I accept the terms and the privacy policy",
      SEGURO_COMPRAR: "Are you sure that you want to continue buying?",
      CANCELAR: "Cancel",
      REALIZAR_COMPRA: "Confirming purchase",
      PEDIDO_COMPLETO: "Your order is complete",
      VER_DETALLES: "Here you can check the details",
      PAGINA_PRINCIPAL: "Home page",
      GENERAR_FACTURA: "Generate invoice",
      MI_CUENTA: "My account",
      VENDE_DEBE_ACEPTAR: "The seller must accept the order",
      MI_PERFIL: "My profile",
      MI_TIENDA: "My shop",
      PEDIDOS: "Orders",
      ACTUALIZAR_DATOS: "Update your user data",
      CAMBIAR_CONTRASEÑA: "Change password",
      ASISTENCIA: "Support",
      IR_TIENDA: "Go to shop",
      INACTIVO: "Inactive",
      ACTIVO: "Active",
      NUEVO_PRODUCTO: "New product",
      ADMINISTRAR_TIENDA: "Manage shop",
      MODIFICAR_TIENDA: "Change shop data",
      ACTIVAR_TIENDA: "Activate shop",
      DESACTIVAR_TIENDA: "Desactivate shop",
      PRODUCTO: "Product",
      IMAGEN: "Picture",
      DESCRIPCION: "Descripcion",
      CATEGORIAS: "Category",
      PRECIO: "Price",
      STOCK: "Stock",
      ACCIONES: "Shares",
      MODIFICAR_CARACTER: "Change product features",
      MODIFICAR_PRODUCTO: "Change product",
      CLIENTE: "Client",
      FECHA: "Date",
      DETALLES: "Details",
      ACEPTADO: "Accepted",
      RECHAZADO: "Refused",
      USUARIO: "User",
      ROL: "Role",
      AÑADIR_MERCADO: "Add market",
      ADMINISTRAR_MERCADO: "Manage markets",
      AÑADIR_PUESTO: "Add stand",
      ADMINISTRAR_PUESTO: "Manage stand",
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
