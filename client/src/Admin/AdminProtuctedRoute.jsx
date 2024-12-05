import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminProtuctedRoute = ({ children }) => {
  const admintoken = localStorage.getItem("adminToken");

  if (!admintoken) {
    toast.error("You are not authorized to access this page.");
    return <Navigate to="/adminlogin" replace />; // Redirect to login
  }

  return children;
};

export default AdminProtuctedRoute;
