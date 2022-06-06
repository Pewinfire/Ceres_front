import React, { useState, useEffect } from "react";
import Input from "../../../../shared/components/FormElements/Input";
import Button from "../../../../shared/components/FormElements/Button";
import ErrorModal from "../../../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../../shared/util/validators";
import { useForm } from "../../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../../shared/hooks/http-hook";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import "./Form.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(category, cats, theme) {
  return {
    fontWeight:
      cats.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const UpdateProduct = (props) => {
  const theme = useTheme();
  const [loadedProduct, setLoadedProduct] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isValid, setIsValid] = useState(false);
  const [categories, setCategories] = useState();
  const [cats, setCats] = useState([]);
  var cates= [];
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
      image: { value: null, isValid: false },
    },
    false
  );
  useEffect(() => {
  
    const fetchProduct = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/product/${props.product}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + props.token,
          }
        );
        setLoadedProduct(responseData.product);
        setFormData(
          {
            name: {
              value: responseData.product.name,
              isValid: false,
            },
            description: {
              value: responseData.product.description,
              isValid: true,
            },
            image: { value: responseData.product.image, isValid: true },
            imageup: {
              value: false,
              isValid: true,
            },
          },
          true
        );
        let lista = responseData.product.categories.map((category) => {
            let item = {};
            item.id = category.id;
            item.value = category.id;
            item.label = category.name;
  
            return item;
          });
          setCats(lista);
      } catch (err) {

      }
    };
    fetchProduct();
  
  }, [sendRequest, props.product, setFormData, props.token]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/category`
        );
        let lista = responseData.categories.map((category) => {
          let item = {};
          item.id = category.id;
          item.value = category.id;
          item.label = category.name;

          return item;
        });
        setCategories(lista);
      } catch (err) {}
    };
    fetchCategories();
  }, [sendRequest]);

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    let lista = cats.map((cat) => {
      return cat.id;
    });

    const formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("image", formState.inputs.image.value);
    formData.append("categories", JSON.stringify(lista));
    formData.append("shop", props.shop);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/product/${props.product}`,
        "PATCH",
        formData,
        {
          Authorization: "Bearer " + props.token,
        }
      );

    } catch (err) {}
    props.close()
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setCats(typeof value === "string" ? value.split(",") : value);

  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && categories && cats && loadedProduct &&  (
        <div className="form-container">
          <form className="style-form" onSubmit={placeSubmitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
            <Input
              id="name"
              element="input"
              type="text"
              label="Nombre del Producto"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid Title"
              initialValue={loadedProduct.name}
              onInput={inputHandler}
            />
            <Input
              id="description"
              element="textArea"
              type="text"
              label="Descripción"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Por favor, introduce un codigo postal valido (at least 5 characters)."
              initialValue={loadedProduct.description}
              onInput={inputHandler}
            />
            <InputLabel id="demo-multiple-chip-label">Categorias</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={cats}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value.id} label={value.label} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.id}
                  value={category}
                  label={category.label}
                  style={getStyles(category.label, cats, theme)}
                >
                  {category.label}
                </MenuItem>
              ))}
            </Select>

            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              preview={`${process.env.REACT_APP_BACKEND_IMG}/${loadedProduct.image}`}
            />
            <div className="right">
              <Button onClick={() => props.close()}>Volver </Button>

              <Button type="submit" disabled={!formState.isValid && isValid}>
                Añadir Producto
              </Button>
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default UpdateProduct;
