// src/pages/LoginPage.js
import React, { useState } from "react";
import SignIn from "../components/SignIn";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (userData) => {
    console.log("Submitting user data:", userData);
    setEmail(userData.email);
    setPassword(userData.password);
    login();
  };

  const login = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log("Login successful");
        setResponseMessage(responseData.message);
        setRedirect(true); // Set redirect state to true upon successful registration
      } else {
        console.error("Login failed");
        setResponseMessage(responseData.error || "Login failed");
      }
    } catch (error) {
      console.error("Error Authenticating user:", error);
      setResponseMessage("Error Authenticating user");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <SignIn
        onSubmit={handleSubmit}
        responseMessage={responseMessage}
        setResponseMessage={setResponseMessage}
      />
    </div>
  );
};

export default LoginPage;
