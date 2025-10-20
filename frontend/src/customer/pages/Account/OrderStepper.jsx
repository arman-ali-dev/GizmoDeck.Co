import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const steps = [
  {
    name: "Order Placed",
    description: "on Thu, 11 Jul",
    value: "PLACED",
  },
  {
    name: "Packed",
    description: "Item Packed in Dispatch Warehouse",
    value: "CONFIRMED",
  },
  {
    name: "Shipped",
    description: "by Mon, 16 Jul",
    value: "SHIPPED",
  },
  {
    name: "Arriving",
    description: "by 16 Jul - 18 Jul",
    value: "ARRIVING",
  },
  {
    name: "Arrived",
    description: "by 16 Jul - 18 Jul",
    value: "DELIVERED",
  },
];
const currentStep = 1;

const OrderStepper = ({ orderStatus }) => {
  const [statusStep, setStatusStep] = useState(steps);

  useEffect(() => {
    if (orderStatus == "CANCELED") {
      setStatusStep(canceledStep);
    } else {
      setStatusStep(steps);
    }
  }, [orderStatus]);

  return (
    <>
      <Box className="my-10">
        {statusStep.map((step, index) => (
          <div key={index} className="flex px-4">
            <div className="flex flex-col items-center">
              <Box
                sx={{ zIndex: -1 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? "bg-gray-200 text-black"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {step.value === orderStatus ? (
                  <CheckCircleIcon />
                ) : (
                  <FiberManualRecordIcon sx={{ zIndex: -1 }} />
                )}
              </Box>

              {index < statusStep.length - 1 && (
                <div
                  className={`h-20 w-[1.5px] ${
                    index < currentStep ? "bg-black" : "bg-gray-400"
                  }`}
                ></div>
              )}
            </div>

            <div className="ml-2 w-full">
              <div
                className={`${
                  step.value === orderStatus
                    ? "bg-[#000] py-2 px-3 text-white font-medium rounded-md -translate-y-3"
                    : ""
                } ${orderStatus === "CANCELED" ? "bg-red-500" : ""} w-full`}
              >
                <p className="text-[15px]">{step.name}</p>

                <p
                  className={`${
                    step.value === orderStatus
                      ? "text-gray-200"
                      : "text-gray-500"
                  } text-[14px]`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Box>
    </>
  );
};

export default OrderStepper;
