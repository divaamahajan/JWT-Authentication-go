// src/pages/LoginPage.js

import React from "react";
import SignIn from "../components/SignIn";

const LoginPage = () => {
  const handleSubmit = (userData) => {
    console.log("Submitting user data:", userData);
    // Add logic to send user data to login page
  };

  return (
    <div>
      <SignIn onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginPage;
