import React, { useEffect, useRef, useState } from "react";
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
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSubCategories,
  fetchSubcategories,
} from "../../../store/admin/categorySlice";
import heartIcon from "../../../assets/heart.png";
import userIcon from "../../../assets/user.png";
import bagIcon from "../../../assets/bag.png";

const NavBar = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const { subcategories, loadingSub } = useSelector((state) => state.category);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const closeTimeoutRef = useRef(null);

  const handleCategoryMouseEnter = (categoryName) => {
    clearTimeout(closeTimeoutRef.current);
    setActiveCategory(categoryName);
    dispatch(
      fetchSubcategories(
        categoryName === "Men" ? 1 : categoryName == "Women" ? 2 : 3
      )
    );
  };

  const handleCategoryMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
      dispatch(clearSubCategories());
    }, 150);
  };

  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() === "") return;
    navigate(`/search?q=${query}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // user

  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Box
        className={`w-full border-b border-[#bbb6b6] bg-white shadow-sm
    transition-all duration-300 ease-in-out
    ${
      isSticky
        ? "fixed top-0 left-0 z-50 translate-y-0 opacity-100"
        : "relative  opacity-100"
    }
  `}
      >
        {" "}
        <div className="lg:h-[70px] md:h-[60px] h-[50px] flex items-center justify-between px-4 sm:px-6 lg:px-12">
          <Link
            to="/"
            className="logo lg:hidden  cursor-pointer text-md md:text-xl font-bold"
          >
            GizmoDeck.Co
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="lg:hidden">
              {/* <MenuIcon onClick={() => setDrawerOpen(true)}  /> */}
              <svg
                onClick={() => setDrawerOpen(true)}
                width="22px"
                viewBox="0 -0.5 21 21"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>menu_navigation_grid [#1528]</title>{" "}
                  <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    {" "}
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-139.000000, -200.000000)"
                      fill="#000000"
                    >
                      {" "}
                      <g
                        id="icons"
                        transform="translate(56.000000, 160.000000)"
                      >
                        {" "}
                        <path
                          d="M101.9,57.009 C101.9,57.56 101.38235,58 100.80275,58 L97.65275,58 C97.0742,58 96.65,57.56 96.65,57.009 L96.65,54.009 C96.65,53.458 97.0742,53 97.65275,53 L100.80275,53 C101.38235,53 101.9,53.458 101.9,54.009 L101.9,57.009 Z M100.80275,51 L97.65275,51 C95.9129,51 94.55,52.352 94.55,54.009 L94.55,57.009 C94.55,58.666 95.9129,60 97.65275,60 L100.80275,60 C102.5426,60 104,58.666 104,57.009 L104,54.009 C104,52.352 102.5426,51 100.80275,51 L100.80275,51 Z M90.35,57.009 C90.35,57.56 89.83235,58 89.25275,58 L86.10275,58 C85.5242,58 85.1,57.56 85.1,57.009 L85.1,54.009 C85.1,53.458 85.5242,53 86.10275,53 L89.25275,53 C89.83235,53 90.35,53.458 90.35,54.009 L90.35,57.009 Z M89.25275,51 L86.10275,51 C84.3629,51 83,52.352 83,54.009 L83,57.009 C83,58.666 84.3629,60 86.10275,60 L89.25275,60 C90.9926,60 92.45,58.666 92.45,57.009 L92.45,54.009 C92.45,52.352 90.9926,51 89.25275,51 L89.25275,51 Z M101.9,46.009 C101.9,46.56 101.38235,47 100.80275,47 L97.65275,47 C97.0742,47 96.65,46.56 96.65,46.009 L96.65,43.009 C96.65,42.458 97.0742,42 97.65275,42 L100.80275,42 C101.38235,42 101.9,42.458 101.9,43.009 L101.9,46.009 Z M100.80275,40 L97.65275,40 C95.9129,40 94.55,41.352 94.55,43.009 L94.55,46.009 C94.55,47.666 95.9129,49 97.65275,49 L100.80275,49 C102.5426,49 104,47.666 104,46.009 L104,43.009 C104,41.352 102.5426,40 100.80275,40 L100.80275,40 Z M90.35,46.009 C90.35,46.56 89.83235,47 89.25275,47 L86.10275,47 C85.5242,47 85.1,46.56 85.1,46.009 L85.1,43.009 C85.1,42.458 85.5242,42 86.10275,42 L89.25275,42 C89.83235,42 90.35,42.458 90.35,43.009 L90.35,46.009 Z M89.25275,40 L86.10275,40 C84.3629,40 83,41.352 83,43.009 L83,46.009 C83,47.666 84.3629,49 86.10275,49 L89.25275,49 C90.9926,49 92.45,47.666 92.45,46.009 L92.45,43.009 C92.45,41.352 90.9926,40 89.25275,40 L89.25275,40 Z"
                          id="menu_navigation_grid-[#1528]"
                        >
                          {" "}
                        </path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </div>

            <Link
              to="/"
              className="logo hidden lg:block  cursor-pointer text-md md:text-xl font-bold"
            >
              GizmoDeck.Co
            </Link>

            <div className="hidden md:block w-[250px] md:w-[400px] relative">
              <input
                className="border border-[#ccc] outline-none text-[14px] py-2.5 px-6 rounded-full w-full"
                type="text"
                placeholder="Search product..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <SearchIcon
                className="absolute top-1/2 -translate-y-1/2 right-4 text-[#808080]"
                sx={{ fontSize: 20 }}
              />
            </div>
          </div>

          <div className="lg:flex hidden lg:items-center items-end gap-4 sm:gap-5">
            {isAuthenticated ? (
              <>
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

                  <Link
                    to={
                      user?.role == "SELLER"
                        ? "/seller"
                        : user?.role == "ADMIN"
                        ? "/admin/categories"
                        : "/become-seller"
                    }
                    className="bg-black hover:bg-white border transition-all duration-100   hover:text-black px-6 py-1.5 text-[14px] font-medium rounded-full text-white"
                  >
                    {user?.role == "SELLER"
                      ? "Seller Dashboard"
                      : user?.role == "ADMIN"
                      ? "Admin Dashboard"
                      : "Become a Seller"}
                  </Link>
                </ul>

                <ul class="lg:flex hidden gap-4 items-center">
                  <li>
                    <Tooltip
                      className="cursor-pointer"
                      onClick={() => navigate("/wishlist")}
                      title="Wishlist"
                      arrow
                    >
                      <p>
                        <img class="w-[17px]" src={heartIcon} alt="" />
                      </p>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip
                      className="cursor-pointer"
                      onClick={() => navigate("/account")}
                      title="Profile"
                      arrow
                    >
                      <p>
                        <img class="w-[17px]" src={userIcon} alt="" />
                      </p>
                    </Tooltip>
                  </li>
                  <li class="relative">
                    <Tooltip
                      className="cursor-pointer"
                      onClick={() => navigate("/cart")}
                      title="Cart"
                      arrow
                    >
                      <p>
                        <img class="w-[17px]" src={bagIcon} alt="" />
                        <span class="bg-[#000] -top-1 -right-2 h-[16px] flex justify-center text-[10px] font-medium text-white items-center w-[16px] rounded-full absolute">
                          {cart?.cartItems?.length}
                        </span>
                      </p>
                    </Tooltip>
                  </li>
                </ul>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-black  hover:bg-white border transition-all duration-100   hover:text-black   px-6 py-1.5 text-[14px] font-medium rounded-full text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
        {activeCategory && (
          <Box
            onMouseEnter={() => {
              clearTimeout(closeTimeoutRef.current);
              setActiveCategory(activeCategory);
            }}
            onMouseLeave={handleCategoryMouseLeave}
            sx={{ zIndex: 20 }}
            className="categorySheet absolute top-[4.4rem] left-5 right-5 md:left-20 md:right-20 
         bg-white border border-gray-300 p-5 rounded-lg shadow-lg"
          >
            <h2 className="text-lg font-semibold text-gray-800 capitalize mb-3">
              {activeCategory}
            </h2>

            {loadingSub ? (
              <CategorySkeleton />
            ) : (
              <ul className="space-y-2">
                {subcategories?.map((sub) => (
                  <li
                    key={sub.id}
                    className="text-[15px] text-gray-700 hover:text-black cursor-pointer 
                 hover:font-medium transition-all"
                  >
                    {sub.name}
                  </li>
                ))}
              </ul>
            )}
          </Box>
        )}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box className="w-84 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold ">Categories</h3>
              <IconButton onClick={() => setDrawerOpen(false)} size="small">
                <HighlightOffIcon />
              </IconButton>
            </div>
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
                  <span className="font-medium">{c}</span>
                </ListItem>
              ))}
              <ListItem button onClick={() => navigate("/become-seller")}>
                <span className="font-medium">Become a Seller</span>
              </ListItem>
              <ListItem button onClick={() => navigate("/account")}>
                <span className="font-medium">My Account</span>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>

      {isSticky && <div className="h-[70px]" />}
    </>
  );
};

const CategorySkeleton = () => {
  return (
    <div className="flex gap-20">
      <ul className="space-y-3 animate-pulse">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <li key={i} className="h-2 w-20 bg-gray-200 rounded" />
        ))}
      </ul>

      <ul className="space-y-3 animate-pulse">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <li key={i} className="h-2 w-20 bg-gray-200 rounded" />
        ))}
      </ul>

      <ul className="space-y-3 animate-pulse">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <li key={i} className="h-2 w-20 bg-gray-200 rounded" />
        ))}
      </ul>

      <ul className="space-y-3 animate-pulse">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <li key={i} className="h-2 w-20 bg-gray-200 rounded" />
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
