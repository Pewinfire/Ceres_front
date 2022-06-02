import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useState, useEffect } from "react";
import Button from "../../../shared/components/FormElements/Button";
import Input from "../../../shared/components/FormElements/Input";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { VALIDATOR_REQUIRE } from "../../../shared/util/validators";

const AddNewDirection = (props) => {
  const [userAddress, setUserAdress] = useState();
  const [updateAddress, setUpdateAddress] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      address: { value: "", isValid: false },
      locality: { value: "", isValid: false },
      postalCode: { value: "", isValid: false },
      province: { value: "", isValid: false },
    },
    false
  );

  const handleCheck = (event) => {
    setUpdateAddress(event.target.checked);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${props.userId}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + props.token,
          }
        );
        setUserAdress(responseData.user.address);
        setFormData(
          {
            address: {
              value: responseData.user.address.address,
              isValid: true,
            },
            locality: {
              value: responseData.user.address.locality,
              isValid: true,
            },

            postalCode: {
              value: responseData.user.address.postalCode,
              isValid: true,
            },
            province: {
              value: responseData.user.address.province,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [sendRequest, props.userId, setFormData, props.token]);

  const userUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/address/${props.userId}`,
        "PATCH",
        JSON.stringify({
          address: formState.inputs.address.value,
          province: formState.inputs.province.value,
          locality: formState.inputs.locality.value,
          postalCode: formState.inputs.postalCode.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        }
      );
    } catch (err) {
      console.log(err);
    }
    props.update();
    props.close(false);
  };

  const setDirectionToThisPurchase = () => {
    props.setNewDirection({
      address: {
        address: formState.inputs.address.value,
        province: formState.inputs.province.value,
        locality: formState.inputs.locality.value,
        postalCode: formState.inputs.postalCode.value,
      },
    },
    );
    props.close(false);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && userAddress && (
        <div className="form-container">
          <form
            className="style-form-addDirection"
            onSubmit={
              updateAddress
                ? setDirectionToThisPurchase 
                : userUpdateSubmitHandler
            }
          >
            <Input
              element="input"
              id="address"
              type="text"
              label="Dirección"
              validators={[VALIDATOR_REQUIRE]}
              errorText="Por favor, introduce una dirección"
              onInput={inputHandler}
              initialValue={userAddress.address}
              initialValid={true}
            />
            <Input
              element="input"
              id="locality"
              type="text"
              label="Localidad"
              validators={[VALIDATOR_REQUIRE]}
              errorText="Por favor, introduce una localidad"
              onInput={inputHandler}
              initialValue={userAddress.locality}
              initialValid={true}
            />
            <Input
              element="input"
              id="province"
              type="text"
              label="Provincia"
              validators={[VALIDATOR_REQUIRE]}
              errorText="Por favor, introduce una provincia "
              onInput={inputHandler}
              initialValue={userAddress.province}
              initialValid={true}
            />
            <Input
              element="input"
              id="postalCode"
              type="text"
              label="Codigo Postal"
              validators={[VALIDATOR_REQUIRE]}
              errorText="Por favor, introduce un codigo postal"
              onInput={inputHandler}
              initialValue={userAddress.postalCode}
              initialValid={true}
            />
            <FormControlLabel
              label="Usar solo en esta compra"
              control={
                <Checkbox
                  defaultChecked
                  color="success"
                  checked={updateAddress}
                  onChange={handleCheck}
                />
              }
            />
            <div className="right">
              <Button onClick={() => props.close(false)}>Volver </Button>
              <Button type="submit" disabled={!formState.isValid}>
                Actualizar
              </Button>
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default AddNewDirection;
