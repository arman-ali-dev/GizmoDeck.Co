import React from "react";
import { Radio } from "@mui/material";

const AddressCard = () => {
  const handleChange = () => {};

  return (
    <>
      <div className="lg:p-5 p-2 border border-gray-300 rounded-md flex">
        <div>
          <Radio
            checked={true}
            onChange={handleChange}
            value=""
            name="radio-button"
          />
        </div>

        <div className="lg:space-y-3 space-y-2 pt-2.5">
          <h1 className="mb-0">Arman</h1>
          <p>Ambavadi choke, Banglore, Banglore, Karnataka - 530068</p>
          <p>
            <strong>Mobile No. : </strong>
            7665407031
          </p>
        </div>
      </div>
    </>
  );
};

export default AddressCard;
