import { Divider } from "@mui/material";
import React, { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
import Orders from "./Orders";
import OrderDetails from "./OrderDetails";
import Security from "./Security";
import Address from "./Address";
import ListIcon from "@mui/icons-material/List";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ContactsIcon from "@mui/icons-material/Contacts";
import LogoutIcon from "@mui/icons-material/Logout";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockIcon from "@mui/icons-material/Lock";
import { logout } from "../../../store/customer/userSlice";
import { useDispatch } from "react-redux";
import Wishlist from "./Wishlist";
import { setAuthenticated, setJwt } from "../../../store/customer/authSlice";

const menu = [
  {
    name: "Profile",
    path: "/account",
    icon: <PersonOutlineIcon />,
    activeIcon: <PersonIcon />,
  },
  {
    name: "Security",
    path: "/account/security",
    icon: <LockOutlinedIcon />,
    activeIcon: <LockIcon />,
  },
  {
    name: "Orders",
    path: "/account/orders",
    icon: <ShoppingBagOutlinedIcon />,
    activeIcon: <ShoppingBagIcon />,
  },
  {
    name: "Wishlist",
    path: "/account/wishlist",
    icon: <BookmarkBorderIcon />,
    activeIcon: <BookmarkOutlinedIcon />,
  },
  {
    name: "Addresses",
    path: "/account/addresses",
    icon: <ContactsOutlinedIcon />,
    activeIcon: <ContactsIcon />,
  },
];

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleNavigate = (path) => {
    navigate(path);
    toggleDrawer();
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setJwt(""));
    dispatch(setAuthenticated(false))
    navigate("/");
  };

  return (
    <div className="relative">
      <div className="lg:hidden flex items-center justify-between px-4 py-2 border-b border-gray-300 bg-white shadow-sm sticky top-0 z-30">
        <h2 className="text-md font-semibold">User Dashboard</h2>
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
          <div className="h-full w-[270px] sm:w-[300px] flex flex-col justify-between py-5">
            <div className="space-y-2">
              {menu.map((elem, index) => (
                <div
                  onClick={() => handleNavigate(elem.path)}
                  className="cursor-pointer pr-7"
                  key={index}
                >
                  <p
                    className={`${
                      elem.path === location.pathname
                        ? "bg-[#000] text-white"
                        : "text-[#000]"
                    } flex items-center gap-3 px-5 py-3 rounded-r-full transition-all`}
                  >
                    {elem.path === location.pathname
                      ? elem.activeIcon
                      : elem.icon}

                    <p className="mt-1">{elem.name}</p>
                  </p>
                </div>
              ))}
            </div>
            <Divider />
            <div className="space-y-2">
              <div onClick={handleLogout} className="cursor-pointer pr-7">
                <p
                  onClick={handleLogout}
                  className=" flex items-center gap-3 px-5 py-3 rounded-r-full transition-all"
                >
                  <LogoutIcon />
                  <p>Logout</p>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-6 sm:p-8 w-full lg:w-[80%] overflow-y-auto bg-gray-50 min-h-screen lg:min-h-[90vh]">
          <Routes>
            <Route path="/" element={<UserDetails />} />
            <Route path="/security" element={<Security />} />
            <Route path="/orders" element={<Orders />} />
            <Route
              path="/order/:orderId/:orderItemId"
              element={<OrderDetails />}
            />
            <Route path="/addresses" element={<Address />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </section>
      </div>
    </div>
  );
};

export default Account;
