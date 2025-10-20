import React from "react";
import WishlistProductCard from "./WishlistProductCard";

const Wishlist = () => {
  return (
    <>
      <div className=" px-4 py-8 lg:px-14 lg:py-12">
        <section>
          <h1 className="lg:text-[20px] text-[17px]">
            <strong>My Wishlist</strong> 3 Items
          </h1>

          <div className="lg:pt-8 pt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 gap-y-6">
            {[1, 1, 1, 1].map(() => (
              <WishlistProductCard />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Wishlist;
