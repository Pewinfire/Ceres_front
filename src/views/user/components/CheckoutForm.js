import React, { useState } from "react";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import "./CheckoutForm.css";
import Button from "../../../shared/components/FormElements/Button";
import AddNewDirection from "./AddNewDirection";
import { Checkbox, FormControlLabel, Modal, Radio, RadioGroup } from "@mui/material";
import "./CheckoutForm.css";
const CheckoutForm = (props) => {
  const [newDirection, setNewDirection] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isPayment, setLoadedPayment] = useState(false);
  const showStatusWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <div className=".checkout--modal">
        <Modal open={showConfirmModal} onClose={cancelDeleteHandler}>
          <AddNewDirection
            token={props.token}
            userId={props.userId}
            setNewDirection={setNewDirection}
            close={setShowConfirmModal}
            update={props.update}
          />
        </Modal>
      </div>
      <div className="checkout--form">
        {newDirection && (
          <div className="direction">
            <h2 classname="nombre">{props.user.name}</h2>
            <h3>{newDirection.address.address}</h3>
            <h3>
              {newDirection.address.province} {newDirection.address.locality}
            </h3>
            <h3>{newDirection.address.postalCode}</h3>{" "}
          </div>
        )}
        {!newDirection && (
          <div className="direction">
            <h2 classname="nombre">{props.user.name}</h2>
            <h3>{props.user.address.address}</h3>
            <h3>
              {props.user.address.province} {props.user.address.locality}
            </h3>
            <h3>{props.user.address.locality}</h3>{" "}
          </div>
        )}

        <div className="add-direction">
          <h3>Añadir nueva dirección de facturación</h3>
          <Button
            onClick={() => {
              showStatusWarningHandler(true);
            }}
          >
            <i class="fas fa-plus"></i>
          </Button>
        </div>
        <div className="pay-method">
          <h3>Metodo de Pago</h3>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
          >
            <FormControlLabel
              value="paypal"
              control={<Radio />}
              label="Paypal"
            />
            <FormControlLabel
              value="card"
              control={<Radio />}
              label="Tarjeta de crédito"
            />
            <FormControlLabel
              value="shopR"
              control={<Radio />}
              label="Pago en tienda"
            />
          </RadioGroup>
        </div>
        <div className="terms">
          <FormControlLabel
            enabled
            control={<Checkbox />}
            label="Acepto los terminos de uso y la política de privacidad"
          />
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
