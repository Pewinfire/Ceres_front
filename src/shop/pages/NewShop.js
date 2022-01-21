import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Select from "react-select";
//import { AuthContext } from "../../shared/context/auth-context";

import "./Form.css";

const NewShop = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [options1, setOptions1] = useState();
  const [options2, setOptions2] = useState();
  const [select1, setSelect1] = useState();
  const [select2, setSelect2] = useState();
  const [isValid, setIsValid] = useState(false);

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      location: {
        value: "",
        isValid: false,
      },
      image: { value: null, isValid: false },
    },
    false
  );

  const history = useHistory(); //para volver a la pagina anterior

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/market`
        );

        let lista = responseData.markets.map((market) => {
          let item = {};
          item.value = market.id;
          item.label = market.name;
          item.id = "marketo";
          return item;
        });
        setOptions1(lista);
      } catch (err) {}
    };
    fetchMarkets();
  }, [sendRequest]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );

        let lista = responseData.users.map((user) => {
          let item = {};
          item.value = user.id;
          item.label = user.name;
          item.id = "owner";

          return item;
        });
        setOptions2(lista);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("location", formState.inputs.location.value);
    formData.append("image", formState.inputs.image.value);
    formData.append("marketo", select1);
    formData.append("owner", select2);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/shop",
        "POST",
        formData
      );
      await history.push(`/${select1}/shops`);
    } catch (err) {}
  };

  const selectHandler = async (e) => {
    switch (e.id) {
      case "marketo":
        setSelect1(e.value);
        break;
      case "owner":
        setSelect2(e.value);
        break;
      default:
        break;

       
    }
    if (select1 && select2) {
      setIsValid(true);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="style-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          label="Nombre del Puesto"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Title"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textArea"
          type="text"
          label="Descripción"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Por favor, introduce un codigo postal valido (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="location"
          element="input"
          label="Localización"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />

        <Select onChange={selectHandler} label="Mercado" options={options1} />
        <Select
          onChange={selectHandler}
          label="Propietario"
          options={options2}
        />
        <ImageUpload center id="image" onInput={inputHandler} />
        <Button type="submit" disabled={!formState.isValid && isValid}>
          Añadir Tienda
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewShop;
