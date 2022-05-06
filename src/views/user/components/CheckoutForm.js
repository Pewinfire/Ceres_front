import React, { useState } from "react";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";

const CheckoutForm = () => {
  const [isPayment, setLoadedPayment] = useState(false);
  const pruebas = {
    data: { bankloqueseaId: "potato", campo1: 1, campor2: "asda" },
  };
  const pruebas2 = {
    data: { asdasdadId: "potato2", campo1: 1, campor2: "asda" },
  };
  var names = {
    1: /set/,
    2: /put/,
    3: /Remove/,
  }
  const filterId = (obj) => {
    const filtered = Object.keys(obj)
      .filter((key) => /Id$/.test(key))
      .reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
      }, {});
    return Object.values(filtered).toString()
  };

  const actionId = (obj, buscar) => {
    const filtered =  Object.keys(obj).find(key => obj[key].test(buscar));
    return filtered
  };



  console.log( actionId(names, "putBancoProhibido"))
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  


  // console.log(Object.values(names).filter((name) => name.test("setBancoProhibido")))
  
  const prueba = filterId(pruebas.data)


  const [formState, inputHandler] = useForm(
    {
      firstName: {
        value: "",
        isValid: false,
      },
      lastName: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
      province: {
        value: "",
        isValid: false,
      },
      postalCode: {
        value: "",
        isValid: false,
      },
    },
    false
  );

 
 

  return <div className="checkout--form">{data}</div>;
};

export default CheckoutForm;
