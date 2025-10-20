import { Divider } from "@mui/material";
import React, { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
import Orders from "./Orders";
import OrderDetails from "./OrderDetails";
import Address from "./Address";
import ListIcon from "@mui/icons-material/List";
const menu = [
  { name: "Profile", path: "/account" },
  { name: "Orders", path: "/account/orders" },
  { name: "Saved Cards", path: "/account/saved-card" },
  { name: "Addresses", path: "/account/addresses" },
  { name: "Logout", path: "/" },
];

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (path) => {
    navigate(path);
    setMenuOpen(false); // mobile me menu click hone ke baad band ho jaye
  };

  return (
    <div className="px-4 sm:px-6 lg:px-14 min-h-screen mt-12 relative overflow-hidden">
      <Divider />

      {/* Mobile Header */}
      <div className="flex justify-between items-center lg:hidden py-4">
        <h2 className="text-lg font-semibold">My Account</h2>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="border border-gray-400 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition"
        >
          <ListIcon />
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/40 bg-opacity-30 z-10 lg:hidden"
        ></div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 lg:min-h-[78vh] gap-4">
        {/* Sidebar */}
        <section
          className={`fixed lg:static top-0 left-0 h-full w-3/4 sm:w-1/2 lg:w-auto bg-white z-20 lg:z-0 lg:bg-transparent 
          border-r border-gray-300 transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <div className="pt-16 lg:pt-5 px-4 lg:pr-6 lg:pl-0">
            {menu.map((elem) => (
              <div
                onClick={() => handleClick(elem.path)}
                key={elem.name}
                className={`${
                  location.pathname === elem.path
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                } py-3 cursor-pointer border-b border-gray-200 px-5 rounded-md transition-all duration-150`}
              >
                <p className="text-sm sm:text-base">{elem.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Content Area */}
        <section className="lg:col-span-3 lg:pl-5 py-5  z-0 relative">
          <Routes>
            <Route path="/" element={<UserDetails />} />
            <Route path="/orders" element={<Orders />} />
            <Route
              path="/order/:orderId/:orderItemId"
              element={<OrderDetails />}
            />
            <Route path="/addresses" element={<Address />} />
          </Routes>
        </section>
      </div>
    </div>
  );
};

export default Account;
