import React from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddIcon from "@mui/icons-material/Add";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DrawerList from "../../../components/DrawerList";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import Groups2Icon from "@mui/icons-material/Groups2";

const menu = [
  {
    name: "Categories",
    path: "/admin/categories",
    icon: <SpaceDashboardOutlinedIcon className="text-[#000]" />,
    activeIcon: <SpaceDashboardIcon className="text-white" />,
  },
  {
    name: "Add Category",
    path: "/admin/add-category",
    icon: <AddIcon className="text-[#000]" />,
    activeIcon: <AddIcon className="text-white" />,
  },
  {
    name: "Coupon Codes",
    path: "/admin/coupons",
    icon: <LocalOfferOutlinedIcon className="text-[#000]" />,
    activeIcon: <LocalOfferIcon className="text-white" />,
  },
  {
    name: "Add Coupon",
    path: "/admin/add-coupon",
    icon: <AddIcon className="text-[#000]" />,
    activeIcon: <AddIcon className="text-white" />,
  },
  {
    name: "Sellers",
    path: "/admin/sellers",
    icon: <StoreOutlinedIcon className="text-[#000]" />,
    activeIcon: <StoreMallDirectoryIcon className="text-white" />,
  },

  {
    name: "Users",
    path: "/admin/users",
    icon: <Groups2OutlinedIcon className="text-[#000]" />,
    activeIcon: <Groups2Icon className="text-white" />,
  },
];

const menu2 = [
  {
    name: "Logout",
    path: "/",
    icon: <LogoutIcon className="text-[#000]" />,
    activeIcon: <LogoutIcon className="text-white" />,
  },
];
const AdminDrawerList = ({ toggleDrawer }) => {
  return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};

export default AdminDrawerList;
