import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Skeleton,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, getOrderItem } from "../../../store/customer/orderSlice";

const OrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderId, orderItemId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    dispatch(getOrderItem({ orderId, orderItemId }));
  }, [orderId, orderItemId]);

  const { orderItem, orderCancelLoading, orderItemLoading } = useSelector(
    (state) => state.order
  );

  const isCanceled = orderItem?.order?.orderStatus === "CANCELLED";

  const handleCancel = () => {
    dispatch(cancelOrder(orderItem?.order?.id));
  };

  return (
    <>
      {orderItemLoading ? (
        <OrderDetailsSkeleton />
      ) : (
        <>
          <Box>
            <section className="flex flex-col gap-5 justify-center items-center">
              <img
                className="w-[100px] rounded-md"
                src={orderItem?.orderItem?.variant?.images[0]}
                alt=""
              />
              <div className="text-sm space-y-1 text-center">
                <h1 className="font-bold">
                  {orderItem?.order?.seller?.businessDetails?.businessName}
                </h1>
                <p>{orderItem?.orderItem?.product?.description}</p>
                <p>
                  <strong>Size: </strong>
                  {orderItem?.orderItem?.variant?.size}
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
            <OrderStepper order={orderItem?.order} />
          </section>

          <section className="pt-5">
            <div className="border border-gray-300 p-5">
              <h1 className="font-bold pb-3">Delivery Address</h1>
              <div className="text-sm space-y-2">
                <div className="flex gap-5 font-medium">
                  <p>{orderItem?.order?.address?.name}</p>
                  <Divider flexItem orientation="vertical" />
                  <p>{orderItem?.order?.address?.phoneNumber}</p>
                </div>

                <p>
                  {orderItem?.order?.address?.address},{" "}
                  {orderItem?.order?.address?.locality},{" "}
                  {orderItem?.order?.address?.city},{" "}
                  {orderItem?.order?.address?.state} -{" "}
                  {orderItem?.order?.address?.pincode}
                </p>
              </div>
            </div>

            <div className="border space-y-4 border-gray-300 mt-5">
              <div className="flex justify-between text-sm pt-5 px-5">
                <div className="space-y-1">
                  <p className="font-bold">Total Item Price</p>
                  <p>
                    You Saved{" "}
                    <span className="text-green-500 font-medium text-xs">
                      ₹{orderItem?.orderItem?.discount}.00
                    </span>{" "}
                    on this item
                  </p>
                </div>

                <p className="font-medium">
                  ₹{orderItem?.orderItem?.finalAmount}.00
                </p>
              </div>

              <div className="px-5">
                <div className="bg-green-50 px-5 py-2 text-xs font-medium flex items-center gap-3 text-green-700">
                  <PaymentsIcon sx={{ fontSize: "18px" }} />
                  <p>Paid via Stripe</p>
                </div>
              </div>

              <Divider />
              <div className="px-5 py-5">
                <p className="text-xs">
                  <strong>Sold By: </strong>{" "}
                  {orderItem?.order?.seller?.businessDetails?.businessName}
                </p>
              </div>

              <div className="p-10">
                <Button
                  disabled={isCanceled || orderCancelLoading}
                  onClick={handleCancel}
                  color="error"
                  sx={{ py: "0.7rem", textTransform: "capitalize" }}
                  variant={isCanceled ? "contained" : "outlined"}
                  fullWidth
                >
                  {orderCancelLoading ? (
                    <div className="flex items-center gap-2">
                      <CircularProgress color="red" size={14} />
                      Canceling...
                    </div>
                  ) : isCanceled ? (
                    "Order Canceled"
                  ) : (
                    "Cancel Order"
                  )}
                </Button>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

const OrderDetailsSkeleton = () => {
  return (
    <Box className="space-y-6">
      <section className="flex flex-col gap-5 justify-center items-center">
        <Skeleton variant="rectangular" width={100} height={100} />

        <div className="text-sm space-y-2 text-center w-full px-10">
          <Skeleton height={20} width="60%" className="mx-auto" />
          <Skeleton height={16} width="80%" className="mx-auto" />
          <Skeleton height={16} width="40%" className="mx-auto" />
        </div>

        <Skeleton variant="rectangular" width={140} height={40} />
      </section>

      <section className="border mt-4 p-5 border-gray-300 rounded-md space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start gap-4">
            <Skeleton variant="circular" width={32} height={32} />

            <div className="flex-1">
              <Skeleton height={18} width="40%" />
              <Skeleton height={14} width="70%" style={{ marginTop: 4 }} />
            </div>
          </div>
        ))}
      </section>

      <section className="border space-y-4 border-gray-300 mt-5 rounded-md">
        <div className="flex justify-between text-sm pt-5 px-5">
          <div className="space-y-1">
            <Skeleton height={18} width={150} />
            <Skeleton height={14} width={120} />
          </div>
          <Skeleton height={20} width={80} />
        </div>

        <div className="px-5">
          <Skeleton variant="rectangular" height={30} width="50%" />
        </div>

        <Divider />

        <div className="px-5 py-5">
          <Skeleton height={14} width="60%" />
        </div>

        <div className="p-10">
          <Skeleton variant="rectangular" height={45} width="100%" />
        </div>
      </section>
    </Box>
  );
};

export default OrderDetails;
