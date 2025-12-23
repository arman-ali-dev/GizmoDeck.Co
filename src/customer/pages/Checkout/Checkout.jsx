import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddressCard from "./AddressCard";
import AddIcon from "@mui/icons-material/Add";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  checkoutOrder,
  directOrderCheckout,
} from "../../../store/customer/orderSlice";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import {
  clearProductDetails,
  fetchProductDetails,
} from "../../../store/customer/productSlice";
import { Skeleton } from "@mui/material";

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

const Checkout = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const address = useSelector((state) => state.address);
  const orderSlice = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(address?.loading, orderSlice?.loading);

  // Direct Order

  const [searchParams] = useSearchParams();

  const productId = searchParams.get("productId");
  const variantId = searchParams.get("variantId");
  const qty = searchParams.get("qty");

  const isBuyNow = productId && variantId && qty;

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }

    return () => {
      dispatch(clearProductDetails());
    };
  }, [dispatch, productId, variantId, qty]);

  const { productDetails } = useSelector((state) => state.product);
  const selectedVariant = productDetails?.variants?.find(
    (v) => v.id == variantId
  );

  const handleCheckout = async () => {
    if (!selectedAddressId) {
      return toast.error("Please select an address!", { autoClose: 1500 });
    }

    let res;

    if (isBuyNow) {
      // BUY NOW FLOW
      res = await dispatch(
        directOrderCheckout({
          productId,
          variantId,
          quantity: qty,
          addressId: selectedAddressId,
        })
      );
    } else {
      // NORMAL CART CHECKOUT
      res = await dispatch(checkoutOrder(selectedAddressId));
    }

    if (res && res.payload?.sessionUrl) {
      window.location.href = res.payload.sessionUrl;
    }
  };

  return (
    <>
      {address?.loading ? (
        <CheckoutSkeleton />
      ) : (
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
                  {address?.addresses?.map((a, index) => (
                    <AddressCard
                      selectedAddressId={selectedAddressId}
                      setSelectedAddressId={setSelectedAddressId}
                      address={a}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="py-5 px-5 rounded-md border border-gray-300 mb-4">
                <FormControl fullWidth>
                  <h1 className="font-medium text-center mb-4 lg:text-[16px] text-[14px] ">
                    Choose Payment Gateway
                  </h1>
                  <RadioGroup
                    row
                    value={"RAZORPAY"}
                    className="flex  gap-1 justify-between pr-0 w-full"
                  >
                    <div className="border flex-1 w-full !mr-0 border-gray-300 pl-3 pr-2 rounded-md">
                      <FormControlLabel
                        value="RAZORPAY"
                        className="w-[140px]"
                        control={
                          <Radio
                            sx={{
                              color: "black",
                              "&.Mui-checked": {
                                color: "black",
                              },
                            }}
                          />
                        }
                        label={
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                            alt="RAZORPAY"
                          />
                        }
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="border border-gray-300 rounded-md">
                {isBuyNow ? (
                  <div className="p-4">
                    <h2 className="font-semibold mb-2 text-lg">
                      Order Summary
                    </h2>

                    <div className="flex gap-3 items-start">
                      <div>
                        <img
                          src={selectedVariant?.images[0]}
                          className="w-[100px] h-[120px] rounded-sm"
                          alt=""
                        />
                      </div>
                      <div className=" space-y-1.5 text-[15px]">
                        <p>
                          <strong>Product:</strong>{" "}
                          {productDetails?.name
                            ?.split(" ")
                            .slice(0, 2)
                            .join(" ") +
                            (productDetails?.name?.split(" ").length > 2
                              ? "..."
                              : "")}
                        </p>
                        <p>
                          <strong>Size:</strong> {selectedVariant?.size}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {qty}
                        </p>
                        <p>
                          <strong>Price:</strong> ₹
                          {selectedVariant?.sellingPrice}
                        </p>
                      </div>
                    </div>
                    <br />
                    <hr />

                    <Divider />
                    <div className="font-semibold space-y-3 py-3 px-5">
                      <div className="flex justify-between items-center lg:text-[16px] text-[14px]">
                        <span>Total</span>
                        <span>₹{qty * selectedVariant?.sellingPrice}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <PricingCard />
                )}

                <div className="px-5 py-3">
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleCheckout}
                    disabled={orderSlice?.loading}
                    sx={{
                      py: "8px",
                      textTransform: "capitalize",
                      background: "black",
                      height: "40px",
                    }}
                  >
                    {orderSlice?.loading ? (
                      <CircularProgress color="white" size={14} />
                    ) : (
                      <span className="font-medium"> checkout</span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddressForm handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

const AddressCardSkeleton = () => {
  return (
    <div className="border-gray-300 border rounded-md p-3 lg:p-5 flex gap-3">
      <Skeleton variant="circular" width={24} height={24} />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="text" width="80%" height={16} />
        <Skeleton variant="text" width="60%" height={16} />
      </div>
    </div>
  );
};

const PaymentGatewaySkeleton = () => {
  return (
    <div className="py-5 px-5 rounded-md border border-gray-300 mb-4">
      <Skeleton
        variant="text"
        width="60%"
        height={22}
        className="mx-auto mb-4"
      />
      <Skeleton variant="rectangular" height={50} className="rounded-md" />
    </div>
  );
};

const PricingCardSkeleton = () => {
  return (
    <div className="border border-gray-300 rounded-md p-5 space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex justify-between items-center">
          <Skeleton variant="text" width="40%" height={20} />
          <Skeleton variant="text" width="20%" height={20} />
        </div>
      ))}
      <Divider />
      <div className="flex justify-between items-center pt-2">
        <Skeleton variant="text" width="35%" height={24} />
        <Skeleton variant="text" width="25%" height={24} />
      </div>
      <Skeleton variant="rectangular" height={40} className="rounded-md mt-3" />
    </div>
  );
};

const CheckoutSkeleton = () => {
  return (
    <div className="lg:pt-12 pt-6 px-4 sm:px-10 md:px-14 pb-[60px] lg:pb-[100px]">
      <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">
        <div className="col-span-2 space-y-5">
          <div className="flex justify-between items-start">
            <Skeleton variant="text" width={160} height={28} />
            <Skeleton
              variant="rectangular"
              width={140}
              height={36}
              className="rounded-md"
            />
          </div>

          <div className="space-y-3">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <AddressCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-1 space-y-5">
          <PaymentGatewaySkeleton />
          <PricingCardSkeleton />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
