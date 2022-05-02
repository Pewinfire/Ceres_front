import React from 'react'
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";

const CheckoutForm = () => {


  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      type: {
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


  return (
    <div className='checkout--form'>CheckoutForm</div>
  )
}

export default CheckoutForm