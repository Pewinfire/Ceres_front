import React from "react";
import "./ShopPageProducts.css";

const ShopPageProducts = (props) => {
  return (
    <div className="ps-item">
      <div class="property-card">
        <a href="#">
          <div class="property-image">
            <img
              src={`${process.env.REACT_APP_BACKEND_IMG}/${props.img}`}
            ></img>
            <div class="property-image-title">
              {/*   <h5>Card Title</h5>  */}
            </div>
          </div>
        </a>
        <div class="property-description">
          <h5> {props.name} </h5>
          <p>{props.description}</p>
         {/*  <div class="property-social-icons">
            <i class="fa-solid fa-basket-shopping fa-2x"></i>
          </div> */}
        </div>
        <a href="#">
          <div class="property-social-icons">
            <i class="fa-solid fa-basket-shopping fa-2x"></i>
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
