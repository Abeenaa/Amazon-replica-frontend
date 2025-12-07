import React, { useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
function ProtectedRoute({ children, msg, redirectTo }) {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext);
  if (!user) {
    return (
      <Navigate
        to="/auth"
        state={{
          msg: msg || "You must log in to access this page",
          redirectTo: redirectTo || "/",
        }}
        replace
      />
    );
  }
  return children;
}

export default ProtectedRoute;
