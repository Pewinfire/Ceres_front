import { useEffect, useState, useContext } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";

export const checkRol = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isNot, setIsNot] = useState(false);
  const [rol, setRol] = useState();

  if (auth) {
    useEffect(() => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/user/rol/`,
          "GET",
          null,
          "",
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        setRol(responseData.rol);
        if (rol.isAdmin === true) {
          setIsAdmin(true);
          next();
        }
        if (rol.isSeller === true) {
          setIsSeller(true);
          next();
        } else {
          setIsClient(true);
          next();
        }
      } catch (error) {}
    });
  } else {
    setIsNot(true);
    next();
  }

  return { isAdmin, isSeller, isClient, isNot };
};
