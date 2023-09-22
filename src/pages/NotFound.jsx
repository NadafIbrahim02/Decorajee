import React from "react";
import "../404.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        textAlign: " center",
        fontFamily: "sans-serif",
        backgroundColor: "#E7FFFF",
        height: "100vh",
      }}
    >
      <div class="section">
        <h1 class="error">404</h1>
        <div class="page">
          Ooops!!! The page you are looking for is not found
        </div>
      </div>
    </div>
  );
}

export default NotFound;
