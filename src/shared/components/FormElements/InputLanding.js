import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import "./InputLanding.css";

export default class InputLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    this.setState({ address });
  };

  render() {
    return (
      <div>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          searchOptions={{
            componentRestrictions: { country: ["es"] },
          }}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
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
              <NavLink to={`/markets/near/${this.state.address}`}>
                <Button
                  dClassName="botton"
                  type="submit"
                  disabled={!this.state.address}
                >
                  Buscar
                </Button>
              </NavLink>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
}
