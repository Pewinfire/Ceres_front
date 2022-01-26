import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import { AuthContext } from "../../shared/context/auth-context";
import "./Form.css";

const UpdateUser = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  const userId = useParams().userId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: { value: "", isValid: false },
      lastname: { value: "", isValid: false },
      dni: { value: "", isValid: false },
      phone: { value: "", isValid: false },
      address: { value: "", isValid: false },
      oldpassword: { value: "", isValid: false },
      password: { value: "", isValid: false },
      image: { value: null, isValid: false },
      imageup: { value: false },
    },
    false
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
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
              isValid: false,
            },
            dni: {
              value: responseData.user.dni,
              isValid: false,
            },
            phone: {
              value: responseData.user.phone,
              isValid: false,
            },
            address: {
              value: responseData.user.address,
              isValid: false,
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
        console.log(err);
      }
    };
    fetchUser();
  }, [sendRequest, userId, setFormData]);

  const userUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("lastname", formState.inputs.lastname.value);
      formData.append("oldpassword", formState.inputs.password.value);
      formData.append("password", formState.inputs.password.value);
      formData.append("dni", formState.inputs.dni.value);
      formData.append("phone", formState.inputs.phone.value);
      formData.append("address", formState.inputs.phone.value);
      if (formState.inputs.image.value !== loadedUser.image) {
        formState.inputs.imageup.value = true;
        formData.append("image", formState.inputs.image.value);
        setLoadedUser(null);
      }

      formData.append("imageup", formState.inputs.imageup.value);

      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
        "PATCH",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {
      console.log(err);
    }
    await history.push(`/`);
  };

  if (!loadedUser && !error) {
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
        <form className="style-form" onSubmit={userUpdateSubmitHandler}>
          <Input
            element="input"
            id="name"
            type="text"
            label="Nombre"
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
            label="Apellido"
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
            label="NIF"
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
            label="Telefono de contacto"
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
            label="Dirección"
            validators={[VALIDATOR_REQUIRE]}
            errorText="Por favor, introduce una dirección"
            onInput={inputHandler}
            initialValue={loadedUser.address}
            initialValid={true}
          />
          <Input
            id="oldpassword"
            element="input"
            type="oldpassword"
            label="Password antiguo"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="La contraseña introducida debe tener mas de 6 caracteres ."
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Contraseña nueva"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="La contraseña introducida debe tener mas de 6 caracteres ."
            onInput={inputHandler}
          />
          <ImageUpload
            center
            id="image"
            onInput={inputHandler}
            preview={`${process.env.REACT_APP_BACKEND_IMG}/${loadedUser.image}`}
          />

          <Button type="submit" disabled={!formState.isValid}>
            UPDATE User
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateUser;
