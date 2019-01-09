import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../store";

const AuthForm = props => {
  const { name, displayName, handleSubmit, error, drizzleState } = props;
  return (
    <div className="window">
      <div className="center-display">
        <h2>please enter your information below</h2>
        {name === "signup" && (
          <h4>
            you are creating an account with the address ${
              drizzleState.accounts[0]
            }
          </h4>
        )}
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <button className="submit-button" type="submit">
            {displayName}
          </button>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    </div>
  );
};

const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      const contractUserId = 1
      dispatch(auth(email, password, contractUserId, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
