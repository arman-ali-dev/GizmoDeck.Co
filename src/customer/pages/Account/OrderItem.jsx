import { Avatar } from "@mui/material";
import React from "react";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const OrderItem = ({ item, status, deliveryDate, orderId, businessName }) => {
  const navigate = useNavigate();
  const formattedDate = new Date(deliveryDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  

  return (
    <>
      <div
        onClick={() => navigate(`/account/order/${orderId}/${item?.id}`)}
        className="text-sm bg-white lg:p-5 p-3 space-y-4 border border-gray-300 rounded-md cursor-pointer"
      >
        <div className="flex items-center gap-2 lg:gap-3">
          <div>
            <Avatar
              sizes="small"
              sx={{
                bgcolor: "#000",
                height: { xs: 34, md: 38 },
                width: { xs: 34, md: 38 },
              }}
            >
              <ElectricBoltIcon sx={{ fontSize: { xs: 18, md: 22 } }} />
            </Avatar>
          </div>

          <div>
            <h1 className="font-bold mt-0.5 lg:mt-0 text-[#000] text-[12px] lg:text-[14px]">
              {status}
            </h1>
            <p className="font-medium text-gray-500 text-[12px] lg:text-[14px]">
              Arriving By {formattedDate}
            </p>
          </div>
        </div>

        <div className="lg:p-5 p-3 bg-teal-50 gap-3 flex">
          <div>
            <img
              className="w-[90px] h-[110px] object-cover rounded-sm"
              src={item?.variant?.images[0]}
              alt=""
            />
          </div>

          <div className="w-full space-y-1">
            <h1 className="font-bold lg:text-[16px] text-[12px]">
              {businessName}
            </h1>
            <p className="lg:text-[16px] text-[11px]">{item?.product?.name}</p>
            <p className="lg:text-[16px] text-[11px]">
              <strong>Size: </strong> {item?.variant?.size}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
