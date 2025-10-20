import React from "react";
import OrderItem from "./OrderItem";

const Orders = () => {
  return (
    <>
      <div className="text-sm ">
        <div className="pb-5">
          <h1 className="font-semibold">All Orders</h1>
          <p className="capitalize">from anytime</p>
        </div>

        <div className="space-y-2">
          {[1, 1, 1].map(() => (
            <OrderItem />
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
