import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Page/Landing/Landing";
import SignUp from "./Page/Auth/SignUp";
import Payment from "./Page/Payment/Payment";
import Order from "./Page/Orders/Order";
import Cart from "./Page/Cart/Cart";
import Result from "./Page/Results/Result";
import ProductDetail from "./Page/ProductDetail/ProductDetail";
function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<SignUp />} />
          <Route path="/payment" element={<Payment />} />
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
