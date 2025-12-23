import React from "react";

const CategoryGrid = () => {
  return (
    <>
      <div className="grid grid-cols-12 grid-rows-12 xl:gap-2 gap-2 md:h-[600px] h-[530px] px-4 lg:px-12  xl:px-12 lg:pt-10 pt-4 xl:pb-4 pb-6">
        <div className="lg:col-span-3 col-span-4 row-span-12">
          <img
            className="h-full w-full object-cover object-top rounded-md"
            src="https://rukminim2.flixcart.com/image/832/832/xif0q/kurta/8/g/p/m-jf-short-krt-man-blk-jagrutifashion-original-imahfygavpdypzgz.jpeg?q=70&crop=false"
            alt=""
          />
        </div>

        <div className="lg:col-span-2 col-span-4 lg:row-span-6 row-span-4">
          <img
            className="h-full w-full  object-cover object-top rounded-md"
            src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/27866276/2024/2/26/30fa540f-d22b-4738-aa6b-6c8475c643171708938616445RoadsterCasualBootsForMen1.jpg"
            alt=""
          />
        </div>

        <div className="col-span-4 lg:row-span-6 row-span-4">
          <img
            className="h-full w-full  object-cover object-top rounded-md"
            src="https://img.freepik.com/free-photo/close-up-photo-young-successful-business-man-black-suit_171337-9509.jpg?t=st=1760089282~exp=1760092882~hmac=a4928e0d01c73fd2464fd13f62f3e0db492b3a8f4d2a8332d5d6459eef88a8d8&w=740"
            alt=""
          />
        </div>

        <div className="lg:col-span-3 col-span-8 lg:row-span-12 row-span-4">
          <img
            className="h-full w-full  object-cover lg:object-bottom object-center rounded-md"
            src="https://pikaso.cdnpk.net/private/production/2525366177/conversions/render-preview.jpg?token=exp=1783900800~hmac=b7b0dd6468cd74bf7f7e18520c39e1d89bdb40531a26286c331de2d5d40a0301"
            alt=""
          />
        </div>

        <div className="col-span-4 lg:row-span-6 row-span-4">
          <img
            className="h-full w-full  object-cover object-center rounded-md"
            src="https://rukminim2.flixcart.com/image/832/832/k0wqwsw0/jewellery-set/e/x/8/dvtjns-01chokr-bk-divastri-original-imafkhswngqxgfph.jpeg?q=70&crop=false"
            alt=""
          />
        </div>

        <div className="lg:col-span-2 col-span-4 lg:row-span-6 row-span-4">
          <img
            className="h-full  w-full object-cover object-top rounded-md"
            src="https://rukminim2.flixcart.com/image/832/832/xif0q/slipper-flip-flop/1/u/t/7-7-v-sape-black-lepar-men-3498-glossy-black-original-imahgf9ftsqcmzay.jpeg?q=70&crop=false"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default CategoryGrid;
