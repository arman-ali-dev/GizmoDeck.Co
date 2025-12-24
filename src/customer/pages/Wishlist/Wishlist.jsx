import React, { useEffect } from "react";
import WishlistProductCard from "./WishlistProductCard";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { fetchWishlistItems } from "../../../store/customer/wishlistSlice";
import NoWishlistItems from "./NoWishlistItems";

const Wishlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    dispatch(fetchWishlistItems());
  }, [dispatch]);

  const { wishlist, loading } = useSelector((state) => state.wishlist);

  return loading ? (
    <WishlistSkeleton />
  ) : wishlist?.wishlistItems?.length === 0 ? (
    <NoWishlistItems />
  ) : (
    <div className=" px-4 py-8 lg:px-14 lg:py-12">
      <section>
        <h1 className="lg:text-[20px] text-[17px]">
          <strong>My Wishlist</strong> {wishlist?.wishlistItems?.length} Items
        </h1>

        <div className="lg:pt-8 pt-5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-4 lg:gap-8 gap-y-6">
          {wishlist?.wishlistItems?.map((item) => (
            <WishlistProductCard item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

const WishlistSkeleton = () => {
  const isMobile = window.innerWidth < 768;
  const skeletonCount = isMobile ? 4 : 8;

  return (
    <div className="px-4 py-8 lg:px-14 lg:py-12">
      <section>
        <h1 className="lg:text-[20px] text-[17px]">
          <Skeleton variant="text" width={150} height={20} />
        </h1>

        <div className="lg:pt-8 pt-5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-4 lg:gap-8 gap-y-6">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <WishlistProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

const WishlistProductCardSkeleton = () => {
  return (
    <div className="relative">
      <Skeleton
        variant="rectangular"
        className="w-full rounded-md"
        sx={{
          height: { xs: 180, lg: 250 },
        }}
      />

      <div className="space-y-1 lg:pt-3 pt-1.5">
        <Skeleton variant="text" width="80%" height={20} />

        <div className="flex items-center gap-3">
          <Skeleton variant="text" width={50} height={20} />
          <Skeleton variant="text" width={40} height={20} />
          <Skeleton variant="text" width={30} height={20} />
        </div>
      </div>

      <div className="absolute top-2 right-2">
        <Skeleton variant="circular" width={32} height={32} />
      </div>
    </div>
  );
};

export default Wishlist;
