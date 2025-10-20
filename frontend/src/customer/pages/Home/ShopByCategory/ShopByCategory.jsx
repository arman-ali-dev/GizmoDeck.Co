import React from "react";
import ShopByCategoryCard from "./ShopByCategoryCard";

const ShopByCategory = () => {
  return (
    <>
      <section className="xl:px-12 lg:px-8 px-4 py-8">
        <div className="text-center">
          <h2 className="font-semibold lg:text-[28px] md:text-[24px] text-[20px">
            Choose Your Category
          </h2>
          <p className="lg:text-[16px] md:text-[14px] text-[12px] md:w-[70%] w-[70%] xl:w-[50%] text-gray-700 font-medium mx-auto">
            Discover categories designed to match your every mood and moment —
            from classic essentials to trend-forward outfits crafted for modern
            living.
          </p>
        </div>

        <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-3 lg:mt-12 xl:mt-16 md:mt-10 mt-5 md:gap-8 lg:gap-12 gap-4">
          {[1, 1, 1, 1, 1, 1].map(() => (
            <div className="col-span-1">
              <ShopByCategoryCard />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ShopByCategory;
