import React from "react";
import { Radio } from "@mui/material";

const AddressCard = ({ address, selectedAddressId, setSelectedAddressId }) => {
  const handleChange = () => {
    setSelectedAddressId(address.id);
  };
  return (
    <>
      <div
        className={`lg:p-5 p-2 border rounded-md flex cursor-pointer ${
          selectedAddressId === address.id ? "border-black" : "border-gray-300"
        }`}
        onClick={handleChange}
      >
        <div>
          <Radio
            checked={selectedAddressId === address.id}
            onChange={handleChange}
            value={address?.id}
            name="selectedAddress"
            sx={{
              color: "black",
              "&.Mui-checked": {
                color: "black",
              },
            }}
          />
        </div>

        <div className="lg:space-y-3 space-y-2 pt-2.5">
          <h1 className="mb-0"> {address?.name}</h1>
          <p>
            {address?.address}, {address?.locality}, {address?.city},
            {address?.state} - {address?.pincode}
          </p>
          <p>
            <strong>Mobile No. : </strong>
            {address?.phoneNumber}
          </p>
        </div>
      </div>
    </>
  );
};

export default AddressCard;
