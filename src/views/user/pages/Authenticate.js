import React, { useState, useContext } from "react";
import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";
import Card from "../../../shared/components/UIElements/Card";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_DNI,
  VALIDATOR_PASS,
} from "../../../shared/util/validators";
import { useTranslation } from "react-i18next";
import { useForm } from "../../../shared/hooks/form-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import "./Authenticate.css";

const Authenticate = (props) => {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          lastname: undefined,
          image: undefined,
          dni: undefined,
          phone: undefined,
          address: undefined,
          locality: undefined,
          postalCode: undefined,
          province: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: "", isValid: false },
          lastname: { value: "", isValid: false },
          image: { value: null, isValid: false },
          dni: { value: "", isValid: false },
          phone: { value: "", isValid: false },
          address: { value: "", isValid: false },
          locality: { value: "", isValid: false },
          postalCode: { value: "", isValid: false },
          province: { value: "", isValid: false },
        },
        false
      );
    }

    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
        // solo loguea cuando no hay error
      } catch (err) {
        // se maneja en el hook
      }
      if (props.close) {
        props.close();
      }
    } else {
      const formData = new FormData();
      formData.append("email", formState.inputs.email.value);
      formData.append("name", formState.inputs.name.value);
      formData.append("lastname", formState.inputs.lastname.value);
      formData.append("password", formState.inputs.password.value);
      formData.append("image", formState.inputs.image.value);
      formData.append("dni", formState.inputs.dni.value);
      formData.append("phone", formState.inputs.phone.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("province", formState.inputs.province.value);
      formData.append("locality", formState.inputs.locality.value);
      formData.append("postalCode", formState.inputs.postalCode.value);

      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          "POST",
          formData // los headers los manda el metodo fetch() auto
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{t("INICIAR_SESS")}</h2>
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <React.Fragment>
              <Input
                element="input"
                id="name"
                type="text"
                label={t("NOMBRE")}
                validators={[VALIDATOR_REQUIRE]}
                errorText="Por favor, introduce un nombre"
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="lastname"
                type="text"
                label={t("APELLIDO")}
                validators={[VALIDATOR_REQUIRE]}
                errorText="Por favor, introduce un apellido"
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="dni"
                type="text"
                label={t("NIF")}
                validators={[VALIDATOR_DNI]}
                errorText="Por favor, introduce un DNI o NIE  valido"
                onInput={inputHandler}
              />
              <Input
                element="input"
                id={t("TELEFONO_CONTACTO")}
                type="text"
                label="Telefono de contacto"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Por favor, introduce un telefono valido"
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="address"
                type="text"
                label={t("DIRECCION")}
                validators={[VALIDATOR_REQUIRE]}
                errorText="Por favor, introduce una dirección"
                onInput={inputHandler}
              />
              <div className="authenticate-sub">
                <Input
                element="input"
                id="province"
                type="text"
                label={t("PROVINCIA")}
                validators={[VALIDATOR_REQUIRE]}
                errorText="Por favor, introduce una provincia"
                onInput={inputHandler}
              />
                <Input
                element="input"
                id="locality"
                type="text"
                label={t("LOCALIDAD")}
                validators={[VALIDATOR_REQUIRE]}
                errorText="Por favor, introduce una localidad"
                onInput={inputHandler}
              />
                <Input
                element="input"
                id={t("CODIGO_POSTAL")}
                type="text"
                label="Codigo postal"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Por favor, introduce un codigo postal"
                onInput={inputHandler}
              />
              </div>
            </React.Fragment>
          )}
          {!isLoginMode && (
            <ImageUpload center id="image" onInput={inputHandler} />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid Email"
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label={t("PASSWORD")}
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters ."
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <Input
              id="password2"
              element="input"
              type="password"
              label={t("CONFIRMACION_CONTRAS")}
              validators={[VALIDATOR_PASS(formState.inputs.password.value)]}
              errorText="La contraseña introducida no coincide en los dos campos ."
              onInput={inputHandler}
            />
          )}

          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? t("INICIAR") : t("REGISTRASE") }
          </Button>
        </form>
        {!props.close && (
          <Button inverse onClick={switchModeHandler}>
            {isLoginMode ? t("INICIAR_SESS") : t("REGISTRAR_CUENTA")}
          </Button>
        )}
      </Card>
    </div>
  );
};

export default Authenticate;
