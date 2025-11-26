import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard.jsx";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader.jsx";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching products", err);
        setLoading(false);
      });
  }, []);

  // ← Add loading check so it doesn't crash
  if (products.length === 0) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <section className={classes.products_container}>
      {products.map((Singleproduct) => (
        <ProductCard
          key={Singleproduct.id}
          product={Singleproduct} // ← Fixed: use "product" not "products"
        />
      ))}
    </section>
  );
}

export default Product;
