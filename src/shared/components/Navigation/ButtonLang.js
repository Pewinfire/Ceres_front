import React from "react";

const ButtonLang = (props) => {
  return (
    <>
      <button onClick={() => props.changeLanguage("es")}>de</button>
      <button onClick={() => props.changeLanguage("en")}>en</button>
    </>
  );
};

export default ButtonLang;
