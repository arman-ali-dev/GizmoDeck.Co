import React from "react";
import OrderTable from "./OrderTable";

const Orders = () => {
  return (
    <>
      <div>
        <h1 className="font-bold text-xl mb-5">All Orders</h1>
        <OrderTable />
      </div>
    </>
  );
};

export default Orders;
