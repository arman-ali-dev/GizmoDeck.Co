import React, { useState } from "react";
import { Divider } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import AdminDrawerList from "../../components/Admin Drawer List/AdminDrawerList";
import AdminRoutes from "../../../Routes/AdminRoutes";
import Category from "../Category/Category";

const AdminDashboard = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <div className="relative">
      <div className="lg:hidden flex items-center justify-between px-4 py-2 border-b border-gray-300 bg-white shadow-sm sticky top-0 z-30">
        <h2 className="text-md font-semibold">Admin Dashboard</h2>
        <button
          onClick={toggleDrawer}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <ListIcon />
        </button>
      </div>

      <div className="lg:flex lg:h-[90vh]">
        {openDrawer && (
          <div
            onClick={toggleDrawer}
            className="fixed inset-0 bg-black/40 bg-opacity-40 z-30 lg:hidden"
          ></div>
        )}

        <section
          className={`fixed lg:static top-0 left-0 h-full bg-white z-40 lg:z-0 border-r border-gray-300 
            transform ${
              openDrawer ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <AdminDrawerList toggleDrawer={toggleDrawer} />
        </section>

        <section className="px-4 py-6 sm:p-8 w-full lg:w-[80%] overflow-y-auto bg-gray-50 min-h-screen lg:min-h-[90vh]">
          <AdminRoutes />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
