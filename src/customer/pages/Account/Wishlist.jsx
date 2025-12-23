import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WishlistProductCard from "../Wishlist/WishlistProductCard";
import { fetchWishlistItems } from "../../../store/customer/wishlistSlice";
import { Skeleton } from "@mui/material";
import NoWishlistItems from "../Wishlist/NoWishlistItems";

const Wishlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    dispatch(fetchWishlistItems());
  }, [dispatch]);

  const { wishlist, loading } = useSelector((state) => state.wishlist);

  return (
    <>
      <div>
        <section>
          {wishlist?.wishlistItems?.length !== 0 && (
            <>
              {loading ? (
                <div className="pb-3">
                  <Skeleton height={28} width="40%" />
                </div>
              ) : (
                <h1 className="lg:text-[20px] text-[17px]">
                  <strong>My Wishlist</strong> {wishlist?.wishlistItems?.length}{" "}
                  Items
                </h1>
              )}
            </>
          )}

          {loading ? (
            <WishlistSkeleton count={8} />
          ) : wishlist?.wishlistItems?.length === 0 ? (
            <NoWishlistItems />
          ) : (
            <div className="lg:pt-8 pt-5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-4 lg:gap-8 gap-y-6">
              {wishlist?.wishlistItems?.map((item) => (
                <WishlistProductCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

const WishlistProductCardSkeleton = () => {
  return (
    <div className="relative cursor-pointer">
      <Skeleton
        variant="rectangular"
        className="w-full rounded-md"
        height={180}
        sx={{ lg: { height: 250 } }}
      />

      <div className="space-y-1 lg:pt-3 pt-1.5">
        <Skeleton height={20} width="80%" className="mx-auto" />
        <Skeleton height={16} width="50%" className="mx-auto" />
        <Skeleton height={16} width="30%" className="mx-auto" />
      </div>
    </div>
  );
};

const WishlistSkeleton = ({ count = 8 }) => {
  return (
    <div className="lg:pt-8 pt-5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-4 lg:gap-8 gap-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <WishlistProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default Wishlist;
