import {
  Pagination,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellers } from "../../../store/admin/sellerSlice";

const SellerTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      dispatch(fetchSellers());
    }
  }, [dispatch]);

  const { sellers, loading, error } = useSelector((state) => state.adminSeller);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Pagination

  const [page, setPage] = useState(1);
  const rowsPerPage = 7;

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedSellers = sellers?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sellers?.length / rowsPerPage) || 1;

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "100%",
          overflowX: "auto",
        }}
      >
        <Table
          stickyHeader
          sx={{ minWidth: 1200 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Business Name</TableCell>
              <TableCell>GSTIN</TableCell>
              <TableCell>Registered On</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Total Orders</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading &&
              Array.from(new Array(5)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="text" width="20%" />
                  </TableCell>

                  <TableCell align="right">
                    <Skeleton variant="text" width="100%" />
                  </TableCell>

                  <TableCell>
                    <Skeleton variant="text" width="100%" />
                  </TableCell>

                  <TableCell>
                    <Skeleton variant="text" width="100%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="100%" />
                  </TableCell>

                  <TableCell>
                    <Skeleton variant="text" width="100%" />
                  </TableCell>

                  <TableCell>
                    <Skeleton variant="text" width="100%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="100%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="100%" />
                  </TableCell>
                </TableRow>
              ))}
            {!loading &&
              !error &&
              paginatedSellers?.map((s) => (
                <TableRow>
                  <TableCell>{s?.id}</TableCell>
                  <TableCell>{s?.name}</TableCell>
                  <TableCell>{s?.email}</TableCell>
                  <TableCell>{s?.businessName}</TableCell>
                  <TableCell>{s?.gstin}</TableCell>
                  <TableCell>{formatDate(s?.registeredOn)}</TableCell>
                  <TableCell>{s?.verified ? "Yes" : "No"}</TableCell>
                  <TableCell>{s?.active ? "Yes" : "No"}</TableCell>
                  <TableCell>{s?.totalOrders}</TableCell>
                </TableRow>
              ))}

            {!loading && !error && sellers?.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No sellers found.
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
    </>
  );
};

export default SellerTable;
