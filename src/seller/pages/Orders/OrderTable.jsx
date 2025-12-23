import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Skeleton,
  Pagination,
  Box,
  Modal,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSellerOrders,
  updateOrderStatus,
} from "../../../store/seller/orderSlice";
import { toast } from "react-toastify";

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
  const { orders, loading, error, updateStatusLoading } = useSelector(
    (state) => state.sellerOrder
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) dispatch(fetchSellerOrders());
  }, [dispatch]);

  const [page, setPage] = useState(1);
  const rowsPerPage = 7;

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedOrders = orders?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(orders?.length / rowsPerPage) || 1;

  // Update Order Status

  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(null);

  const handleOpenStatusModal = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenStatusModal(true);
  };

  const handleCloseStatusModal = (orderId) => {
    setSelectedOrderId(null);
    setOpenStatusModal(false);
  };

  const handleStatusUpdate = async (status) => {
    setLoadingStatus(status); // start loading

    const res = await dispatch(
      updateOrderStatus({ orderId: selectedOrderId, status })
    );

    setLoadingStatus(null); // stop loading

    if (updateOrderStatus.fulfilled.match(res)) {
      toast.success("Status updated successfully!", { autoClose: 1000 });
    } else {
      toast.error("Failed to update status", { autoClose: 1000 });
    }

    handleCloseStatusModal();
  };

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
                "Product",
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
                    header == "Product" || header == "Order ID"
                      ? "left"
                      : "right"
                  }
                >
                  {header}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading &&
              Array.from(new Array(5)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="rectangular" width={40} height={40} />
                  </TableCell>

                  <TableCell>
                    <Skeleton variant="text" width="90%" height={80} />
                  </TableCell>

                  <TableCell>
                    <Skeleton variant="text" width="100%" />
                  </TableCell>

                  <TableCell align="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Skeleton variant="rectangular" width={60} height={30} />
                    </Box>
                  </TableCell>

                  <TableCell align="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Skeleton variant="rectangular" width={60} height={30} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}

            {!loading &&
              !error &&
              paginatedOrders?.map((order) => (
                <StyledTableRow key={order?.id}>
                  {/* ORDER ID */}
                  <StyledTableCell>{order?.id}</StyledTableCell>

                  {/* PRODUCTS LIST */}
                  <StyledTableCell>
                    <div className="flex flex-col gap-3">
                      {order?.orderItems?.map((item) => (
                        <div key={item.id} className="flex gap-2 items-center">
                          <img
                            className="w-12 h-16 md:w-20 md:h-24 rounded-md object-cover"
                            src={item.variant?.images[0]}
                            alt={item.product?.title}
                          />

                          <div className="flex flex-col text-xs md:text-sm">
                            <span>{item.product?.title}</span>
                            <span>₹{item.variant?.sellingPrice}</span>
                            <span>{item.variant?.color}</span>
                            <span>Qty: {item.quantity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </StyledTableCell>

                  {/* SHIPPING ADDRESS */}
                  <StyledTableCell align="right">
                    <div className="flex flex-col gap-1 text-xs md:text-sm">
                      <span>{order?.address?.name}</span>
                      <span>{order?.address?.address}</span>
                      <span>{order?.address?.state}</span>
                      <span>
                        <strong>Mobile:</strong> {order?.address?.phoneNumber}
                      </span>
                    </div>
                  </StyledTableCell>

                  {/* STATUS */}
                  <StyledTableCell align="right">
                    <span
                      className="px-2 py-1 text-xs md:text-sm border rounded-full"
                      style={{ borderColor: "#00927c", color: "#00927c" }}
                    >
                      {order?.orderStatus}
                    </span>
                  </StyledTableCell>

                  {/* UPDATE BUTTON */}
                  <StyledTableCell align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleOpenStatusModal(order.id)}
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

            {!loading && !error && orders?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="mt-10 flex justify-center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </div>

      <p className="text-xs text-gray-500 text-center mt-2 lg:hidden">
        Scroll horizontally to see full table →
      </p>

      <Modal
        keepMounted
        open={openStatusModal}
        onClose={handleCloseStatusModal}
        aria-labelledby="status-modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 3,
            boxShadow: 6,
          }}
        >
          <Typography id="status-modal-title" variant="h6" mb={2}>
            Update Order Status
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {[
              "CONFIRMED",
              "SHIPPED",
              "OUT_FOR_DELIVERY",
              "DELIVERED",
              "RETURNED",
              "REFUNDED",
            ].map((status) => (
              <Button
                key={status}
                variant="contained"
                disabled={loadingStatus === status}
                onClick={() => handleStatusUpdate(status)}
                sx={{
                  textTransform: "none",
                  justifyContent: "flex-start",
                  bgcolor: "#000",
                  "&:hover": { bgcolor: "#333" },
                }}
              >
                {loadingStatus === status
                  ? "Updating..."
                  : status.replaceAll("_", " ")}
              </Button>
            ))}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
