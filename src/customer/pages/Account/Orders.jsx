import React, { useEffect } from "react";
import OrderItem from "./OrderItem";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../../store/customer/orderSlice";
import NoOrders from "./NoOrders";
import { Box, Skeleton } from "@mui/material";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, ordersLoading, ordersError } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <div className="text-sm">
      {!ordersLoading && orders && orders.length > 0 && (
        <div className="pb-5">
          <h1 className="font-semibold">All Orders</h1>
          <p className="capitalize">from anytime</p>
        </div>
      )}

      {ordersLoading || orders === null ? (
        <div className="space-y-4">
          <OrderSkeleton />
          <OrderSkeleton />
        </div>
      ) : orders?.length === 0 ? (
        <NoOrders />
      ) : (
        <div className="space-y-4">
          {orders?.map((order) => (
            <div
              key={order.id}
              className="border border-[#d5d5d5] p-3 rounded-md"
            >
              <h2 className="font-semibold">Order #{order.id}</h2>
              <p className="text-[14px]">Total: ₹{order.finalAmount}</p>
              <p className="text-[14px] mb-2">Items:</p>

              <div className="space-y-2">
                {order.orderItems?.map((item) => (
                  <OrderItem
                    key={item.id}
                    item={item}
                    orderId={order?.id}
                    deliveryDate={order?.deliverDateTime}
                    businessName={order?.seller?.businessDetails?.businessName}
                    status={order.orderStatus}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const OrderSkeleton = () => {
  return (
    <Box
      sx={{
        border: "1px solid #d5d5d5",
        p: 2,
        borderRadius: "6px",
        mb: 2,
      }}
    >
      <Skeleton variant="rectangular" width={130} height={16} sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" width={100} height={14} sx={{ mb: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Skeleton variant="rectangular" width={80} height={12} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" width={120} height={12} />
      </Box>

      <Box sx={{ mt: 2 }}>
        <OrderItemSkeleton />
      </Box>
    </Box>
  );
};

const OrderItemSkeleton = () => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        p: 2,
        border: "1px solid #d1d1d1",
        borderRadius: "6px",
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />

        <Box>
          <Skeleton
            variant="rectangular"
            width={100}
            height={12}
            sx={{ mb: 1 }}
          />
          <Skeleton variant="rectangular" width={140} height={12} />
        </Box>
      </Box>

      <Box
        sx={{
          mt: 2,
          p: 2,
          bgcolor: "#f1f1f1",
          display: "flex",
          gap: 2,
          borderRadius: "4px",
        }}
      >
        <Skeleton variant="rectangular" width={90} height={110} />

        <Box sx={{ flexGrow: 1 }}>
          <Skeleton
            variant="rectangular"
            width="60%"
            height={14}
            sx={{ mb: 1 }}
          />
          <Skeleton
            variant="rectangular"
            width="75%"
            height={14}
            sx={{ mb: 1 }}
          />
          <Skeleton variant="rectangular" width="40%" height={14} />
        </Box>
      </Box>
    </Box>
  );
};

export default Orders;
