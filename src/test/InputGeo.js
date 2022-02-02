import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import Button from "../shared/components/FormElements/Button";
import "./InputLanding.css";

const InputLanding = (props) => {
  const [address, setAddress] = useState("");
  const [valid, isValid] = useState("");

  
 const handleChange = (e) => {
    setAddress({ value });
  };

  const handleSelect = (e) => {
    setAddress({ value });
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
        searchOptions={{
          componentRestrictions: { country: ["es"] },
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="Inputo">
            <div className="envoltorio">
              <input
                {...getInputProps({
                  placeholder: "Buscar mercados...",
                  className: "location-search-input",
                })}
              />
            </div>
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                /*     const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose */
                const style = suggestion.active
                  ? {
                      padding: "0.4vw",
                      color: "black",
                      backgroundColor: "#1a976e",
                      cursor: "pointer",
                    }
                  : {
                      padding: "0.4vw",
                      color: "black",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                    };
                return (
                  <div
                    className="input-suggestion"
                    {...getSuggestionItemProps(suggestion, {
                      style,
                    })}
                    key={suggestion.placeId}
                  >
                    <i className="fas fa-map-marker-alt" aria-hidden="true">
                      {suggestion.description}
                    </i>
                  </div>
                );
              })}
            </div>
            <Button dClassName="botton" type="submit">
              Buscar
            </Button>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default InputLanding;
