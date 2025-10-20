import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ProductCard from "../Home/Product/ProductCard";
import FilterSidebar from "./FilterSeidebar";

const Product = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sort, setSort] = useState("price_asc");
  const [page, setPage] = useState(1);

  const handleSort = (e) => {};

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="-z-10 pt-10 lg:px-14 px-4">
      <div className="lg:flex gap-6">
        <section>
          <FilterSidebar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
        </section>

        <div className="w-full lg:w-[80%] space-y-5">
          <div className="flex justify-between items-center lg:px-9 h-[40px]">
            <div className="relative w-[50%]">
              {/* Add responsive filter icon if needed */}
              <IconButton
                onClick={() => setShowSidebar(true)}
                className="lg:hidden"
              >
                <FilterAltIcon />
              </IconButton>
            </div>
            <FormControl sx={{ width: "220px" }}>
              <InputLabel id="sort-label" sx={{ fontSize: 14 }}>
                Sort
              </InputLabel>
              <Select
                labelId="sort-label"
                value={sort === "price_asc" ? "price_low" : "price_high"}
                label="Sort"
                onChange={handleSort}
                sx={{ fontSize: 14 }} // Select text size
              >
                <MenuItem value={"price_low"} sx={{ fontSize: 14 }}>
                  Price: Low to High
                </MenuItem>
                <MenuItem value={"price_high"} sx={{ fontSize: 14 }}>
                  Price: High to Low
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <Divider />

          <section className="products_section grid md:grid-cols-3 grid-cols-2 gap-y-5 pt-7 lg:pb-7 lg:px-5 justify-center gap-5">
            {[1, 1, 1, 1, 1, 1].map(() => (
              <ProductCard />
            ))}
          </section>

          <div className="flex justify-center mb-8">
            <Pagination
              onChange={handlePageChange}
              count={5}
              page={page}
              variant="outlined"
              shape="rounded"
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
