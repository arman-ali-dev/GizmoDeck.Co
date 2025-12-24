import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "./customer/userSlice";
import categoryReducer from "./admin/categorySlice";
import couponReducer from "./admin/couponSlice";
import productReducer from "./customer/productSlice";
import wishlistReducer from "./customer/wishlistSlice";
import authReducer from "./customer/authSlice";
import addressReducer from "./customer/addressSlice";
import cartReducer from "./customer/cartSlice";
import orderReducer from "./customer/orderSlice";
import reviewReducer from "./customer/reviewSlice";

import sellerOrderReducer from "./seller/orderSlice";
import sellerProductReducer from "./seller/productSlice";
import sellerTransactionReducer from "./seller/transactionSlice";
import sellerReducer from "./seller/sellerSlice";
import sellerDashboardReducer from "./seller/sellerDashboardSlice";

import adminUserReducer from "./admin/userSlice";
import adminSellerReducer from "./admin/sellerSlice";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

// CART
const cartPersistConfig = {
  key: "cart",
  storage,
  blacklist: ["loading", "addLoading", "error"],
};

// AUTH
const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["loading", "error"],
};

// WISHLIST
const wishlistPersistConfig = {
  key: "wishlist",
  storage,
  blacklist: ["loading", "addingItemId", "removingItemId", "error"],
};

const rootReducer = combineReducers({
  // CUSTOMER
  user: userReducer,
  category: categoryReducer,
  coupon: couponReducer,
  product: productReducer,

  wishlist: persistReducer(wishlistPersistConfig, wishlistReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  address: addressReducer,

  cart: persistReducer(cartPersistConfig, cartReducer),
  order: orderReducer,

  review: reviewReducer,

  // SELLLER
  sellerOrder: sellerOrderReducer,
  sellerProduct: sellerProductReducer,
  sellerTransaction: sellerTransactionReducer,
  seller: sellerReducer,
  sellerDashboard: sellerDashboardReducer,

  // ADMIN
  adminUser: adminUserReducer,
  adminSeller: adminSellerReducer,
});

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["user", "category", "coupon", "product"],
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
