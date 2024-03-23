import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "./layout.";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home";
import Broker from "./pages/brokers/index";
import CreateBroker from "./pages/brokers/create";
import AdminIndex from "./pages/Admins/index";



const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <ToastContainer />
        <Routes> 
          <Route  element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/manage-brokers" element={<Broker />} />
          <Route path="/add-broker" element={<CreateBroker />} />
          <Route path="/admins" element={<AdminIndex />} />
          </Route>
          
          {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
          {/* protected route  */}
          
        </Routes>
      </>
    </QueryClientProvider>
  );
}

export default App;
