import React, { useEffect, useState } from "react";
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

const UpdateShop = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedShop, setLoadedShop] = useState();

  const [formState, inputHandler, setFormData] = useForm(
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
      imageup: { value: false },
    },
    false
  );

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/shop/${props.shop}`
        );
        setLoadedShop(responseData.shop);
        setFormData(
          {
            name: {
              value: responseData.shop.name,
              isValid: false,
            },
            description: {
              value: responseData.shop.description,
              isValid: false,
            },
            location: {
              value: responseData.shop.location,
              isValid: false,
            },
            image: { value: responseData.shop.image, isValid: true },
            imageup: {
              value: false,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {

      }
    };
    fetchShop();
  }, [sendRequest, props.shop, setFormData]);

  const shopUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("location", formState.inputs.location.value);
      if (formState.inputs.image.value !== loadedShop.image) {
        formState.inputs.imageup.value = true;
        formData.append("image", formState.inputs.image.value);
        
      }

      formData.append("imageup", formState.inputs.imageup.value);

      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/shop/${props.shop}`,
        "PATCH",
        formData,
          {
            Authorization: "Bearer " + props.token,
          }
      );
      // history.push(`/Shops`);
    } catch (err) {

    }
    props.close()
  };

  if (!loadedShop && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find Shop!</h2>
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
      {!isLoading && loadedShop && (
        <div className="form-container">
        <form className="style-form" onSubmit={shopUpdateSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Nombre"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduce un nombre válido."
            onInput={inputHandler}
            initialValue={loadedShop.name}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Descripción"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Por favor, introduzca una descripción valida."
            onInput={inputHandler}
            initialValue={loadedShop.description}
            initialValid={true}
          />
          <Input
            id="location"
            element="input"
            type="text"
            label="Localización"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduce un codigo postal válido."
            onInput={inputHandler}
            initialValue={loadedShop.location}
            initialValid={true}
          />

          <ImageUpload
            center
            id="image"
            onInput={inputHandler}
            preview={`${process.env.REACT_APP_BACKEND_IMG}/${loadedShop.image}`}
          />
          <div className="right">
          <Button onClick={props.close}>Volver </Button>

            <Button type="submit" disabled={!formState.isValid}>
              UPDATE Shop
            </Button>
          </div>
        </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default UpdateShop;
