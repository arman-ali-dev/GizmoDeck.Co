import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "../seller/pages/Seller Dashboard/Dashboard";
import Products from "../seller/pages/Products/Products";
import AddProduct from "../seller/pages/Products/AddProduct";
import Orders from "../seller/pages/Orders/Orders";
import Payment from "../seller/pages/Payment/Payment";
import TransactionTable from "../seller/pages/Payment/TransactionTable";
import Profile from "../seller/pages/Account/Profile";

const SellerRoutes = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/transactions" element={<TransactionTable />} />
        </Routes>
      </div>
    </>
  );
};

export default SellerRoutes;
