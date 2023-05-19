import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/authcontext/AuthContext";

export default function AuthProtector({ children }) {
  const { token } = useAuth();


  if (!token) {
    console.log(token)
    return <Navigate to="/login" replace />;
  }
  return children;
}
