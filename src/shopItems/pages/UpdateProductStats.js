import React, { useEffect, useState /* useContext */ } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Chip from "@mui/material/Chip";
import { Autocomplete, Input as InputM, TextField } from "@mui/material";
import "./Form.css";
import { ListItem } from "@mui/material";

const UpdateProductStats = (props) => {
  // const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedProduct, setLoadedProduct] = useState();
  const [size, setSize] = useState();
  const [chipFormats, setChipFormats] = useState([]);
  const [format, setFormat] = useState({ label: "Gramos", value: "gr" });
  const formats = [
    { label: "Gramos", value: "gr" },
    { label: "Unidad", value: "u" },
    { label: "Docena", value: "doc" },
  ];

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
        isValid: true,
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
              isValid: true,
            },
            stock: {
              value: responseData.product.stats
                ? responseData.product.stats.stock
                : 0,
              isValid: true,
            },
            discount: {
              value: responseData.product.stats
                ? responseData.product.stats.discount
                : 0,
              isValid: true,
            },
          },
          true
        );
        setChipFormats(responseData.product.stats.size);
        setFormat({ label: " ", value: responseData.product.stats.format });
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
      size: chipFormats.sort((a, b) => a.value - b.value),
      format: format.value,
    };
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/product/stats/${props.product}`,
        "PATCH",
        JSON.stringify({
          stats,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        }
      );
      console.log(format.value);
    } catch (err) {}
    props.close();
  };

  const handleDelete = (chipToDelete) => () => {
    setChipFormats((chips) =>
      chips.filter((chip) => chip.value !== chipToDelete.value)
    );
  };

  const setSiz = (event) => {
    setSize(event.target.value);
  };

  const handleAdd = () => {
    if (size && size > 0) {
      setChipFormats([...chipFormats, { value: Number(size) }]);
    }
  };

  const autoComplet = async (event, value) => {
    event.defaultMuiPrevented = true;
    setFormat(value);
    console.log(format);
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
        <form className="style-formUP">
          <Input
            id="price"
            element="input"
            type="number"
            label="Precio (según formato)"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduce un precio válido."
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
          <p>Formato</p>
          <Autocomplete
            id="format"
            options={formats}
            getOptionLabel={(option) => option.label}
            defaultValue={
              formats[
                formats.findIndex(
                  (format) => format.value === loadedProduct.stats.format
                )
              ]
            }
            sx={{ width: 300 }}
            onChange={autoComplet}
            renderInput={(params) => <TextField {...params} label="" />}
            isOptionEqualToValue={(option) => option.value}
          />
          <div className="chip">
            <InputM
              fullWidth
              label="Formato"
              id="fullWidth"
              type="number"
              className="chipInput"
              inputProps={{ style: { fontSize: 15 } }} // font size of input text
              inputlabelprops={{ style: { fontSize: 15 } }}
              placeholder="En numero, Ej: 1 (pieza), 100(gramos) "
              onInput={setSiz}
            />
            <Button type="button" onClick={handleAdd}>
              <i className="fas fa-plus"></i>
            </Button>
          </div>
          <div className="up-chip">
            {chipFormats.map((data) => {
              return (
                <ListItem>
                  <Chip
                    label={data.value + " " + format.value}
                    onDelete={
                      data.label === "React" ? undefined : handleDelete(data)
                    }
                  />
                </ListItem>
              );
            })}
          </div>
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
          <Button
            type="submit"
            dClassName="modal-button-ok"
            disabled={!formState.isValid}
            onClick={productUpdateSubmitHandler}
          >
            Actualizar
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateProductStats;
