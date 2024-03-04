import React from "react";
import "./navbar-fixed.css";

function Navbar({ userName }) {
  const logout = async () => {
    // Add async keyword here
    try {
      const response = await fetch(`http://localhost:8000/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        console.log("Logout successful");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark mb ">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Home
        </a>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            {userName ? (
              <li className="nav-item">
                <a className="nav-link" href="/login" onClick={logout}>
                  Logout
                </a>
              </li>
            ) : (
              
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
