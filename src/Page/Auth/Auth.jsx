import React, { useState } from "react";
import classes from "./Auth.module.css";
import { Link } from "react-router-dom";
import { auth } from "../../Utility/Firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useContext } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { ClipLoader } from "react-spinners";
import { useNavigate, useLocation } from "react-router-dom";
function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navState = useLocation().state;
  const location = useLocation();
  const from = location.state?.redirectTo || "/";
  // console.log(navState);
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
  const [{ user }, dispatch] = useContext(DataContext);
  // console.log("current user:", user);

  const authHandler = async (e) => {
    e.preventDefault();

    if (e.target.name === "signin") {
      // Sign In
      setLoading({ ...loading, signIn: true });
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({
          type: "SET_USER",
          user: userCredential.user,
        });
        navigate(from, { replace: true });
        setLoading({ ...loading, signIn: false });
      } catch (err) {
        setLoading({ ...loading, signIn: false });
        setError(err.message);
      }
    } else {
      // Sign Up
      setLoading({ ...loading, signUp: true });
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({
          type: "SET_USER",
          user: userCredential.user,
        });
        navigate(from, { replace: true });
        setLoading({ ...loading, signUp: false });
      } catch (err) {
        setLoading({ ...loading, signUp: false });
        setError(err.message);
      }
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
          alt="Amazon Logo"
        />
      </Link>

      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {location.state?.msg && (
          <div className={classes.auth_message}>{location.state.msg}</div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>

          <button
            name="signin"
            type="submit"
            onClick={authHandler}
            className={classes.login_SignInButton}
          >
            {loading.signIn ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p>
          By signing-in you agree to Amazon Fake Clone Conditions of Use & Sale.
        </p>

        <button
          name="signup"
          onClick={authHandler}
          className={classes.login_registerButton}
        >
          {loading.signUp ? (
            <ClipLoader size={20} color="#ffffff" />
          ) : (
            "Create Your Amazon Account"
          )}
        </button>
      </div>
    </section>
  );
}

export default Auth;
