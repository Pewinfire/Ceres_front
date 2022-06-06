import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import AuthButton from "../FormElements/AuthButton";
import { useTranslation } from "react-i18next";
import ButtonLang from "./ButtonLang";
import "./NavLinks.css";


const NavLinks = () => {
  const auth = useContext(AuthContext);
  const { t } = useTranslation();
  return (
    <ul className="nav-links">
      <li>
        <NavLink to={`/markets`}> {t("MERCADOS")}</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <AuthButton></AuthButton>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth/log"> {t("INICIAR_SESS")}</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button className="batton" onClick={auth.logout}>
          {t("CERRAR_SESS")}
          </button>
        </li>
      )}
        <li>
        <ButtonLang />
      </li>
    </ul>
  );
};

export default NavLinks;
