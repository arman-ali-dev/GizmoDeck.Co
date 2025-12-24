import React from "react";
import menImage from "../../../../assets/men.jpeg";
import shoesImage from "../../../../assets/shoes.jpg";
import men2Image from "../../../../assets/men-2.avif";
import bagImage from "../../../../assets/bag.jpg";
import jwelleryImage from "../../../../assets/jwellery.jpeg";
import slipperImage from "../../../../assets/slipper.jpeg";

const CategoryGrid = () => {
  return (
    <>
      <div className="grid grid-cols-12 grid-rows-12 xl:gap-2 gap-2 md:h-[600px] h-[530px] px-4 lg:px-12  xl:px-12 lg:pt-10 pt-4 xl:pb-4 pb-6">
        <div className="lg:col-span-3 col-span-4 row-span-12">
          <img
            className="h-full w-full object-cover object-top rounded-md"
            src={menImage}
            alt=""
          />
        </div>

        <div className="lg:col-span-2 col-span-4 lg:row-span-6 row-span-4">
          <img
            className="h-full w-full  object-cover object-top rounded-md"
            src={shoesImage}
            alt=""
          />
        </div>

        <div className="col-span-4 lg:row-span-6 row-span-4">
          <img
            className="h-full w-full  object-cover object-top rounded-md"
            src={men2Image}
            alt=""
          />
        </div>

        <div className="lg:col-span-3 col-span-8 lg:row-span-12 row-span-4">
          <img
            className="h-full w-full  object-cover lg:object-bottom object-center rounded-md"
            src={bagImage}
            alt=""
          />
        </div>

        <div className="col-span-4 lg:row-span-6 row-span-4">
          <img
            className="h-full w-full  object-cover object-center rounded-md"
            src={jwelleryImage}
            alt=""
          />
        </div>

        <div className="lg:col-span-2 col-span-4 lg:row-span-6 row-span-4">
          <img
            className="h-full  w-full object-cover object-top rounded-md"
            src={slipperImage}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default CategoryGrid;
