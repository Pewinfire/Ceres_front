import React from "react";
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

import "./Form.css";

const NewMarket = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      postalCode: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: { value: null, isValid: false },
    },
    false
  );

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("postalCode", formState.inputs.postalCode.value);
    formData.append("address", formState.inputs.address.value);
    formData.append("image", formState.inputs.image.value);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/market",
        "POST",
        formData,
        {
          Authorization: "Bearer " + props.token,
        }
      );
    } catch (err) {
      console.log(err);
    }
    props.close();
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="form-container">
        <form className="style-form" onSubmit={placeSubmitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <Input
            id="name"
            element="input"
            type="text"
            label="Nombre del Mercado"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Title"
            onInput={inputHandler}
          />
          <Input
            id="postalCode"
            element="input"
            type="text"
            label="Codigo Postal"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Por favor, introduce un codigo postal valido (at least 5 characters)."
            onInput={inputHandler}
          />
          <Input
            id="address"
            element="input"
            label="Dirección"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid address."
            onInput={inputHandler}
          />
          <ImageUpload center id="image" onInput={inputHandler} />
          <div className="right">
              <Button onClick={props.close}>Volver </Button>

              <Button type="submit" disabled={!formState.isValid}>
                Añadir mercado
              </Button>
            </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default NewMarket;
