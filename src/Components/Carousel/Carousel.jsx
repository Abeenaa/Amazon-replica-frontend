import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "../../Components/Carousel/Carousel.module.css";
function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((ImageItemLink) => {
          return <img src={ImageItemLink} alt="" />;
        })}
      </Carousel>
      <div className={classes.hero__img}></div>
    </div>
  );
}
export default CarouselEffect;
