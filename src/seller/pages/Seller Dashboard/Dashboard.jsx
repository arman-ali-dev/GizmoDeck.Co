import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { fetchSellerDashboard } from "../../../store/seller/sellerDashboardSlice";

export default function SellerRevenueChart() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) dispatch(fetchSellerDashboard());
  }, [dispatch]);

  const { dashboard } = useSelector((state) => state.sellerDashboard);
  console.log("dashboard", dashboard);

  // Convert backend data → recharts data
  const graphData =
    dashboard?.revenueGraph?.map((item) => ({
      name: item.month,
      revenue: item.revenue,
    })) || [];

  console.log("graphData", graphData);

  return (
    <LineChart
      style={{
        width: "100%",
        maxWidth: "100%",
        height: "100%",
        maxHeight: "80vh",
        aspectRatio: 1.618,
        marginTop: 10,
      }}
      responsive
      data={graphData}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />

      {/* Actual revenue line */}
      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#8884d8"
        activeDot={{ r: 6 }}
      />
    </LineChart>
  );
}
