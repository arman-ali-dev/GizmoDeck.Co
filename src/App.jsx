import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import OrderSuccess from "./customer/pages/Checkout/OrderSuccess";
import AdminDashboard from "./admin/pages/Admin Dashboard/AdminDashboard";
import { fetchUserProfile } from "./store/customer/userSlice";
import ScrollToTop from "./components/ScrollToTop";
import BecomeSellerButton from "./components/BecomeSellerButton";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./customer/pages/Not Found/NotFound";
import SubNavbar from "./customer/components/navbar/SubNavbar";
import Header from "./customer/components/Header/Header";
import PageLoader from "./components/PageLoader";

const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
    }, 4000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const hideHeaderPaths = [
    "/login",
    "/register",
    "/become-seller",
    "/order-placed",
    "/admin/login",
  ];
  const hideFooterPaths = [
    "/login",
    "/register",
    "/become-seller",
    "/order-placed",
  ];

  const hideHeader = hideHeaderPaths.includes(location.pathname);
  const hideFooter =
    hideFooterPaths.includes(location.pathname) ||
    location.pathname.startsWith("/account") ||
    location.pathname.startsWith("/seller") ||
    location.pathname.startsWith("/admin");
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    dispatch(fetchUserProfile());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log("isauth", isAuthenticated);

  return (
    <>
      {loading && <PageLoader />}
      <ScrollToTop />
      {!hideHeader && (
        <>
          <Header />
          <NavBar />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PublicOnlyRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/login" element={<Auth />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
        </Route>

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/products/:categoryId" element={<Product />} />
          <Route path="/search" element={<Product />} />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route
            path="/product-details/:productId"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account/*" element={<Account />} />

          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/order-placed" element={<OrderSuccess />} />

          <Route path="/seller/*" element={<SellerDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideFooter && <Footer />}
      {!hideFooter && <BottomNavBar />}

      <BecomeSellerButton />
    </>
  );
};

export default App;
