import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Page/Landing/Landing";
import Auth from "./Page/Auth/Auth";
import Payment from "./Page/Payment/Payment";
import Order from "./Page/Orders/Order";
import Cart from "./Page/Cart/Cart";
import Result from "./Page/Results/Result";
import ProductDetail from "./Page/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51Sai29RPu07LwxJc6QeVx6jjABYqSjh8xsefnNNqMZeFhkyPNGJDeEfDlbwg2z7356ShAUiNGy9tVmNkU9etk8bS00qr7kx1Z7"
);

function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/payment"
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />
          <Route path="/Orders" element={<Order />} />
          <Route path="/category/:categoryName" element={<Result />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Routing;
