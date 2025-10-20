import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import AddressCard from "./AddressCard";
import AddIcon from "@mui/icons-material/Add";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", lg: 500 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: { xs: 2, lg: 4 },
  borderRadius: "8px",
};

const paymentGatewayList = [
  {
    value: "RAZORPAY",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg",
  },
  {
    value: "STRIPE",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/800px-Stripe_Logo%2C_revised_2016.svg.png",
  },
];

const Checkout = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [paymentGateway, setPaymentGateway] = useState("RAZORPAY");

  const handleChangePaymentGateway = (e) => {
    setPaymentGateway(e.target.value);
  };

  return (
    <>
      <div className="lg:pt-12 pt-6 px-4 sm:px-10 md:px-14 pb-[60px] lg:pb-[100px]">
        <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">
          <div className="col-span-2 space-y-5">
            <div className="flex justify-between items-start">
              <h1 className="font-semibold text-[14px] lg:text-[18px]">
                Select Address
              </h1>
              <Button
                sx={{
                  fontSize: { xs: 10, md: 13 },
                  textTransform: "capitalize",
                  color: "black",
                }}
                onClick={handleOpen}
              >
                <AddIcon sx={{ fontSize: { xs: 12, md: 18 } }} />
                <span className="font-medium ml-0.5"> Add new Address</span>
              </Button>
            </div>

            <div className="lg:text-sm text-[14px] font-medium space-y-2 lg:space-y-4">
              <p>Saved Addresses</p>
              <div className="lg:space-y-3 space-y-2">
                {[1, 1, 1].map((elem, index) => (
                  <AddressCard key={index} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="py-5 px-5 rounded-md border border-gray-300 mb-4">
              <FormControl fullWidth>
                <h1 className="font-medium text-center mb-4 lg:text-[16px] text-[14px] ">
                  Choose Payment Gateway
                </h1>
                <RadioGroup
                  row
                  value={paymentGateway}
                  onChange={handleChangePaymentGateway}
                  className="flex  gap-1 justify-between pr-0 w-full"
                >
                  {paymentGatewayList.map((elem) => (
                    <div className="border flex-1 w-full !mr-0 border-gray-300 pl-3 pr-2 rounded-md">
                      <FormControlLabel
                        key={elem.value}
                        value={elem.value}
                        control={<Radio />}
                        label={
                          <img
                            className={`${
                              elem.value === "STRIPE" ? "w-14" : ""
                            } object-cover`}
                            src={elem.image}
                            alt={elem.value}
                          />
                        }
                      />
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            </div>

            <div className="border border-gray-300 rounded-md">
              <PricingCard />

              <div className="px-5 py-3">
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    py: "8px",
                    textTransform: "capitalize",
                    background: "black",
                  }}
                >
                  <span className="font-medium"> checkout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddressForm paymentGateway={paymentGateway} />
        </Box>
      </Modal>
    </>
  );
};

export default Checkout;
