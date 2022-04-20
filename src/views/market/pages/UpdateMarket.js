import React, { useEffect, useState /* useContext */ } from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";
import Card from "../../../shared/components/UIElements/Card";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ImageUpload from "../../../shared/components/FormElements/ImageUpload";
// import { AuthContext } from '../../shared/context/auth-context';
import "./Form.css";

const UpdateMarket = () => {
  // const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedMarket, setLoadedMarket] = useState();
  const marketId = useParams().marketId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
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
      image: {
        value: null,
        isValid: false,
      },
      imageup: {
        value: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/market/${marketId}`
        );
        setLoadedMarket(responseData.market);
        setFormData(
          {
            name: {
              value: responseData.market.name,
              isValid: false,
            },
            postalCode: {
              value: responseData.market.postalCode,
              isValid: false,
            },
            address: {
              value: responseData.market.address,
              isValid: false,
            },
            image: {
              value: responseData.market.image,
              isValid: true,
            },
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
    fetchMarket();
  }, [sendRequest, marketId, setFormData]);

  const marketUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(loadedMarket.image)
    console.log(formState.inputs.imageup.value)
    try {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("postalCode", formState.inputs.postalCode.value);
      formData.append("address", formState.inputs.address.value);
      if (formState.inputs.image.value !== loadedMarket.image) {
        formState.inputs.imageup.value = true;
        formData.append("image", formState.inputs.image.value);
        setLoadedMarket(null);
      }
      formData.append("imageup", formState.inputs.imageup.value);

      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/market/${marketId}`,
        "PATCH",
        formData
        /*  {
          Authorization: "Bearer " + auth.token,
        } */
      );
     // history.push(`/markets`);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedMarket && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find market!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedMarket && (
        <form className="style-form" onSubmit={marketUpdateSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Nombre"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduce un nombre válido."
            onInput={inputHandler}
            initialValue={loadedMarket.name}
            initialValid={true}
          />
          <Input
            id="postalCode"
            element="input"
            type="text"
            label="Codigo Postal"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Por favor, introduce un codigo postal válido."
            onInput={inputHandler}
            initialValue={loadedMarket.postalCode}
            initialValid={true}
          />
          <Input
            id="address"
            element="input"
            type="text"
            label="Dirección"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduce un codigo postal válido."
            onInput={inputHandler}
            initialValue={loadedMarket.address}
            initialValid={true}
          />
          <ImageUpload
            center
            id="image"
            onInput={inputHandler}
            preview={`${process.env.REACT_APP_BACKEND_IMG}/${loadedMarket.image}`}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE Market
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateMarket;
