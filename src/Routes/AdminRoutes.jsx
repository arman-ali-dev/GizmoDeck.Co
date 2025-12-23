import React from "react";
import { Route, Routes } from "react-router-dom";
import Category from "../admin/pages/Category/Category";
import AddCategory from "../admin/pages/Category/AddCategory";
import CouponCodes from "../admin/pages/CouponCode/CouponCodes";
import AddCouponCode from "../admin/pages/CouponCode/AddCouponCode";
import Users from "../admin/pages/User/Users";
import Sellers from "../admin/pages/Seller/Sellers";

const AdminRoutes = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/categories" element={<Category />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/coupons" element={<CouponCodes />} />
          <Route path="/add-coupon" element={<AddCouponCode />} />
          <Route path="/users" element={<Users />} />
          <Route path="/sellers" element={<Sellers />} />
        </Routes>
      </div>
    </>
  );
};

export default AdminRoutes;
