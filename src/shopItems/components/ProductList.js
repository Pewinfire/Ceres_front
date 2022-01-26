import React from "react";
import "./ProductList.css"
const ProductList = () => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2> No Shops Found</h2>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <ul className="shop-list">
        {props.items.map((product) => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              description={product.description}
              categories={product.categories}
              stats={product.stats}
              shop={product.owner}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;
