import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import {
  clearSubCategories,
  fetchSubcategories,
} from "../../../store/admin/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SubNavbar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const closeTimeoutRef = useRef(null);
  const dispatch = useDispatch();
  const { subcategories } = useSelector((state) => state.category);

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

  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Box className="relative lg:block hidden w-full border-b border-[#bbb6b6] bg-white shadow-sm">
        <div className="lg:h-[70px] md:h-[60px] h-[50px] flex items-center justify-between px-4 sm:px-6 lg:px-12">
          {" "}
          <Link
            to="/"
            className="logo cursor-pointer text-md md:text-xl font-bold"
          >
            GizmoDeck.Co
          </Link>
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
              className="bg-black px-6 py-1.5 text-[14px] font-medium rounded-full text-white"
            >
              {user?.role == "SELLER"
                ? "Seller Dashboard"
                : user?.role == "ADMIN"
                ? "Admin Dashboard"
                : "Become a Seller"}
            </Link>
          </ul>
        </div>
      </Box>

      {activeCategory && (
        <Box
          onMouseEnter={() => {
            clearTimeout(closeTimeoutRef.current);
            setActiveCategory(activeCategory);
          }}
          onMouseLeave={handleCategoryMouseLeave}
          sx={{ zIndex: 20 }}
          className="categorySheet absolute top-[8.9rem] left-5 right-5 md:left-20 md:right-20 
                         bg-white border border-gray-300 p-5 rounded-lg shadow-lg"
        >
          <h2 className="text-lg font-semibold text-gray-800 capitalize mb-3">
            {activeCategory}
          </h2>

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
        </Box>
      )}
    </>
  );
};

export default SubNavbar;
