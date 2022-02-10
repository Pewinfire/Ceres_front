import React from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "../pages/Form.css";

const CustomerService = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      subject: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const helpSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="form-container">
      <form className="style-form" onSubmit={helpSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="subject"
          element="input"
          type="text"
          label="Asunto"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Title"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textArea"
          type="text"
          label="Descripción"
          validators={[VALIDATOR_MINLENGTH(10)]}
          errorText="Por favor, introduce una descripción mas detallada (at least 10 characters)."
          onInput={inputHandler}
        />

        <div className="right">
          <Button onClick={props.close("general")}>Volver </Button>

          <Button
            type="submit"
            disabled={!formState.isValid}
            onClick={props.close("general")}
          >
            Actualizar
          </Button>
        </div>
      </form>
      </div>
    </React.Fragment>
  );
};

export default CustomerService;
