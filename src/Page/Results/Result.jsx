import React, { useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import { useEffect } from "react";
import classes from "./Result.module.css";
import ProductCard from "../../Components/Product/ProductCard";
function Result() {
  const [result, setResult] = useState([]);
  const { categoryName } = useParams();
  useEffect(() => {
    axios.get(`${productUrl}/category/${categoryName}`).then((res) => {
      setResult(res.data);
    });
  });

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
        <div className={classes.product_container}>
          {result.map((products) => {
            return <ProductCard key={products.id} product={products} />;
          })}
        </div>
      </section>
    </LayOut>
  );
}

export default Result;
