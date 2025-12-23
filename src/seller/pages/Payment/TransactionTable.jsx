import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerTransaction } from "../../../store/seller/transactionSlice";
import { Box, Pagination, Skeleton } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TransactionTable() {
  const { transactions, loading, error } = useSelector(
    (state) => state.sellerTransaction
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) dispatch(fetchSellerTransaction());
  }, [dispatch]);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Pagination

  const [page, setPage] = useState(1);
  const rowsPerPage = 7;

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedTransactions = transactions?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(transactions?.length / rowsPerPage) || 1;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="right">Customer Name</StyledTableCell>
              <StyledTableCell align="right">Order</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
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
                </TableRow>
              ))}
            {!loading &&
              !error &&
              paginatedTransactions?.map((t) => (
                <StyledTableRow key={t?.id}>
                  <StyledTableCell component="th" scope="row">
                    {formatDate(t?.createdAt)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {t?.customer?.fullName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {t?.order?.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{t?.amount}</StyledTableCell>
                </StyledTableRow>
              ))}

            {!loading && !error && transactions?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No transactions found.
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
}
