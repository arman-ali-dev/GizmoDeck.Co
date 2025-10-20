import React from "react";
import AddressCard from "./AddressCard";

const Address = () => {
  return (
    <>
      <div className="space-y-3">
        {[1, 1, 1, 1].map((elem) => (
          <AddressCard />
        ))}
      </div>
    </>
  );
};

export default Address;
