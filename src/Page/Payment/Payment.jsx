import React from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { useContext, useState } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Currencyformat from "../../Components/Currencyfomat/Currencyformat";
import { axiosInstance } from "../../Api/Axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  // console.log(user);
  const totalitem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [Carderror, setCardError] = useState();
  const [processing, setProcessing] = useState(false);
  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e.error.message) : setCardError(null);
  };
  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // backend api call
      //1. backend | functions -->contact to the client secret

      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      const clientSecret = response.data?.clientSecret;
      // console.log("response", response.data);
      // 2.client-side(react-side confirmation)
      const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log("confirmation", confirmation);
      // 3 if payment is successfull store the order in db and clear the basket
      await setDoc(
        doc(db, "users", user?.uid, "orders", confirmation.paymentIntent.id),
        {
          basket: basket,
          amount: confirmation.paymentIntent.amount,
          created: confirmation.paymentIntent.created,
        }
      );

      //empty the basket
      dispatch({ type: "EMPTY_BASKET" });

      setProcessing(false);
      navigate("/Orders", { state: { msg: "order placed succssfully" } });
    } catch (err) {
      console.log("error", err);
      setProcessing(false);
    }
  };
  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment_header}>CheckOut {totalitem} items</div>
      {/* paynent method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delievery Address</h3>
          <div>
            <div>{user.email}</div>
            <div>123 react lane</div>
            <div>Chicago</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delievery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment} action="">
                {Carderror && (
                  <small style={{ color: "red" }}>{Carderror}</small>
                )}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      Total Order | <Currencyformat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait....</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
