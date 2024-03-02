// src/pages/RegisterPage.js
import React from 'react';
import SignUp from "../components/SignUp";

const RegisterPage = () => {
  const handleSubmit = (userData) => {
    console.log("Submitting user data:", userData);
    // Add logic to send user data to register page
  };

  return (
    <div>
      <SignUp onSubmit={handleSubmit} />
    </div>
  );
}

export default RegisterPage;

