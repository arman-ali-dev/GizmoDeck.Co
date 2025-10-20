import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

const images = [
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/31101834/2024/12/26/bb7963ed-a03b-41ad-8b79-01354822587e1735204642505-Aeropostale-Men-Tshirts-961735204641834-1.jpg",
  "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/31101834/2024/12/26/57b4f393-01ba-4848-a94b-2450a8fcfe231735204642473-Aeropostale-Men-Tshirts-961735204641834-2.jpg",
  "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/31101834/2024/12/26/bf132fc5-d88e-46dc-bbe7-af3afb30e7a71735204642440-Aeropostale-Men-Tshirts-961735204641834-3.jpg",
  "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/31101834/2024/12/26/15c4ecb9-072a-402c-9408-0004328d96991735204642406-Aeropostale-Men-Tshirts-961735204641834-4.jpg",
];

export default function ProductTable() {
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
                Color
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Update Stock
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
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row">
                <div className="flex gap-1">
                  {images.slice(2).map((elem, index) => (
                    <img
                      key={index}
                      className="w-10 h-12 rounded-md object-cover object-top"
                      src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2024/NOVEMBER/9/FQxV6x20_d54aca57e3ce4df9946b81f5552ceb63.jpg"
                      alt="product"
                    />
                  ))}
                </div>
              </TableCell>

              <TableCell>Classic Cotton Shirt</TableCell>
              <TableCell align="right">₹1499</TableCell>
              <TableCell align="right">₹899</TableCell>
              <TableCell align="right">Blue</TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    borderColor: "#000",
                    color: "#000",
                    "&:hover": { backgroundColor: "#000", color: "#fff" },
                  }}
                >
                  In Stock
                </Button>
              </TableCell>
              <TableCell align="right">
                <div className="flex justify-end gap-2">
                  <IconButton color="primary" size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Small Screen Info */}
      <p className="text-xs text-gray-500 text-center mt-2 lg:hidden">
        Scroll horizontally to view more →
      </p>
    </div>
  );
}
