import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
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
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilteredProduct,
  clearFilters,
  clearSearchedProducts,
  fetchFilters,
  fetchProductsByCategory,
  searchProducts,
  sortProducts,
} from "../../../store/customer/productSlice";

const Product = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const { categoryId } = useParams();
  console.log("categoryId", categoryId);

  const dispatch = useDispatch();
  const { searchResults, loadingSearch, loadingFilters } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (query) {
      dispatch(searchProducts(query));
    }

    if (categoryId) {
      dispatch(fetchProductsByCategory(categoryId));
      dispatch(fetchFilters(categoryId));
    }

    return () => {
      dispatch(clearSearchedProducts());
      dispatch(clearFilters());
      dispatch(clearFilteredProduct());
    };
  }, [query, categoryId, dispatch]);

  const [page, setPage] = useState(1);
  const pageSize = 9;

  // sort
  const [sort, setSort] = useState("price_low");

  const handleSort = (e) => {
    const value = e.target.value;
    setSort(value);

    if (value === "price_low") {
      dispatch(sortProducts({ sortBy: "sellingPrice", ascending: true }));
    } else {
      dispatch(sortProducts({ sortBy: "sellingPrice", ascending: false }));
    }
  };

  // Fetch filters based on first product's categoryId
  useEffect(() => {
    if (searchResults.length > 0) {
      console.log("searchResults", searchResults);

      const categoryId = searchResults[0]?.category?.id;
      console.log("categoryId", categoryId);

      dispatch(fetchFilters(categoryId));
    }

    return () => dispatch(clearFilters());
  }, [searchResults]);

  // FILTER
  const { filteredProducts } = useSelector((state) => state.product);

  const productsToShow =
    filteredProducts && filteredProducts.length > 0
      ? filteredProducts
      : searchResults || [];

  const totalPages = Math.ceil(productsToShow.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = productsToShow.slice(startIndex, endIndex);

  return (
    <div className="-z-10 pt-10 lg:px-14 px-4">
      {loadingSearch || loadingFilters ? (
        <CenterLoader />
      ) : query && searchResults?.length === 0 ? (
        <NoResults query={query} />
      ) : (
        <div className="lg:flex gap-6">
          <section className="w-[22%]">
            <FilterSidebar
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
            />
          </section>

          <div className="w-full flex-1  space-y-5">
            <div className="flex justify-between items-center lg:px-9 h-[40px]">
              <div className="relative w-[50%]">
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
                  value={sort}
                  label="Sort"
                  onChange={handleSort}
                  sx={{ fontSize: 14 }}
                >
                  <MenuItem value="price_low" sx={{ fontSize: 14 }}>
                    Price: Low to High
                  </MenuItem>

                  <MenuItem value="price_high" sx={{ fontSize: 14 }}>
                    Price: High to Low
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            <Divider />

            <section className="products_section grid md:grid-cols-3 grid-cols-2 gap-y-5 pt-7 lg:pb-7 lg:px-5 justify-center gap-5">
              {paginatedProducts?.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </section>

            <div className="flex justify-center mb-8">
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                variant="outlined"
                shape="rounded"
                color="primary"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CenterLoader = () => {
  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <CircularProgress color="black" size={45} />
    </div>
  );
};

const NoResults = ({ query }) => {
  return (
    <div className="w-full h-[90vh] flex flex-col justify-center items-center text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/7486/7486801.png"
        className="w-24 opacity-70 mb-3"
        alt="no results"
      />

      <h2 className="text-lg font-semibold text-gray-700">
        No Products Found "{query}"
      </h2>
      <p className="text-gray-500 text-sm mt-1">
        Try searching with a different keyword or filter.
      </p>
    </div>
  );
};

export default Product;
