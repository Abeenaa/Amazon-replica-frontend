import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null); // ← start as null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <LayOut>
        <Loader />
      </LayOut>
    );
  }

  if (!product) {
    return (
      <LayOut>
        <div>Product not found</div>
      </LayOut>
    );
  }

  return (
    <LayOut>
      <ProductCard
        product={product}
        flex={true}
        renderDesc={true}
        renderAdd={true}
      />
    </LayOut>
  );
}

export default ProductDetail;
