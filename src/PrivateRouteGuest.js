import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function PrivateRouteGuest() {
  const { currentUser } = useAuth();
  if (currentUser != null) {
    return !currentUser.emailVerified ? <Outlet /> : <Navigate to="/" />;
  } else {
    return  <Outlet />;
  }
}