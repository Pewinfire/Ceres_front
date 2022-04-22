import React, { useEffect, useState } from "react";
import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { Modal } from "@mui/material";

import "../pages/Form.css";

const UpdatePass = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formState, inputHandler, setFormData] = useForm(
    {
      password: { value: "", isValid: false },
      passwordRepeat: { value: "", isValid: false },
      oldPassword: { value: "", isValid: false },
    },
    false
  );

  const userUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    if (
      formState.inputs.password.value === formState.inputs.passwordRepeat.value
    ) {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/pass/${props.user}`,
          "PATCH",
          JSON.stringify({
            password: formState.inputs.password.value,
            oldPassword: formState.inputs.oldPassword.value,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.token,
          }
        );
      } catch (err) {}
      props.close();
    } else {
      setShowConfirmModal(true);
    }
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  return (
    <React.Fragment>
      <Modal open={showConfirmModal} onClose={cancelDeleteHandler}>
        <div className="error-m">
          <p >
            La nueva contraseña introducida en los campos no coincide, vuelva a
            intentarlo
          </p>
          <Button dClassName="error-m-button" onClick={cancelDeleteHandler}>
            Cerrar
          </Button>
        </div>
      </Modal>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <form className="pf-modal" onSubmit={userUpdateSubmitHandler}>
          <Input
            element="input"
            id="password"
            type="password"
            label="Nueva contraseña"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Por favor, introduce una contraseña con 6 caracteres por lo menos"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="passwordRepeat"
            type="password"
            label="Repite tu nueva contraseña"
            validators={[VALIDATOR_REQUIRE]}
            errorText="Por favor, introduce una contraseña"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="oldPassword"
            type="password"
            label="Contraseña antigua"
            validators={[VALIDATOR_REQUIRE]}
            errorText="Por favor, introduce tu contraseña antigua"
            onInput={inputHandler}
          />

          <div className="right">
            <Button onClick={props.close}>Volver </Button>

            <Button type="submit" disabled={!formState.isValid}>
              Cambiar Contraseña
            </Button>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePass;
