import React from "react";

const Details = ({ specifications, description }) => {
  return (
    <div class="bg-gray-100  mt-5 lg:px-6 px-4 py-4 rounded-2xl">
      <h2 class="font-semibold lg:text-[16px] text-[13px] ">Product Details</h2>

      <div class="grid lg:grid-cols-3 grid-cols-1 mt-2 gap-7">
        <div class="col-span-1">
          <h3 class="lg:text-[15px] text-[12px] font-medium">Specifications</h3>
          <ul className="mt-2 text-[12px] space-y-2.5 font-medium text-[#757575]">
            {Object.entries(specifications ?? {}).map(([key, value]) => (
              <li key={key} className="flex justify-between border-b pb-1">
                <span>{key}:</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div class="lg:col-span-2">
          <h3 class="lg:text-[15px] text-[12px]  font-medium">Description</h3>
          <p class="mt-2 lg:text-[15px] text-[12px] ">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
