import React from "react";
import ReactStars from "react-rating-stars-component";
import { NavLink } from "react-router-dom";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 10 : 20,
  };
  return (
    <>
      <NavLink to={`/product/${product._id}`} className="minCart">
        <img src={product && product.images[0].url} alt="" />
        <p>{product && product.name}</p>
        <div>
          <ReactStars {...options} />
          <span>({product && product.NumOfReview} reviews)</span>
        </div>
        <span>TK-{product && product.price}</span>
      </NavLink>
    </>
  );
};

export default ProductCard;
