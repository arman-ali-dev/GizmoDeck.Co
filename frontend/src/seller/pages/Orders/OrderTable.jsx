import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const StyledTableCell = (props) => (
  <TableCell
    sx={{
      fontSize: { xs: "12px", md: "14px" },
      padding: { xs: "6px 8px", md: "12px 16px" },
    }}
    {...props}
  />
);

const StyledTableRow = (props) => <TableRow {...props} />;

export default function OrderTable() {
  const orders = [
    {
      id: "#1001",
      product: {
        title: "Classic Cotton Shirt",
        price: 899,
        color: "Blue",
        image:
          "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/31101834/2024/12/26/bb7963ed-a03b-41ad-8b79-01354822587e1735204642505-Aeropostale-Men-Tshirts-961735204641834-1.jpg",
      },
      shipping: {
        name: "Arman Ali",
        address: "123 MG Road, Lucknow",
        state: "Uttar Pradesh - 226001",
        mobile: "9876543210",
      },
      status: "Delivered",
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <TableContainer
        component={Paper}
        className="shadow-md rounded-xl overflow-hidden"
      >
        <Table
          sx={{
            minWidth: { xs: 500, md: 700 },
            "& td, & th": { whiteSpace: "nowrap" },
          }}
          aria-label="responsive order table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#000" }}>
              {[
                "Order ID",
                "Products",
                "Shipping Address",
                "Order Status",
                "Update",
              ].map((header) => (
                <StyledTableCell
                  key={header}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: { xs: "11px", md: "14px" },
                  }}
                  align={
                    header !== "Order ID" && header !== "Products"
                      ? "right"
                      : "left"
                  }
                >
                  {header}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <StyledTableRow key={order.id}>
                <StyledTableCell>{order.id}</StyledTableCell>
                <StyledTableCell>
                  <div className="flex gap-1 flex-wrap items-center">
                    <img
                      className="w-12 h-16 md:w-20 md:h-24 rounded-md object-cover"
                      src={order.product.image}
                      alt={order.product.title}
                    />
                    <div className="flex flex-col justify-between text-xs md:text-sm">
                      <span>{order.product.title}</span>
                      <span>₹{order.product.price}</span>
                      <span>{order.product.color}</span>
                    </div>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div className="flex flex-col gap-1 text-xs md:text-sm">
                    <span>{order.shipping.name}</span>
                    <span>{order.shipping.address}</span>
                    <span>{order.shipping.state}</span>
                    <span>
                      <strong>Mobile:</strong> {order.shipping.mobile}
                    </span>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <span
                    className="px-2 py-1 text-xs md:text-sm border rounded-full"
                    style={{ borderColor: "#00927c", color: "#00927c" }}
                  >
                    {order.status}
                  </span>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      fontSize: { xs: "10px", md: "13px" },
                      borderColor: "#000",
                      color: "#000",
                      "&:hover": { backgroundColor: "#000", color: "#fff" },
                    }}
                  >
                    Status
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <p className="text-xs text-gray-500 text-center mt-2 lg:hidden">
        Scroll horizontally to see full table →
      </p>
    </div>
  );
}
