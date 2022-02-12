import React from "react";
import Button from "../../shared/components/FormElements/Button";
import "./ShopPageProducts.css";

const ShopPageProducts = (props) => {
  return (
    <div className="ps-item">
      <div className="property-card">
        <a href="#">
          <div className="property-image">
            <img
              src={`${process.env.REACT_APP_BACKEND_IMG}/${props.img}`}
            ></img>
            <div className="property-image-title">
              {/*   <h5>Card Title</h5>  */}
            </div>
          </div>
        </a>
        <div className="property-description">
          <h5> {props.name} </h5>
          <p>{props.description}</p>
         {/*  <div className="property-social-icons">
            <i className="fa-solid fa-basket-shopping fa-2x"></i>
          </div> */}
        </div>
        <a href="#">
          <div className="property-social-icons">
           <Button dClassname="ps-button" onClick={()=>props.selectSizes(props.id, props.sizes)}> <i className="fa-solid fa-basket-shopping fa-2x"></i></Button>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ShopPageProducts;
/* <div className="pProducto">
      <img src={`${process.env.REACT_APP_BACKEND_IMG}/${props.img}`}></img>
      <h1>{props.name}</h1>
      <div className="buttones"></div>
  </div>; */
