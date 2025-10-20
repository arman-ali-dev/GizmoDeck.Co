import React from "react";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    name: "Men",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3f1d?w=600",
    description: "Latest fashion and accessories for men.",
  },
  {
    name: "Women",
    image: "https://images.unsplash.com/photo-1520975918318-3f3c2f5d2b2a?w=600",
    description: "Trendy styles and essentials for women.",
  },
  {
    name: "Home",
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600",
    description: "Modern furniture and decor for every home.",
  },
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=600",
    description: "Smart gadgets and latest tech devices.",
  },
  {
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600",
    description: "Makeup, skincare and wellness products.",
  },
  {
    name: "Sports",
    image: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=600",
    description: "Fitness gear and sports essentials.",
  },
  {
    name: "Kids",
    image: "https://images.unsplash.com/photo-1603316040640-3a5c6f67ff9b?w=600",
    description: "Fun toys and baby care products.",
  },
];

const Category = () => {
  // Duplicate array for infinite loop effect
  const seamlessList = [...categories, ...categories];

  return (
    <div className="relative hidden lg:flex overflow-hidden border-b border-[#bbb6b6] lg:pt-5 pt-3 lg:pb-4 pb-2 bg-white">
      {/* Outer track */}
      <div className="flex whitespace-nowrap animate-marquee">
        {seamlessList.map((category, index) => (
          <div
            key={index}
            className="lg:min-w-[145px] lg:w-[100px] w-[45px] flex justify-center mx-4 flex-shrink-0"
          >
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
