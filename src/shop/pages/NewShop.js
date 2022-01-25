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

//import { AuthContext } from "../../shared/context/auth-context";

import "./Form.css";
import { Autocomplete, TextField } from "@mui/material";

const NewShop = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [markets, setMarkets] = useState();
  const [market, setMarket] = useState();
  const [owners, setOwners] = useState();
  const [owner, setOwner] = useState();
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
          item.id = market.id;
          item.label = market.name;
          item.field = "marketo";
          return item;
        });
        setMarkets(lista);
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
          item.id = user.id;
          item.label = user.name;
          item.field = "owner";

          return item;
        });
        setOwners(lista);
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
    formData.append("marketo", market);
    formData.append("owner", owner);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/shop",
        "POST",
        formData
      );
      /*   await history.push(`/${market}/shops`); */
    } catch (err) {}
  };

  const autoComplet = async (event, value) => {
    event.defaultMuiPrevented = true;
    switch (value.field) {
      case "marketo":
        setMarket(value.id);
        break;
      case "owner":
        setOwner(value.id);
        break;
      default:
        break;
    }
    if (market && owner) {
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

        <div style={{ flex: "row" }}>
          <Autocomplete
            id="marketo"
            options={markets}
            getOptionLabel={(option) => option.label} // si en la segunda metes mas props'{ 1, 2} filtra por campos
            sx={{ width: 300 }}
            onChange={autoComplet}
            renderInput={(params) => <TextField {...params} label="Mercado" />}
            isOptionEqualToValue={(option) => option.id}
          />
          <Autocomplete
            id="owner"
            options={owners}
            getOptionLabel={(option) => option.label} // si en la segunda metes mas props'{ 1, 2} filtra por campos
            sx={{ width: 300 }}
            onChange={autoComplet}
            renderInput={(params) => (
              <TextField {...params} label="Propietario" />
            )}
            isOptionEqualToValue={(option) => option.id}
          />
        </div>
        <ImageUpload center id="image" onInput={inputHandler} />
        <Button type="submit" disabled={!formState.isValid && isValid}>
          Añadir Tienda
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewShop;
