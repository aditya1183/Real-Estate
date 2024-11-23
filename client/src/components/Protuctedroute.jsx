import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedApp = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        const res = await axios.post("/api/auth/checkaccestoken");
        console.log("Access Token Valid:", res.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log(
            "Access token expired or not found. Redirecting to login."
          );
          navigate("/sign-in"); // Ensure route is correct
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    };

    checkAccessToken();
  }, [navigate]);

  return <>{children}</>; // Render the rest of the app if token is valid
};

export default ProtectedApp;
