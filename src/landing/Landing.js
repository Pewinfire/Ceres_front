import React, {useState} from "react";
import { useHistory } from "react-router-dom";

import Input from "../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";
import Button from "../shared/components/FormElements/Button";
import "./Landing.css";

const Landing = () => {
  const history = useHistory();
  const [img, setImg]= useState(Math.floor(Math.random() * (3 - 1 + 1)) + 1)
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


  return (
    <div className="videoWrapper">
      <div className="pattern"> </div>
        <video
          autoPlay
          loop
          muted
          src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/Background${img}.mp4`}
        ></video>
     
      <div className="contenido-del-video">
        <form className="place-form" onSubmit={searchSubmitHandler}>
          
          
          <Input
            id="address"
            element="input"
            validators={[VALIDATOR_REQUIRE()]}
            placeholder="Introduce una dirección"
            onInput={inputHandler}
            className={"inputo"}
            dClassName={"envoltorio"}
          />
              <Button
                dClassName="botton"
                type="submit"
                disabled={!formState.isValid}
              >
                Buscar
              </Button>
        </form>
      </div>
    </div>
  );
};

export default Landing;
