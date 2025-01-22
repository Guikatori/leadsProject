import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Leads from '../Pages/Leads'

const AppRoutes: React.FC = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Leads" element={<Leads />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRoutes;