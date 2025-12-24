import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const steps = [
  { name: "Order Placed", value: "PENDING" },
  { name: "Confirmed", value: "CONFIRMED" },
  { name: "Shipped", value: "SHIPPED" },
  { name: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { name: "Delivered", value: "DELIVERED" },
];

const cancelledSteps = [
  { name: "Order Placed", value: "PENDING" },
  { name: "Order Cancelled", value: "CANCELLED" },
];

const returnedSteps = [
  { name: "Delivered", value: "DELIVERED" },
  { name: "Returned", value: "RETURNED" },
];

const refundedSteps = [
  { name: "Delivered", value: "DELIVERED" },
  { name: "Refunded", value: "REFUNDED" },
];

const OrderStepper = ({ order }) => {
  const { orderStatus, createdAt, estimatedDeliveryDate, deliverDateTime } =
    order || {};

  console.log("order", order);

  const [statusStep, setStatusStep] = useState(steps);

  useEffect(() => {
    if (orderStatus === "CANCELLED") setStatusStep(cancelledSteps);
    else if (orderStatus === "RETURNED") setStatusStep(returnedSteps);
    else if (orderStatus === "REFUNDED") setStatusStep(refundedSteps);
    else setStatusStep(steps);
  }, [orderStatus]);

  const currentStep = statusStep.findIndex((s) => s.value === orderStatus);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getDescription = (step) => {
    switch (step.value) {
      case "PENDING":
        return `on ${formatDate(createdAt)}`;

      case "CONFIRMED":
        return "Seller has confirmed your order";

      case "SHIPPED":
        return "Your order is on the way";

      case "OUT_FOR_DELIVERY":
        return `Arriving today`;

      case "DELIVERED":
        return deliverDateTime
          ? `Delivered on ${formatDate(deliverDateTime)}`
          : `Expected by ${formatDate(estimatedDeliveryDate)}`;

      case "CANCELLED":
        return "Your order has been cancelled";

      case "RETURNED":
        return "Your return has been processed";

      case "REFUNDED":
        return "Refund has been initiated";

      default:
        return "";
    }
  };

  return (
    <Box className="my-10">
      {statusStep.map((step, index) => (
        <div key={index} className="flex px-4">
          <div className="flex flex-col items-center">
            <Box
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {index <= currentStep ? (
                <CheckCircleIcon />
              ) : (
                <FiberManualRecordIcon />
              )}
            </Box>

            {index < statusStep.length - 1 && (
              <div
                className={`h-20 w-[2px] ${
                  index < currentStep ? "bg-black" : "bg-gray-400"
                }`}
              ></div>
            )}
          </div>

          <div className="ml-3 w-full">
            <div
              className={`${
                step.value === orderStatus
                  ? "bg-black py-2 px-3 text-white font-medium rounded-md -translate-y-3"
                  : ""
              } ${
                orderStatus === "CANCELLED" && step.value === "CANCELLED"
                  ? "bg-red-500 text-white"
                  : ""
              } ${
                orderStatus === "RETURNED" && step.value === "RETURNED"
                  ? "bg-yellow-500 text-white"
                  : ""
              } ${
                orderStatus === "REFUNDED" && step.value === "REFUNDED"
                  ? "bg-green-600 text-white"
                  : ""
              } w-full`}
            >
              <p className="text-[15px]">{step.name}</p>

              <p
                className={`${
                  step.value === orderStatus ? "text-gray-200" : "text-gray-500"
                } text-[14px]`}
              >
                {getDescription(step)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Box>
  );
};

export default OrderStepper;
