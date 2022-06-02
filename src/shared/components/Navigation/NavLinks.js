import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import AuthButton from "../FormElements/AuthButton";
import { useTranslation } from "react-i18next";
import "./NavLinks.css";
import ButtonLang from "./ButtonLang";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const { t, i18n } = useTranslation();
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
          <NavLink to="/auth/log"> Authenticate</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button className="batton" onClick={auth.logout}>
            {" "}
            Logout
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
