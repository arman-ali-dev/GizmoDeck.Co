import React, { useState } from "react";
import { Divider } from "@mui/material";
import SellerDrawerList from "../../../seller/components/Seller Drawer List/SellerDrawerList";
import SellerRoutes from "../../../Routes/SellerRoutes";
import ListIcon from "@mui/icons-material/List";

const SellerDashboard = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <div className="relative">
      {/* ===== Header for Mobile ===== */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-300 bg-white shadow-sm sticky top-0 z-30">
        <h2 className="text-lg font-semibold">Seller Dashboard</h2>
        <button
          onClick={toggleDrawer}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <ListIcon />
        </button>
      </div>

      {/* ===== Main Layout ===== */}
      <div className="lg:flex lg:h-[90vh]">
        {/* ===== Sidebar Section ===== */}
        {/* Overlay (for mobile) */}
        {openDrawer && (
          <div
            onClick={toggleDrawer}
            className="fixed inset-0 bg-black/40 bg-opacity-40 z-30 lg:hidden"
          ></div>
        )}

        {/* Sidebar */}
        <section
          className={`fixed lg:static top-0 left-0 h-full bg-white z-40 lg:z-0 border-r border-gray-300 
            transform ${
              openDrawer ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <SellerDrawerList toggleDrawer={toggleDrawer} />
        </section>

        {/* ===== Content Section ===== */}
        <section className="px-4 py-6 sm:p-8 w-full lg:w-[80%] overflow-y-auto bg-gray-50 min-h-screen lg:min-h-[90vh]">
          <SellerRoutes />
        </section>
      </div>
    </div>
  );
};

export default SellerDashboard;
