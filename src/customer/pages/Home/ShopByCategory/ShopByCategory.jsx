import React from "react";
import { useSelector } from "react-redux";
import { Skeleton, useMediaQuery, useTheme } from "@mui/material";
import ShopByCategoryCard from "./ShopByCategoryCard";
import tshirt from "../../../../assets/tshirt.png";
import dress from "../../../../assets/dress.png";
import electronic from "../../../../assets/electronic.png";
import cosmetics from "../../../../assets/cosmetics.png";
import furniture from "../../../../assets/furniture.png";
import grocery from "../../../../assets/grocery.png";
import slippers from "../../../../assets/slippers.png";
import sport from "../../../../assets/sport.png";
import homeAppliance from "../../../../assets/home-appliance.png";

const categories = [
  {
    id: 1,
    icon: tshirt,
    label: "Men's Fashion",
  },
  {
    id: 2,
    icon: dress,
    label: "Women's Fashion",
  },
  {
    id: 3,
    icon: electronic,
    label: "Electronics",
  },
  {
    id: 4,
    icon: furniture,
    label: "Furniture",
  },
  {
    id: 5,
    icon: grocery,
    label: "Grocery",
  },
  {
    id: 6,
    icon: slippers,
    label: "Footwear",
  },
  {
    id: 7,
    icon: sport,
    label: "Sports & Fitness",
  },
  {
    id: 8,
    icon: homeAppliance,
    label: "Home Appliances",
  },
];

const ShopByCategory = () => {
  const { loading } = useSelector((state) => state.category);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // <600px

  const count = isMobile ? 4 : 8;

  return (
    <section className="xl:px-12 lg:px-8 px-4 ">
      <div className="grid xl:grid-cols-8 md:grid-cols-4 grid-cols-4 lg:mt-12 mt-2  xl:mt-7 md:mt-10  md:gap-8 lg:gap-12 gap-4">
        {loading
          ? Array.from({ length: count }).map((_, i) => (
              <div key={i} className="col-span-1 flex flex-col items-center">
                <Skeleton
                  variant="circular"
                  sx={{
                    width: { xs: 60, md: 80 },
                    height: { xs: 60, md: 80 },
                    bgcolor: "#e0e0e0",
                  }}
                />

                <Skeleton
                  variant="text"
                  sx={{
                    width: { xs: 50, md: 70 },
                    height: { xs: 18, md: 20 },
                    marginTop: "6px",
                  }}
                />
              </div>
            ))
          : categories.slice(0, count)?.map((c, i) => (
              <div className="col-span-1" key={i}>
                <ShopByCategoryCard category={c} />
              </div>
            ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
