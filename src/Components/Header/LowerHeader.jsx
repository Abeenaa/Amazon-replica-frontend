import React from "react";
import { TiThMenu } from "react-icons/ti";
import classes from "../Header/Header.module.css";
function LowerHeader() {
  return (
    <div className={classes.lower__container}>
      <ul>
        <li>
          <TiThMenu size={25} />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Customer Services</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
