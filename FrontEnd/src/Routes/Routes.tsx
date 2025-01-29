import React from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Leads from '../Pages/Leads'

const AppRoutes: React.FC = () => {

  const hasUserKey = localStorage.getItem('Key') !== null

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Leads" element={hasUserKey ? <Leads/> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRoutes;