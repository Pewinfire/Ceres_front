import React, { useEffect, useState, useContext } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import { Link } from "react-router-dom";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import "./Button.css";

const AuthButton = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [authRol, setAuthRol] = useState();
  const [url, setUrl] = useState("/user/dashboard");
  const { t } = useTranslation();
  useEffect(() => {
    if (auth.token) {
      const fetchUser = async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/auth/checkrol`,
            "GET",
            null,
            {
              Authorization: "Bearer " + auth.token,
            }
          );
          setAuthRol(responseData.Authorization);
        } catch (error) {}
      };
      fetchUser();
      switch (authRol) {
        case "isAdmin":
          setUrl("/admin/admDS");
          break;
        case "isSeller":
          setUrl("/seller/sllrDS");
          break;
        case "isClient":
          setUrl("/user/dashboard");
          break;
      }
    }
  }, [sendRequest, auth.token, authRol]);

  return (
    <div>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && authRol && !props.isButton && (
        <Link to={url} exact="exact" >
          <i className="far fa-user"></i>
        </Link>
      )}
         {!isLoading && authRol && props.isButton && (
        <Button to={url} exact="exact" >
         {t("MI_CUENTA")}
        </Button>
      )}
    </div>
  );
};

export default AuthButton;
