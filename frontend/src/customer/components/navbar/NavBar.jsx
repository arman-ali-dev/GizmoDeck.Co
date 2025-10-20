import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Avatar,
  Tooltip,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import StorefrontIcon from "@mui/icons-material/Storefront";

const NavBar = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCategoryMouseEnter = (categoryName) => {
    setActiveCategory(categoryName);
  };

  const handleCategoryMouseLeave = () => {
    setActiveCategory(null);
  };

  return (
    <Box className="relative w-full border-b border-[#bbb6b6] bg-white shadow-sm">
      {/* Main Navbar */}
      <div className="lg:h-[70px] md:h-[60px] h-[50px] flex items-center justify-between px-4 sm:px-6 lg:px-12">
        {/* Left Section */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Mobile Menu Button */}

          <div className="lg:hidden">
            <MenuIcon onClick={() => setDrawerOpen(true)} />
          </div>
          {/* Logo */}
          <Link
            to="/"
            className="logo cursor-pointer text-md md:text-xl font-bold"
          >
            GizmoDeck.Co
          </Link>

          {/* Search Bar (Hidden on Small Devices) */}
          <div className="hidden md:block w-[250px] md:w-[400px] relative">
            <input
              className="border border-[#ccc] outline-none text-[14px] py-2.5 px-6 rounded-full w-full"
              type="text"
              placeholder="Search product..."
            />
            <SearchIcon
              className="absolute top-1/2 -translate-y-1/2 right-4 text-[#808080]"
              sx={{ fontSize: 20 }}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex lg:items-center items-end gap-4 sm:gap-5">
          {/* Categories (Hidden on Small Devices) */}
          <ul className="hidden lg:flex items-center gap-6 text-md font-medium text-gray-800">
            {["Men", "Women", "Electronics"].map((c) => (
              <li
                key={c}
                className="cursor-pointer hover:text-[var(--primary-color)] transition-all duration-300 hover:border-[var(--primary-color)] border-b-2 mt-1 !text-[15px] border-transparent"
                onMouseEnter={() => handleCategoryMouseEnter(c)}
                onMouseLeave={handleCategoryMouseLeave}
              >
                {c}
              </li>
            ))}
          </ul>

          {/* Seller Icon */}
          <Tooltip
            onClick={() => navigate("/become-seller")}
            title="Become a Seller"
            arrow
          >
            <StorefrontIcon
              sx={{ cursor: "pointer", fontSize: { xs: 21, md: 24 } }}
              className="text-gray-700"
            />
          </Tooltip>

          {/* Profile / Login */}
          <Tooltip
            className="cursor-pointer"
            onClick={() => navigate("/account")}
            title="Profile"
            arrow
          >
            <Avatar
              sx={{ width: { xs: 24, md: 28 }, height: { xs: 24, md: 28 } }}
              src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
            />
          </Tooltip>
        </div>
      </div>

      {/* Category Sheet */}
      {activeCategory && (
        <Box
          sx={{ zIndex: 2 }}
          className="categorySheet absolute top-[4.4rem] left-5 right-5 md:left-20 md:right-20 bg-gray-100 border border-gray-300 p-4 rounded-md shadow-md"
        >
          <h2 className="text-lg font-semibold capitalize">
            {activeCategory} Category Section
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Example static dropdown area for categories.
          </p>
        </Box>
      )}

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box className="w-64 p-4">
          <h3 className="text-lg font-bold mb-4">Categories</h3>
          <List>
            {["Men", "Women", "Electronics"].map((c) => (
              <ListItem
                key={c}
                button
                onClick={() => {
                  setDrawerOpen(false);
                  navigate(`/category/${c.toLowerCase()}`);
                }}
              >
                <ListItemText primary={c} />
              </ListItem>
            ))}
            <ListItem button onClick={() => navigate("/become-seller")}>
              <ListItemText primary="Become a Seller" />
            </ListItem>
            <ListItem button onClick={() => navigate("/account")}>
              <ListItemText primary="My Account" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default NavBar;
