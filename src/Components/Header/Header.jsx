import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import amazonLogo from "../../Resource/images/amazon-logo.png";
import usa_flag from "../../Resource/images/usa-flag.png";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";

function Header() {
  const [{ basket }, dispatch] = useContext(DataContext);
  const totalitem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          {/* logo */}
          <div className={classes.logo__container}>
            <Link to="/">
              <img src={amazonLogo} alt="amazon logo" />
            </Link>
            {/* delivery */}
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          {/* search */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="search product" />
            <BsSearch size={25} />
          </div>

          {/* three component */}
          <div className={classes.order__container}>
            <Link to="/" className={classes.language}>
              <img src={usa_flag} alt="" />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>

            <Link to="/auth">
              <div>
                <p>Sign In</p>
                <span>Account and Lists</span>
              </div>
            </Link>
            {/* Orders  */}

            <Link to="/Orders">
              <p>Returns</p>
              <span> & Orders</span>
            </Link>
            {/* cart  */}
            <Link to="/Cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalitem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
