import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "./layout.";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home";
import CreateBroker from "./pages/brokers/create";
import AdminIndex from "./pages/Admins/index";
import Feedback from "./pages/feedbacks/index";
import CreateAdmin from "./pages/Admins/create";
import UserIndex from "./pages/users";
import BrokerIndex from "./pages/brokers";
import UserCreate from "./pages/users/create";

import Login from "./pages/auth/login";
import Unauthorized from "./pages/unauthorized";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";





const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <ToastContainer />

        <Routes> 
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<ProtectedRoute />}>
          <Route  element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/manage-brokers" element={<BrokerIndex />} />
          <Route path="/add-broker" element={<CreateBroker />} />
          <Route path="/admins" element={<AdminIndex />} />
          <Route path="/feedbacks" element={<Feedback />} />
          <Route path="/add-admin" element={< CreateAdmin/>} />
          <Route path="/manage-users" element={<UserIndex />} />
          <Route path="/manage-users" element={<UserIndex />} />
          <Route path="/add-user" element={<UserCreate />} />
          </Route>
        </Route>
          
        </Routes>
      </>
    </QueryClientProvider>
  );
}

export default App;
