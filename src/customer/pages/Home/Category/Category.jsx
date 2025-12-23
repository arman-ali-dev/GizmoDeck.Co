import React from "react";
import CategoryCard from "./CategoryCard";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";

const Category = () => {
  const { categories, loading } = useSelector((state) => state.category);

  const skeletons = Array(6).fill(null);

  return (
    <div className="relative hidden lg:flex overflow-hidden border-b border-[#bbb6b6] lg:pt-5 pt-2 lg:pb-4 pb-2 bg-white">
      <div className="flex whitespace-nowrap gap-10 ">
        {loading
          ? skeletons.map((_, index) => (
              <div
                key={index}
                className="lg:min-w-[145px] lg:w-[100px] w-[45px] flex justify-center mx-4 flex-shrink-0"
              >
                <div className="flex flex-col items-center space-y-1">
                  <Skeleton
                    variant="circular"
                    width={68}
                    height={68}
                    sx={{
                      bgcolor: "grey.300",
                      borderRadius: "50%",
                    }}
                  />
                  <Skeleton variant="text" width={60} height={18} />
                </div>
              </div>
            ))
          : categories?.map((category, index) => (
              <div
                key={index}
                className=" flex justify-center  mx-4 flex-shrink-0"
              >
                <CategoryCard category={category} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Category;
