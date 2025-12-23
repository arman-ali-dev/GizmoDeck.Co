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
import { fetchUsers } from "../../../store/admin/userSlice";

const UserTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      dispatch(fetchUsers());
    }
  }, [dispatch]);

  const { users, loading, error } = useSelector((state) => state.adminUser);

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
  const paginatedUsers = users?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(users?.length / rowsPerPage) || 1;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Registered On</TableCell>
              <TableCell align="right">Total Orders</TableCell>
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
                </TableRow>
              ))}
            {!loading &&
              !error &&
              paginatedUsers?.map((u) => (
                <TableRow>
                  <TableCell>{u?.id}</TableCell>
                  <TableCell align="right">{u?.fullName}</TableCell>
                  <TableCell align="right">{u?.email}</TableCell>
                  <TableCell align="right">
                    {formatDate(u?.createdAt)}
                  </TableCell>
                  <TableCell align="right">{u?.totalOrders}</TableCell>
                </TableRow>
              ))}

            {!loading && !error && users?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found.
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

export default UserTable;
