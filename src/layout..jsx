import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./components/shared/SideBar";
import Header from "./components/shared/header";
import Footer from "./components/shared/Footer";
import Breadcrumb from "./components/shared/BreadCrumb";
import useWindowSize from "./hooks/use-window-size";
// import { useAuth } from "./hooks/useAuth";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isMobile, isDesktop, windowSize } = useWindowSize();
  // const { user, logout } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <div className="flex flex-row h-screen">
      {isMobile || isSidebarOpen ? (
        <div
          className={`w-60 h-screen z-20 ${
            isMobile ? (isSidebarOpen ? "absolute" : "hidden") : "block"
          }`}
        >
          <SideBar />
        </div>
      ) : null}

      <div className="flex-1 flex flex-col overflow-x-hidden">
        <header className="sticky top-0 z-40">
          <Header toggleSidebar={toggleSidebar}  />
        </header>
        <main className="flex-1 p-5">
          <Breadcrumb />
          <div className="mt-4">
            <Outlet />
          </div>
        </main>
        <footer className="bg-blue-500">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default Layout;
