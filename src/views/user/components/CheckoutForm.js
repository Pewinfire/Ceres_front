import React, { useState } from "react";
import "./CheckoutForm.css";
import { useTranslation } from "react-i18next";
import Button from "../../../shared/components/FormElements/Button";
import AddNewDirection from "./AddNewDirection";
import {
  Checkbox,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import "./CheckoutForm.css";

const CheckoutForm = (props) => {
  const [newDirection, setNewDirection] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { t } = useTranslation();
  const showStatusWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const payTypeHandler = (event) => {
    props.setOptions({ ...props.options, payType: event.target.value });
  };
  return (
    <div>
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
            <h2 className="nombre">{props.user.name}</h2>
            <h3>{newDirection.address.address}</h3>
            <h3>
              {newDirection.address.province} {newDirection.address.locality}
            </h3>
            <h3>{newDirection.address.postalCode}</h3>{" "}
          </div>
        )}
        {!newDirection && (
          <div className="direction">
            <h2 className="nombre">{props.user.name}</h2>
            <h3>{props.user.address.address}</h3>
            <h3>
              {props.user.address.province} {props.user.address.locality}
            </h3>
            <h3>{props.user.address.postalCode}</h3>{" "}
          </div>
        )}

        <div className="add-direction">
          <h3>{t("NUEVA_DIRECC_FACTURA")}</h3>
          <Button
            onClick={() => {
              showStatusWarningHandler(true);
            }}
          >
            <i className="fas fa-plus"></i>
          </Button>
        </div>
        <div className="pay-method">
          <h3>{t("METODO_PAGO")}</h3>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            onChange={payTypeHandler}
          >
            <FormControlLabel
              value="paypal"
              control={<Radio value="paypal" />}
              label="Paypal"
            />
            <FormControlLabel
              value="card"
              control={<Radio value="card" />}
              label={t("TARJETA_CREDITO")}
            />
            <FormControlLabel
              value="shopR"
              control={<Radio value="shopR" />}
              label={t("PAGO_TIENDA")}
            />
          </RadioGroup>
        </div>
        <div className="terms">
          <FormControlLabel
            enabled
            control={
              <Checkbox
                onChange={() =>
                  props.setOptions({
                    ...props.options,
                    agreement: props.options.agreement ? false : true,
                  })
                }
              />
            }
            label={t("ACEPTO_TERMINOS")}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
