import React, { useEffect, useState } from "react";
import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";
import Card from "../../../shared/components/UIElements/Card";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import { VALIDATOR_REQUIRE } from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useTranslation } from "react-i18next";
import ImageUpload from "../../../shared/components/FormElements/ImageUpload";

import "../pages/Form.css";

const UpdateUser = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  const { t } = useTranslation();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: { value: "", isValid: false },
      lastname: { value: "", isValid: false },
      dni: { value: "", isValid: false },
      phone: { value: "", isValid: false },
      address: { value: "", isValid: false },
      locality: { value: "", isValid: false },
      postalCode: { value: "", isValid: false },
      province: { value: "", isValid: false },
      image: { value: null, isValid: false },
      imageup: { value: false },
    },
    false
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${props.user}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + props.token,
          }
        );
        setLoadedUser(responseData.user);
        setFormData(
          {
            name: {
              value: responseData.user.name,
              isValid: false,
            },
            lastname: {
              value: responseData.user.lastname,
              isValid: true,
            },
            dni: {
              value: responseData.user.dni,
              isValid: true,
            },
            phone: {
              value: responseData.user.phone,
              isValid: true,
            },
            address: {
              value: responseData.user.address.address,
              isValid: true,
            },
            locality: {
              value: responseData.user.address.locality,
              isValid: true,
            },
            postalCode: {
              value: responseData.user.address.postalCode,
              isValid: true,
            },
            province: {
              value: responseData.user.address.province,
              isValid: true,
            },
            image: { value: responseData.user.image, isValid: true },
            imageup: {
              value: false,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {

      }
    };
    fetchUser();
  }, [sendRequest, props.user, setFormData, props.token]);

  const userUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("lastname", formState.inputs.lastname.value);
      formData.append("dni", formState.inputs.dni.value);
      formData.append("phone", formState.inputs.phone.value);
      formData.append("address",formState.inputs.address.value);
      formData.append("province",formState.inputs.province.value);
      formData.append("locality",formState.inputs.locality.value);
      formData.append("postalCode",formState.inputs.postalCode.value);
      
      if (formState.inputs.image.value !== loadedUser.image) {
        formState.inputs.imageup.value = true;
        formData.append("image", formState.inputs.image.value);
        setLoadedUser(null);
      }

      formData.append("imageup", formState.inputs.imageup.value);

      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${props.user}`,
        "PATCH",
        formData,
        {
          Authorization: "Bearer " + props.token,
        }
      );
    } catch (err) {

    }
    props.updateFetch();
    props.close();
  };

  if (!loadedUser && !error && !isLoading) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find User!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUser && (
        <div className="form-container">
          <form className="style-form" onSubmit={userUpdateSubmitHandler}>
            <Input
              element="input"
              id="name"
              type="text"
              label={t("NOMBRE")}
              validators={[VALIDATOR_REQUIRE]}
              errorText="Por favor, introduce un nombre"
              onInput={inputHandler}
              initialValue={loadedUser.name}
              initialValid={true}
            />
            <Input
              element="input"
              id="lastname"
              type="text"
              label={t("APELLIDO")}
              validators={[VALIDATOR_REQUIRE]}
              errorText="Por favor, introduce un apellido"
              onInput={inputHandler}
              initialValue={loadedUser.lastname}
              initialValid={true}
            />
            <Input
              element="input"
              id="dni"
              type="text"
              label={t("NIF")}
              validators={[VALIDATOR_REQUIRE]}
              errorText="Por favor, introduce un DNI o NIE  valido"
              onInput={inputHandler}
              initialValue={loadedUser.dni}
              initialValid={true}
            />
            <Input
              element="input"
              id="phone"
              type="text"
              label={t("TELEFONO_CONTACTO")}
              validators={[VALIDATOR_REQUIRE]}
              errorText="Por favor, introduce un telefono valido"
              onInput={inputHandler}
              initialValue={loadedUser.phone}
              initialValid={true}
            />
            <Input
              element="input"
              id="address"
              type="text"
              label={t("DIRECCION")}
              validators={[VALIDATOR_REQUIRE]}
              errorText="Por favor, introduce una direcci??n"
              onInput={inputHandler}
              initialValue={loadedUser.address.address}
              initialValid={true}
            />
            <Input
              element="input"
              id="locality"
              type="text"
              label={t("LOCALIDAD")}
              validators={[VALIDATOR_REQUIRE]}
              errorText="Por favor, introduce una localidad"
              onInput={inputHandler}
              initialValue={loadedUser.address.lastname}
              initialValid={true}
            />
            <Input
              element="input"
              id="province"
              type="text"
              label={t("PROVINCIA")}
              validators={[VALIDATOR_REQUIRE]}
              errorText="Por favor, introduce una provincia "
              onInput={inputHandler}
              initialValue={loadedUser.address.province}
              initialValid={true}
            />
            <Input
              element="input"
              id="postalCode"
              type="text"
              label={t("CODIGO_POSTAL")}
              validators={[VALIDATOR_REQUIRE]}
              errorText="Por favor, introduce un codigo postal"
              onInput={inputHandler}
              initialValue={loadedUser.address.postalCode}
              initialValid={true}
            />
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              preview={`${process.env.REACT_APP_BACKEND_IMG}/${loadedUser.image}`}
            />
            <div className="right">
              <Button onClick={props.close}>{t("VOLVER")} </Button>

              <Button type="submit" disabled={!formState.isValid}>
              {t("ACTUALIZAR")}
              </Button>
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default UpdateUser;
