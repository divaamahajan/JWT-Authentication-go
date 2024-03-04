import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sign-in.css"; // Import custom styles

const SignUp = ({ onSubmit, responseMessage, setResponseMessage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Invalid Email Address");
      return;
    }
    // Send data to register page
    const userData = {
      name: name,
      email: email,
      password: password,
    };
    onSubmit(userData); // Pass user data to onSubmit function
    // You can perform further actions like sending data to the server here
  };

  const isValidEmail = (email) => {
    // Email validation logic here (e.g., regex)
    // Return true if valid, false otherwise
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={handleNameChange}
            required
          />
          <label htmlFor="name">Name</label>
        </div>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Register
        </button>
        {responseMessage && <p className="mt-5 mb-3 text-body-secondary">{responseMessage}</p>}
      </form>
    </main>
  );
};

export default SignUp;
