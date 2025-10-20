import React from "react";

const AddressCard = () => {
  return (
    <>
      <div className="lg:p-5 p-3 border border-gray-300 rounded-md flex">
        <div className="lg:space-y-3 space-y-1.5 lg:pt-3">
          <h1 className="font-bold lg:text-[16px] text-[12px]">Arman</h1>
          <p className="lg:text-[16px] text-[12px]">
            Ambavadi choke, Banglore, Banglore, Karnataka - 530068
          </p>
          <p className="lg:text-[16px] text-[12px]">
            <strong>Mobile No. : </strong>
            7665407031
          </p>
        </div>
      </div>
    </>
  );
};

export default AddressCard;
