import React, { useState } from "react";
import SellerAccountForm from "./SellerAccountForm";
import SellerLoginForm from "./SellerLoginForm";
import { Button } from "@mui/material";

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleShowPage = () => {
    setIsLogin(!isLogin);
  };
  return (
    <>
      <div className="flex justify-center h-[100vh] items-center">
        <div
          className={`py-8 ${
            isLogin ? "md:w-[450px]" : "md:w-[550px]"
          }  w-full rounded-md px-4 lg:px-5 shadow`}
        >
          {isLogin ? <SellerLoginForm /> : <SellerAccountForm />}

          <div className="mt-10 space-y-2">
            <h1 className="text-center lg:text-sm text-[12px] font-medium">
              {" "}
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </h1>
            <Button
              onClick={handleShowPage}
              sx={{
                py: { xs: "8px", md: "11px" },
                color: "#000",
                borderColor: "#000",
                textTransform: "capitalize",
              }}
              variant="outlined"
              fullWidth
            >
              <span className="font-medium lg:text-[14px] text-[13px]">
                {isLogin ? "Register" : "Login"}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeSeller;
