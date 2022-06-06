import React, { useState } from "react";
import Button from "../../../shared/components/FormElements/Button";
import Card from "../../../shared/components/UIElements/Card";
import { Modal } from "@mui/material";
import UpdateUser from "../components/UpdateUser";
import UpdatePass from "./UpdatePass";
import { useTranslation } from "react-i18next";
import "./ProfileMenu.css";
import CustomerService from "./CustomerService";

const ProfileMenu = (props) => {
  const [update, setUpdate] = useState(false);
  const [asistencia, setAsistencia] = useState(false);
  const [general, setGeneral] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { t } = useTranslation();
  const buttonHandler = (value) => async () => {
    switch (value) {
      case "update":
        setUpdate(true);
        setAsistencia(false);
        setGeneral(false);
        break;
      case "asistencia":
        setUpdate(false);
        setAsistencia(true);
        setGeneral(false);
        break;
      case "general":
        setUpdate(false);
        setAsistencia(false);
        setGeneral(true);
    }
  };
  const showStatusWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  return (
    <div>
      {general && (
        <React.Fragment>
          <Modal
            open={showConfirmModal}
            onClose={cancelDeleteHandler}
        
          >
            <UpdatePass
              user={props.user}
              token={props.token}
              close={cancelDeleteHandler}
            />
          </Modal>

          <div className="ds-list">
            <ul>
              <li>
                <Card className="ds-card">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/updateuser.png`}
                    alt="update"
                  ></img>
                  <Button
                    dClassName="ds-button"
                    onClick={buttonHandler("update")}
                  >
                    <p>{t("ACTUALIZAR_DATOS")} </p>
                  </Button>
                </Card>
              </li>
              <li>
                <Card className="ds-card">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/shield.png`}
                    alt="Seguridad y datos de inicio de sesión"
                  ></img>
                  <Button
                    dClassName="ds-button"
                    onClick={showStatusWarningHandler}
                  >
                    <p>{t("CAMBIAR_CONTRASEÑA")} </p>
                  </Button>
                </Card>
              </li>
              <li>
                <Card className="ds-card">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/customer-service.png`}
                    alt="Ayuda"
                  ></img>
                  <Button
                    dClassName="ds-button"
                    onClick={buttonHandler("asistencia")}
                  >
                    <p>{t("ASISTENCIA")}</p>
                  </Button>
                </Card>
              </li>
            </ul>
            </div>
        </React.Fragment>
      )}
      {update && (
        <UpdateUser
          user={props.user}
          token={props.token}
          close={buttonHandler("general")}
          updateFetch={props.updateFetch}
        />
      )}
        {asistencia && (
        <CustomerService
          user={props.user}
          token={props.token}
          close={buttonHandler}
        />
      )}
    </div>
  );
};

export default ProfileMenu;
