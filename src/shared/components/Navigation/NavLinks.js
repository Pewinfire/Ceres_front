import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import AuthButton from "../FormElements/AuthButton";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
        <li>
          <NavLink to={`/markets`}> Markets</NavLink>
        </li>
      {auth.isLoggedIn && (
        <li>
          <AuthButton></AuthButton>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth/log" > Authenticate</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button className="batton" onClick={auth.logout}> Logout</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
