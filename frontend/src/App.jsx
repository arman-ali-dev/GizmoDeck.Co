import React, { useEffect } from "react";
import NavBar from "./customer/components/navbar/NavBar";
import Home from "./customer/pages/Home/Home";
import Footer from "./customer/components/Footer/Footer";
import ProductDetails from "./customer/pages/Product Details/ProductDetails";
import Product from "./customer/pages/Product/Product";
import Review from "./customer/pages/Review/Review";
import Wishlist from "./customer/pages/Wishlist/Wishlist";
import Cart from "./customer/pages/Cart/Cart";
import Checkout from "./customer/pages/Checkout/Checkout";
import Account from "./customer/pages/Account/Account";
import { Route, Routes, useLocation } from "react-router-dom";
import Auth from "./customer/pages/Auth/Auth";
import BecomeSeller from "./customer/pages/Become Seller/BecomeSeller";
import SellerDashboard from "./seller/pages/Seller Dashboard/SellerDashboard";
import BottomNavBar from "./customer/components/navbar/BottomNavBar";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "./store/customer/user/userSlice";

const App = () => {
  const location = useLocation();
  const hideLayoutPaths = ["/login", "/register", "/become-seller"];
  const hideLayout = hideLayoutPaths.includes(location.pathname);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log(token);

    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  return (
    <>
      {!hideLayout && <NavBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<Product />} />
        <Route path="/reviews/:productId" element={<Review />} />
        <Route
          path="/product-details/:categoryId/:name/:productId"
          element={<ProductDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account/*" element={<Account />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/become-seller" element={<BecomeSeller />} />
        <Route path="/seller/*" element={<SellerDashboard />} />
      </Routes>

      {!hideLayout && <Footer />}
      {!hideLayout && <BottomNavBar />}
    </>
  );
};

export default App;
