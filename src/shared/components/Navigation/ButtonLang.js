import React, { useState, useEffect } from "react";
import i18next from "../../../i18n";
import Select from "react-select";
import "./ButtonLang.css";

const ButtonLang = () => {
  const options = [
    { value: "es", label: <img className="img-flag" src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/es.png`} /> },
    { value: "en", label: <img className="img-flag" src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/en.png`} /> },
    { value: "val", label: <img className="img-flag" src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/val.png`} /> },
  ];
  const [value, setValue] = useState(options.filter( option => { return option.value == i18next.resolvedLanguage}))

  const changeLanguage = () => {

    i18next.changeLanguage(value.value, (err, t) => {
      if (err) return console.log("something went wrong loading", err);
      t("key");
    });
  };
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "transparent",
      borderRadius: "1vw",
      borderColor: "transparent" ,
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: state.isFocused ? "#1a976e" : "#1a976e"
      }
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 0,
      background: "transparent",
      marginTop: 0
    }),
    menuList: (base) => ({
      ...base,
      background: "transparent",
      padding: 0
    }),
    option: (base, state) => ({
      ...base,
      color: "white",
      backgroundColor: state.isSelected ? "#1a976e" : "transparent",
    }),
  };

  useEffect(() => {
    value && changeLanguage()
  }, [value]);

  return (
    <>
      <Select options={options}  styles={customStyles} defaultValue={value} onChange={setValue} />
    </>
  );
};
{
  /* <img
src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/${option.value}.png`}
/> */
}
export default ButtonLang;
