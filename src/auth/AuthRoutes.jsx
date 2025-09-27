import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import OTP from "./OTP";
import IdentityVerification from "./IdentityVerification";

const AuthRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/otp" element={<OTP />} />
    <Route path="/identity-verification" element={<IdentityVerification />} />
  </Routes>
);

export default AuthRoutes;
