import React, { useState } from "react";
import SellerAccountForm from "./SellerAccountForm";
import { Button } from "@mui/material";

const BecomeSeller = () => {
  return (
    <>
      <div className="flex justify-center h-[100vh] items-center">
        <div
          className={`py-8 md:w-[600px] w-full rounded-md px-4 lg:px-5 shadow`}
        >
          <SellerAccountForm />
        </div>
      </div>
    </>
  );
};

export default BecomeSeller;
