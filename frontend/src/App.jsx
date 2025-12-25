import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminHome from "./components/admin/AdminHome";
import AdminUsers from "./components/admin/AdminUsers";
import LandingPage from "./pages/Landingpage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/users" element={<AdminUsers />} />
    </Routes>
  );
};

export default App;
