import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Skeleton,
  Pagination,
  CircularProgress,
  Modal,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteCoupon, fetchCoupons } from "../../../store/admin/couponSlice";
import EditCouponForm from "./EditCouponForm";

const CouponCodeTable = () => {
  const dispatch = useDispatch();
  const { coupons, loading, error, deletingId } = useSelector(
    (state) => state.coupon
  );
  const [openEditModaL, setOpenEditModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 7;

  console.log(coupons);

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedCoupons = coupons?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(coupons?.length / rowsPerPage) || 1;

  const handleClose = () => setOpenEditModal(false);

  const handleDelete = (id) => {
    dispatch(deleteCoupon(id));
  };

  const handleEdit = (c) => {
    setSelectedCoupon(c);
    setOpenEditModal(true);
  };

  return (
    <div className="w-full overflow-x-auto">
      <TableContainer
        component={Paper}
        className="shadow-md rounded-xl overflow-hidden"
      >
        <Table
          sx={{
            minWidth: 650,
            "& td, & th": { whiteSpace: "nowrap" },
          }}
          aria-label="responsive table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#000" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Code
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Discount Type
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Discount Value
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Min. Order Amount
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Usage Limit
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Start Date
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                End Date
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Skeleton Loader */}
            {loading &&
              Array.from(new Array(7)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="text" width="60%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="70%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="50%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="80%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="50%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="60%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="60%" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="rectangular" width={60} height={30} />
                  </TableCell>
                </TableRow>
              ))}

            {/* Table Data */}
            {!loading &&
              !error &&
              paginatedCoupons?.map((c) => (
                <TableRow
                  key={c.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell>{c.code}</TableCell>
                  <TableCell>{c.discountType}</TableCell>
                  <TableCell>{c.discountValue}</TableCell>
                  <TableCell>{c.minOrderAmount}</TableCell>
                  <TableCell>{c.usageLimit}</TableCell>
                  <TableCell>{c.startDate}</TableCell>
                  <TableCell>{c.endDate}</TableCell>
                  <TableCell align="right">
                    <div className="flex justify-end gap-2">
                      <IconButton color="primary" size="small">
                        <EditIcon
                          onClick={() => handleEdit(c)}
                          fontSize="small"
                        />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(c.id)}
                        disabled={deletingId === c.id}
                      >
                        {deletingId === c.id ? (
                          <CircularProgress size={17} />
                        ) : (
                          <DeleteIcon fontSize="small" />
                        )}
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

            {!loading && !error && coupons?.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No coupons found.
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
        Scroll horizontally to view more →
      </p>

      <Modal
        open={openEditModaL}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditCouponForm
          selectedCoupon={selectedCoupon}
          handleClose={handleClose}
        />
      </Modal>
    </div>
  );
};

export default CouponCodeTable;
