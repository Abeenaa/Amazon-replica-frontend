import React from "react";
import { categoryImage } from "./CatagoryFullInfos";
import CatagoryCard from "./CatagoryCard";
import classes from "./Category.module.css";
function Catagory() {
  return (
    <section className={classes.category_container}>
      {categoryImage.map((infos, index) => (
        <CatagoryCard key={index} data={infos} />
      ))}
    </section>
  );
}

export default Catagory;
