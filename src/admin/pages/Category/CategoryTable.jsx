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
import {
  deleteCategory,
  fetchCategories,
} from "../../../store/admin/categorySlice";
import EditCategoryForm from "./EditCategoryForm";

const CategoryTable = () => {
  const [openEditModaL, setOpenEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleClose = () => setOpenEditModal(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    dispatch(fetchCategories());
  }, []);

  const { categories, deletingId, loading, error } = useSelector(
    (state) => state.category
  );

  const [page, setPage] = useState(1);
  const rowsPerPage = 7;

  const handleEdit = (c) => {
    setSelectedCategory(c);
    setOpenEditModal(true);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedCategories = categories?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(categories?.length / rowsPerPage) || 1;

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  console.log("catw : ", categories);

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
                Image
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Description
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
                    <Skeleton variant="text" width="70%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="90%" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="rectangular" width={60} height={30} />
                  </TableCell>
                </TableRow>
              ))}

            {!loading &&
              !error &&
              paginatedCategories?.map((c) => (
                <TableRow
                  key={c.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <div className="flex gap-1">
                      <img
                        className="w-10 h-12 rounded-md object-cover object-top"
                        src={c.image}
                        alt={c.name}
                      />
                    </div>
                  </TableCell>

                  <TableCell>{c.name}</TableCell>
                  <TableCell sx={{ width: "200px" }}>{c.description}</TableCell>
                  <TableCell align="right">
                    <div className="flex justify-end gap-2">
                      <IconButton
                        onClick={() => handleEdit(c)}
                        color="primary"
                        size="small"
                      >
                        <EditIcon fontSize="small" />
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

            {!loading && !error && categories?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No categories found.
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
        <EditCategoryForm
          selectedCategory={selectedCategory}
          handleClose={handleClose}
        />
      </Modal>
    </div>
  );
};

export default CategoryTable;
