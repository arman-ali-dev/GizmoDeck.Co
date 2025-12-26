import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  CircularProgress,
  IconButton,
  Pagination,
  Skeleton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSellerProduct,
  fetchSellerProducts,
} from "../../../store/seller/productSlice";

export default function ProductTable() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      dispatch(fetchSellerProducts());
    }
  }, [dispatch]);

  const { products, loading, error, deletingProductId } = useSelector(
    (state) => state.sellerProduct
  );

  const [page, setPage] = useState(1);
  const rowsPerPage = 7;

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = products?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products?.length / rowsPerPage) || 1;

  // DELETE PRODUCT

  const handleDelete = (productId) => {
    console.log(productId);

    dispatch(deleteSellerProduct(productId));
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
            <TableRow
              sx={{
                backgroundColor: "#000",
              }}
            >
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Images
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Title
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                MRP
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Selling Price
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Color/Size
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Stock
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
                    <Skeleton variant="text" width="80%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="60%" />
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
              paginatedProducts?.map((product) =>
                product.variants?.map((variant, index) => (
                  <TableRow key={variant.id}>
                    <TableCell>
                      <div className="flex gap-1">
                        {variant.images?.slice(0, 3).map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            className="w-10 h-12 rounded-md object-cover"
                            alt="variant"
                          />
                        ))}
                      </div>
                    </TableCell>

                    <TableCell>
                      {product.name?.split(" ").slice(0, 3).join(" ") +
                        (product.name?.split(" ").length > 3 ? "..." : "")}
                    </TableCell>

                    <TableCell align="right">{`₹${variant.mrpPrice}`}</TableCell>

                    <TableCell align="right">
                      {`₹${variant.sellingPrice}`}
                    </TableCell>

                    <TableCell align="right">
                      {variant.color} / {variant.size}
                    </TableCell>

                    <TableCell align="right">{variant?.stock}</TableCell>

                    <TableCell align="right">
                      <div className="flex justify-end gap-2">
                        {index === 0 && (
                          <>
                            <IconButton color="primary" size="small">
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(product?.id)}
                              disabled={deletingProductId == product?.id}
                              color="error"
                              size="small"
                            >
                              {deletingProductId == product?.id ? (
                                <CircularProgress size={14} color="black" />
                              ) : (
                                <DeleteIcon fontSize="small" />
                              )}
                            </IconButton>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}

            {!loading && !error && products?.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No products found.
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

      {/* Small Screen Info */}
      <p className="text-xs text-gray-500 text-center mt-2 lg:hidden">
        Scroll horizontally to view more →
      </p>
    </div>
  );
}
