import React, { useEffect, useState /* useContext */ } from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Form.css";

const UpdateProductStats = (props) => {
  // const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedProduct, setLoadedProduct] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      price: {
        value: "",
        isValid: false,
      },
      stock: {
        value: "",
        isValid: false,
      },
      discount: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/product/${props.product}`
        );
        setLoadedProduct(responseData.product);
        setFormData(
          {
            price: {
              value: responseData.product.stats
                ? responseData.product.stats.price
                : 0,
              isValid: false,
            },
            stock: {
              value: responseData.product.stats
                ? responseData.product.stats.stock
                : 0,
              isValid: false,
            },
            discount: {
              value: responseData.product.stats
                ? responseData.product.stats.discount
                : 0,
              isValid: false,
            },
          },
          true
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [sendRequest, props.product, setFormData]);

  const productUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    let stats = {
      price: parseFloat(formState.inputs.price.value),
      stock: parseFloat(formState.inputs.stock.value),
      discount: parseFloat(formState.inputs.discount.value),
    };
    console.log("ar meno entra");
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/product/stats/${props.product}`,
        "PATCH",
        JSON.stringify({
          stats,
        }),
        {"Content-Type": "application/json" ,
          Authorization: "Bearer " + props.token,
        }
      );
      console.log(stats);
    } catch (err) {}
   props.close();
  };

  if (!loadedProduct && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find Product!</h2>
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
      {!isLoading && loadedProduct && (
        <form className="style-formUP" onSubmit={productUpdateSubmitHandler}>
          <Input
            id="price"
            element="input"
            type="number"
            label="Precio"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduce un nombre válido."
            onInput={inputHandler}
            initialValue={loadedProduct.stats ? loadedProduct.stats.price : 0}
            initialValid={true}
          />
          <Input
            id="stock"
            element="input"
            type="number"
            label="Existencias"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduzca una descripción valida."
            onInput={inputHandler}
            initialValue={loadedProduct.stats ? loadedProduct.stats.stock : 0}
            initialValid={true}
          />
          <Input
            id="discount"
            element="input"
            type="number"
            label="Descuento (porcentaje)"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduce un codigo postal válido."
            onInput={inputHandler}
            initialValue={
              loadedProduct.stats ? loadedProduct.stats.discount : 0
            }
            initialValid={true}
          />
          <Button type="submit" dClassName="modal-button-ok" disabled={!formState.isValid}>
            Actualizar
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateProductStats;
