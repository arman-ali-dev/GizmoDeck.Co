import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  applyFilters,
  clearFilteredProduct,
  filterProducts,
} from "../../../store/customer/productSlice";
import { useLocation } from "react-router-dom";

const FilterSidebar = ({ showSidebar, setShowSidebar }) => {
  const location = useLocation();
  const { filters } = useSelector((state) => state.product);

  const [value, setValue] = useState([filters?.minPrice, filters?.maxPrice]);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);

    setSelectedFilters((prev) => ({
      ...prev,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    }));
  };

  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    colors: [],
    discounts: [],
    specifications: {},
    minPrice: null,
    maxPrice: null,
  });

  const handleCheck = (key, value) => {
    setSelectedFilters((prev) => {
      const exists = prev[key]?.includes(value);

      return {
        ...prev,
        [key]: exists
          ? prev[key].filter((v) => v !== value)
          : [...(prev[key] || []), value],
      };
    });

    setShowSidebar(false);
  };

  const handleSpecCheck = (specKey, value) => {
    setSelectedFilters((prev) => {
      const currentValues = prev.specifications[specKey] || [];
      const exists = currentValues.includes(value);

      return {
        ...prev,
        specifications: {
          ...prev.specifications,
          [specKey]: exists
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value],
        },
      };
    });
  };

  const handlePriceChange = (e, newValue) => {
    setValue(newValue);

    setSelectedFilters((prev) => ({
      ...prev,
      minPrice: filters.minPrice,
      maxPrice: newValue,
    }));
  };

  const handleColorSelect = (color) => {
    setSelectedFilters((prev) => {
      const alreadySelected = prev.colors.includes(color);

      return {
        ...prev,
        colors: alreadySelected
          ? prev.colors.filter((c) => c !== color)
          : [...prev.colors, color],
      };
    });
  };

  useEffect(() => {
    if (filters) {
      dispatch(filterProducts(selectedFilters));
      dispatch(applyFilters(selectedFilters));
    }
    console.log("ye chala");

    return () => dispatch(clearFilteredProduct());
  }, [selectedFilters]);

  useEffect(() => {
    dispatch(clearFilteredProduct());
  }, [location.pathname]);

  return (
    <>
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-[9998] xl:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <aside
        className={` bg-white px-5 xl:px-0 fixed top-0  z-[9999] xl:z-[0] h-full left-0 xl:relative overflow-y-auto duration-300 w-[90%] sm:w-[60%] md:w-[100%] ${
          showSidebar ? "translate-x-0  " : "-translate-x-full"
        } 
        xl:translate-x-0 !xl:w-[50%]"`}
      >
        <div className="flex justify-between items-center py-3 border-b-[2px] xl:hidden">
          <h2 className="font-medium text-[20px]">Filters</h2>
          <IconButton onClick={() => setShowSidebar(false)}>
            <CloseIcon />
          </IconButton>
        </div>

        {filters?.brands?.length > 0 && (
          <div className="mt-5">
            <div className="border-b-[2px]">
              <h2 className="font-medium text-[17px]">Brand</h2>
            </div>
            <FormGroup className="mt-4 ml-1">
              {filters?.brands?.map((brand) => (
                <FormControlLabel
                  key={brand}
                  control={
                    <Checkbox
                      onChange={() => handleCheck("brands", brand)}
                      checked={selectedFilters.brands.includes(brand)}
                      sx={{
                        width: "30px",
                        height: "30px",
                        transform: "scale(0.8)",
                        color: "gray",
                        "&.Mui-checked": { color: "#ff4545" },
                      }}
                    />
                  }
                  label={brand}
                  sx={{
                    alignItems: "center",
                    "& .MuiFormControlLabel-label": {
                      color: "#9D9C9C",
                      fontSize: "15px",
                      fontFamily: "IM Fell English SC, serif",
                    },
                  }}
                />
              ))}
            </FormGroup>
          </div>
        )}

        {filters?.discounts?.length > 0 && (
          <div className="mt-5">
            <div className="border-b-[2px]">
              <h2 className="font-medium text-[17px]">Discount</h2>
            </div>
            <FormGroup className="mt-4 ml-1">
              {filters.discounts.map((d) => (
                <FormControlLabel
                  key={d}
                  control={
                    <Checkbox
                      onChange={() => handleCheck("discounts", d)}
                      checked={selectedFilters.discounts.includes(d)}
                      sx={{
                        width: "30px",
                        height: "30px",
                        transform: "scale(0.8)",
                        color: "gray",
                        "&.Mui-checked": { color: "#ff4545" },
                      }}
                    />
                  }
                  label={`${d}% Off Or More`}
                  sx={{
                    alignItems: "center",
                    "& .MuiFormControlLabel-label": {
                      color: "#9D9C9C",
                      fontSize: "15px",
                      fontFamily: "IM Fell English SC, serif",
                    },
                  }}
                />
              ))}
            </FormGroup>
          </div>
        )}

        {filters?.colors?.length > 0 && (
          <div className="mt-5">
            <div className="border-b-[2px]">
              <h2 className="font-medium text-[17px]">Color</h2>
            </div>
            <div className="mt-4 flex gap-4">
              {filters.colors.map((color) => (
                <span
                  onClick={() => handleColorSelect(color)}
                  style={{ backgroundColor: color }}
                  className=" cursor-pointer h-5 w-5 rounded-full inline-block"
                ></span>
              ))}
            </div>
          </div>
        )}

        {filters?.specifications &&
          Object.keys(filters.specifications).length > 0 && (
            <div className="mt-5">
              {Object.entries(filters.specifications).map(
                ([specName, values]) => (
                  <div key={specName} className="mb-5">
                    <div className="border-b-[2px]">
                      <h2 className="font-medium text-[17px]">{specName}</h2>
                    </div>
                    <FormGroup className="mt-4 ml-1">
                      {values.map((v) => (
                        <FormControlLabel
                          key={v}
                          control={
                            <Checkbox
                              onChange={() => handleSpecCheck(specName, v)}
                              checked={
                                selectedFilters.specifications[
                                  specName
                                ]?.includes(v) || false
                              }
                              sx={{
                                width: "30px",
                                height: "30px",
                                transform: "scale(0.8)",
                                color: "gray",
                                "&.Mui-checked": { color: "#ff4545" },
                              }}
                            />
                          }
                          label={v}
                          sx={{
                            alignItems: "center",
                            "& .MuiFormControlLabel-label": {
                              color: "#9D9C9C",
                              fontSize: "15px",
                              fontFamily: "IM Fell English SC, serif",
                            },
                          }}
                        />
                      ))}
                    </FormGroup>
                  </div>
                )
              )}
            </div>
          )}

        {(filters?.minPrice || filters?.maxPrice) && (
          <div className="mt-5 pb-10">
            <div className="border-b-[2px]">
              <h2 className="font-medium text-[17px]">Price</h2>
            </div>
            <Box sx={{ marginTop: 1, paddingX: "10px" }}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ alignItems: "center", mb: 1 }}
              >
                <Slider
                  aria-label="Volume"
                  value={value}
                  min={filters.minPrice}
                  max={filters.maxPrice}
                  onChange={handleChange}
                  sx={{
                    color: "#ff4545",
                    "& .MuiSlider-thumb": { backgroundColor: "#ff4545" },
                    "& .MuiSlider-rail": { color: "#d1d1d1" },
                    "& .MuiSlider-track": { color: "#ff4545" },
                  }}
                />
              </Stack>
            </Box>
            <div className="flex justify-between -mt-4 px-[10px]">
              <span className="numText text-[16px] font-medium">
                ₹ {filters.minPrice}
              </span>
              <span className="numText text-[16px] font-medium">
                ₹ {filters.maxPrice}
              </span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default FilterSidebar;
