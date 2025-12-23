import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../store/customer/userSlice";
import { setAuthenticated, setJwt } from "../store/customer/authSlice";
import { setSeller } from "../store/seller/sellerSlice";

const DrawerList = ({ menu, menu2, toggleDrawer }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (path) => {
    navigate(path);
    toggleDrawer();
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setJwt(""));
    dispatch(setAuthenticated(false));
    dispatch(setSeller(null));
    navigate("/");
    console.log("seller logout!");
  };

  return (
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
              {elem.path === location.pathname ? elem.activeIcon : elem.icon}
              <p className="mt-1">{elem.name}</p>
            </p>
          </div>
        ))}
      </div>
      <Divider />
      <div className="space-y-2">
        {menu2.map((elem, index) => (
          <div
            onClick={() =>
              elem.name === "Logout"
                ? handleLogout()
                : handleNavigate(elem.path)
            }
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
              {elem.path === location.pathname ? elem.activeIcon : elem.icon}
              <p>{elem.name}</p>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrawerList;
