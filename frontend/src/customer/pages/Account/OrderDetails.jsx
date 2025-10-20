import { Box, Button, Divider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import PaymentsIcon from "@mui/icons-material/Payments";

const OrderDetails = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box>
        <section className="flex flex-col gap-5 justify-center items-center">
          <img
            className="w-[100px] rounded-md"
            src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/27194384/2024/1/25/d7fa9bec-c18e-40cb-89bf-d10c5316a4631706177408966GIORDANOMenEmbellishedDialStainlessSteelBraceletStyleStrapsA1.jpg"
            alt=""
          />
          <div className="text-sm space-y-1 text-center">
            <h1 className="font-bold">Ram Clothing</h1>
            <p>
              Men Embellished & Bracelet Style Straps Analogue Multi Function
              Watch GZ-50085-44 Watch GZ-50085-44 Watch GZ-50085-44 Watch
              GZ-50085-44
            </p>
            <p>
              <strong>Size: </strong>M
            </p>
          </div>
          <div>
            <Button
              variant="contained"
              sx={{ color: "#fff", background: "#000", px: 4 }}
              onClick={() => navigate("/reviews/5/create")}
            >
              <span className="font-medium capitalize"> Write Review</span>
            </Button>
          </div>
        </section>
      </Box>

      <section className="border mt-4 p-5 border-gray-300 rounded-md">
        <OrderStepper orderStatus={"CONFIRMED"} />
      </section>

      <section className="pt-5">
        <div className="border border-gray-300 p-5">
          <h1 className="font-bold pb-3">Delivery Address</h1>
          <div className="text-sm space-y-2">
            <div className="flex gap-5 font-medium">
              <p>Armaan</p>
              <Divider flexItem orientation="vertical" />
              <p>7665407031</p>
            </div>

            <p>Ambavadi choke, Banglore, Karnataka - 530068</p>
          </div>
        </div>

        <div className="border space-y-4 border-gray-300 mt-5">
          <div className="flex justify-between text-sm pt-5 px-5">
            <div className="space-y-1">
              <p className="font-bold">Total Item Price</p>
              <p>
                You Saved{" "}
                <span className="text-green-500 font-medium text-xs">
                  ₹699.00
                </span>{" "}
                on this item
              </p>
            </div>

            <p className="font-medium">₹799</p>
          </div>

          <div className="px-5">
            <div className="bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3">
              <PaymentsIcon sx={{ fontSize: "18px" }} />
              <p>Pay On Delivery</p>
            </div>
          </div>

          <Divider />
          <div className="px-5 py-5">
            <p className="text-xs">
              <strong>Sold By: </strong> Ram Clothing
            </p>
          </div>

          <div className="p-10">
            <Button
              // disabled={true}
              color="error"
              sx={{ py: "0.7rem", textTransform: "capitalize" }}
              className=""
              variant="outlined"
              fullWidth
            >
              {" "}
              {false ? "order canceled" : "cancel order"}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderDetails;
