import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Form() {
  // React Router navigation hook
  const history = useNavigate();

  // Get reference to submit button
  const submitButton = document.getElementById("submit");

  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phoneNumber: "",
    password: "",
    RepeatYourPassword: "",
  });

  // Alert messages state
  const [alerts, setAlerts] = useState({
    firstName: "",
    email: "",
    phoneNumber: "",
    password: "",
    RepeatYourPassword: "",
  });

  // Focus state to handle input focus styles
  const [FocusState, setFocusState] = useState({
    firstName: false,
    email: false,
    phoneNumber: false,
    password: false,
    RepeatYourPassword: false,
  });

  // State to track registration success
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Event handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Event handler for input focus
  const handleFocus = (name) => {
    setFocusState((prevfocusState) => ({ ...prevfocusState, [name]: true }));
  };

  // Regex for password validation
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Object to store new alerts
    const newAlerts = {};

    // Validation checks for each form field
    if (formData.firstName === "") {
      newAlerts.firstName = "⚠️please enter your name.";
    } else if (formData.firstName.length < 3) {
      newAlerts.firstName = "⚠️name should be more than 3 characters";
    } else if (formData.firstName.length > 30) {
      newAlerts.firstName = "⚠️name should be less than 30 characters";
    } else {
      newAlerts.firstName = "";
    }

    if (formData.phoneNumber === "") {
      newAlerts.phoneNumber = "⚠️please enter your phone number.";
    } else {
      newAlerts.phoneNumber = "";
    }

    if (formData.email === "") {
      newAlerts.email = "⚠️please enter your email.";
    } else {
      newAlerts.email = "";
    }

    if (formData.password === "") {
      newAlerts.password = "⚠️please enter your password.";
    } else if (
      specialCharRegex.test(formData.password) === false ||
      formData.password.length < 10
    ) {
      newAlerts.password = "⚠️please enter a valid password";
    } else {
      newAlerts.password = "";
    }

    if (formData.RepeatYourPassword === "") {
      newAlerts.RepeatYourPassword = "⚠️please repeat your password.";
    }

    if (formData.RepeatYourPassword !== formData.password) {
      newAlerts.RepeatYourPassword = "⚠️passwords don't match";
    } else {
      newAlerts.RepeatYourPassword = "";
    }

    // Set the new alerts
    setAlerts(newAlerts);

    // If there are no alerts, save form data and set registration success
    if (
      newAlerts.firstName === "" &&
      newAlerts.phoneNumber === "" &&
      newAlerts.email === "" &&
      newAlerts.password === "" &&
      newAlerts.RepeatYourPassword === ""
    ) {
      localStorage.setItem("formData", JSON.stringify(formData));
      sessionStorage.setItem("formData", JSON.stringify(formData));
      setRegistrationSuccess(true);
    }
  };

  // Log formData whenever it changes
  useEffect(() => {
    console.log(formData);
  }, [registrationSuccess]);

  return (
    <>
      <h1 className="formTitle">REGISTER-HERE</h1>
      <div className="form">
        {registrationSuccess ? (
          // Display success message and back to home link
          <div className="success">
            <h1 id="successNote">REGISTRATION SUCCESSFUL</h1>
            <Link to="/">
              <button id="back">Back to home</button>
            </Link>
          </div>
        ) : (
          // Display the form
          <form onSubmit={handleSubmit}>
            {/* For name */}
            <label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your name"
                onFocus={() => handleFocus("firstName")}
                className="formInput"
                style={{ borderColor: FocusState.firstName ? "navy" : "#ccc" }}
              />
              <div className="alert">{alerts.firstName}</div>
            </label>
            <br />
            {/* For email */}
            <label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                onFocus={() => handleFocus("email")}
                className="formInput"
                style={{ borderColor: FocusState.email ? "navy" : "#ccc" }}
              />
              <div className="alert">{alerts.email}</div>
            </label>
            <br />
            {/* For phone number */}
            <label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phoneNumber"
                onFocus={() => handleFocus("phoneNumber")}
                className="formInput"
                style={{
                  borderColor: FocusState.phoneNumber ? "navy" : "#ccc",
                }}
              />
              <div className="alert">{alerts.phoneNumber}</div>
            </label>
            <br />
            {/* Password */}
            <label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                onFocus={() => handleFocus("password")}
                className="formInput"
                style={{ borderColor: FocusState.password ? "navy" : "#ccc" }}
              />
              <div className="alert">{alerts.password}</div>
            </label>
            <br />
            {/* Repeat password */}
            <label>
              <input
                type="password"
                name="RepeatYourPassword"
                value={formData.RepeatYourPassword}
                onChange={handleChange}
                placeholder="Repeat your Password"
                onFocus={() => handleFocus("RepeatYourPassword")}
                className="formInput"
                style={{
                  borderColor: FocusState.RepeatYourPassword ? "navy" : "#ccc",
                }}
              />
              <div className="alert">{alerts.RepeatYourPassword}</div>
            </label>
            <br />
            {/* submit button */}
            <button
              id="submit"
              type="submit"
              style={{ padding: "10px", border: "none", cursor: "pointer" }}
            >
              Sign up
            </button>
         

          </form>
        )}
      </div>
    </>
  );
}

export default Form;
