import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import Currencyformat from "../Currencyfomat/Currencyformat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function ProductCard({
  product,
  flex = false,
  renderDesc = false,
  renderAdd = true,
}) {
  const [state, dispatch] = useContext(DataContext);
  if (!product) return null;

  const {
    image,
    title,
    price,
    description,
    id,

    rating = { rate: 0, count: 0 },
  } = product;

  const { rate = 0, count = 0 } = rating;

  //   console.log(state);
  const addTocart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: product,
    });
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      {/* Image */}
      {flex ? (
        <img src={image} alt={title} className={classes.detail_img} />
      ) : (
        <Link to={`/product/${id}`}>
          <img src={image} alt={title} />
        </Link>
      )}

      <div className={classes.card_details}>
        <h3>{title}</h3>
        {/* Show description only on detail page */}
        {renderDesc && <p className={classes.description}>{description}</p>}
        <div className={classes.rating}>
          <Rating value={rate} precision={0.1} readOnly />
          <small>({count})</small>
        </div>

        <div className={classes.price}>
          <Currencyformat amount={price} />
        </div>

        {renderAdd && (
          <button className={classes.button} onClick={addTocart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
