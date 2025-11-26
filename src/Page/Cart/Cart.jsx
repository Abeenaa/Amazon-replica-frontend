import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import Currencyformat from "../../Components/Currencyfomat/Currencyformat";
import { Link } from "react-router-dom";
import classes from "./Cart.module.css";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
function Cart() {
  const [state, dispatch] = useContext(DataContext);

  const basket =
    state?.basket && Array.isArray(state.basket) ? state.basket : [];
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id: id,
    });
  };
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />

          {basket.length === 0 ? (
            <p>Opps | No item in your cart</p>
          ) : (
            basket.map((item) => (
              <section className={classes.item_container}>
                <ProductCard
                  key={item.id}
                  product={item}
                  renderDesc={true}
                  flex={true}
                  renderAdd={false}
                />
                <div className={classes.btn_container}>
                  <button
                    className={classes.btn}
                    onClick={() => increment(item)}
                  >
                    <IoIosArrowUp size={20} />
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className={classes.btn}
                    onClick={() => decrement(item.id)}
                  >
                    <IoIosArrowDown size={20} />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>
        {basket.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket?.length}items)</p>
              <Currencyformat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contain a gift</small>
            </span>
            <Link to="/payment">Continue to check out</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
