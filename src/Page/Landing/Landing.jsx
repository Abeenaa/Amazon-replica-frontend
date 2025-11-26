import React from "react";

import Catagory from "../../Components/Catagory/Catagory";
import Product from "../../Components/Product/Product";
import LayOut from "../../Components/LayOut/LayOut";
import CarouselEffect from "../../Components/Carousel/Carousel";
function Landing() {
  return (
    <LayOut>
      <CarouselEffect />
      <Catagory />
      <Product />
    </LayOut>
  );
}

export default Landing;
