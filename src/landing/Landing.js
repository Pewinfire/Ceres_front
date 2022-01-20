import React from "react";
import { useHistory } from "react-router-dom";

import Input from "../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";
import Button from "../shared/components/FormElements/Button";
import "./Landing.css";

const Landing = () => {
  const history = useHistory();

  const [formState, inputHandler] = useForm(
    {
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const searchSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await history.push(`/markets/near/${formState.inputs.address.value}`);
      
    } catch (error) {}

    
  };
/*   event.preventDefault();
  try {
    await sendRequest(
      `http://localhost:5000/api/market/near/${formState.inputs.address.value}`
    );
    
  } catch (err) {}
}; */

  return (
    <div className="videoWrapper">
      <div className="pattern">
      <video
        autoPlay
        loop
        muted
        src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/Background.mp4`}
      ></video>
      </div>
      <div className="contenido-del-video">
        <form className="place-form" onSubmit={searchSubmitHandler}>
          <Input
            id="address"
            element="input"
            label="Address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid address."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Buscar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Landing;
