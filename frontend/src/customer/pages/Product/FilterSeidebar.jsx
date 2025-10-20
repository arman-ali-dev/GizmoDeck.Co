import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FilterSidebar = ({ showSidebar, setShowSidebar }) => {
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {/* Overlay for mobile (when sidebar open, lock background scroll) */}
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
        xl:translate-x-0 xl:w-[20%]"`}
      >
        {/* Header with Close Button (visible only on mobile) */}
        <div className="flex justify-between items-center py-3 border-b-[2px] xl:hidden">
          <h2 className="font-medium text-[20px]">Filters</h2>
          <IconButton onClick={() => setShowSidebar(false)}>
            <CloseIcon />
          </IconButton>
        </div>

        {/* Categories */}
        <div className="mt-5 xl:mt-0">
          <div className="border-b-[2px]">
            <h2 className="font-medium text-[17px]">Categories</h2>
          </div>
          <FormGroup className="mt-4 ml-1">
            {["Laptops", "Mobiles", "Earbuds", "Headphones", "Smartphones"].map(
              (elem) => (
                <FormControlLabel
                  key={elem}
                  control={
                    <Checkbox
                      sx={{
                        width: "30px",
                        height: "30px",
                        transform: "scale(0.8)",
                        color: "gray",
                        "&.Mui-checked": { color: "#ff4545" },
                      }}
                    />
                  }
                  label={elem}
                  sx={{
                    alignItems: "center",
                    "& .MuiFormControlLabel-label": {
                      color: "#9D9C9C",
                      fontSize: "15px",
                      fontFamily: "IM Fell English SC, serif",
                    },
                  }}
                />
              )
            )}
          </FormGroup>
        </div>

        {/* Brand */}
        <div className="mt-5">
          <div className="border-b-[2px]">
            <h2 className="font-medium text-[17px]">Brand</h2>
          </div>
          <FormGroup className="mt-4 ml-1">
            {["Apple", "Samsung", "Dell", "HP", "Lenovo"].map((elem) => (
              <FormControlLabel
                key={elem}
                control={
                  <Checkbox
                    sx={{
                      width: "30px",
                      height: "30px",
                      transform: "scale(0.8)",
                      color: "gray",
                      "&.Mui-checked": { color: "#ff4545" },
                    }}
                  />
                }
                label={elem}
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

        {/* Ratings */}
        <div className="mt-5">
          <div className="border-b-[2px]">
            <h2 className="font-medium text-[17px]">Ratings</h2>
          </div>
          <FormGroup className="mt-4 ml-1">
            {["4 ★ & Above", "3 ★ & Above", "2 ★ & Above"].map((elem) => (
              <FormControlLabel
                key={elem}
                control={
                  <Checkbox
                    sx={{
                      width: "30px",
                      height: "30px",
                      transform: "scale(0.8)",
                      color: "gray",
                      "&.Mui-checked": { color: "#ff4545" },
                    }}
                  />
                }
                label={elem}
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

        {/* Features */}
        <div className="mt-5">
          <div className="border-b-[2px]">
            <h2 className="font-medium text-[17px]">Features</h2>
          </div>
          <FormGroup className="mt-4 ml-1">
            {["4 RAM", "6 RAM", "8 RAM"].map((elem) => (
              <FormControlLabel
                key={elem}
                control={
                  <Checkbox
                    sx={{
                      width: "30px",
                      height: "30px",
                      transform: "scale(0.8)",
                      color: "gray",
                      "&.Mui-checked": { color: "#ff4545" },
                    }}
                  />
                }
                label={elem}
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

        {/* Discount */}
        <div className="mt-5">
          <div className="border-b-[2px]">
            <h2 className="font-medium text-[17px]">Discount</h2>
          </div>
          <FormGroup className="mt-4 ml-1">
            {["10% Off Or More", "20% Off Or More", "50% Off Or More"].map(
              (elem) => (
                <FormControlLabel
                  key={elem}
                  control={
                    <Checkbox
                      sx={{
                        width: "30px",
                        height: "30px",
                        transform: "scale(0.8)",
                        color: "gray",
                        "&.Mui-checked": { color: "#ff4545" },
                      }}
                    />
                  }
                  label={elem}
                  sx={{
                    alignItems: "center",
                    "& .MuiFormControlLabel-label": {
                      color: "#9D9C9C",
                      fontSize: "15px",
                      fontFamily: "IM Fell English SC, serif",
                    },
                  }}
                />
              )
            )}
          </FormGroup>
        </div>

        {/* Color */}
        <div className="mt-5">
          <div className="border-b-[2px]">
            <h2 className="font-medium text-[17px]">Color</h2>
          </div>
          <div className="mt-4 flex gap-4">
            <span className="bg-black cursor-pointer h-5 w-5 rounded-full inline-block"></span>
            <span className="bg-white cursor-pointer border-gray-400 border h-5 w-5 rounded-full inline-block"></span>
            <span className="bg-gray-400 cursor-pointer h-5 w-5 rounded-full inline-block"></span>
            <span className="bg-[#FF9216] cursor-pointer h-5 w-5 rounded-full inline-block"></span>
            <span className="bg-[#FF4545] cursor-pointer h-5 w-5 rounded-full inline-block"></span>
            <span className="bg-[#3313D3] cursor-pointer h-5 w-5 rounded-full inline-block"></span>
            <span className="bg-[rgb(255,0,0)] cursor-pointer h-5 w-5 rounded-full inline-block"></span>
            <span className="bg-[#25CA04] cursor-pointer h-5 w-5 rounded-full inline-block"></span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-5 pb-10">
          <div className="border-b-[2px]">
            <h2 className="font-medium text-[17px]">Price</h2>
          </div>
          <Box sx={{ marginTop: 1 }}>
            <Stack
              spacing={2}
              direction="row"
              sx={{ alignItems: "center", mb: 1 }}
            >
              <Slider
                aria-label="Volume"
                value={value}
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
          <div className="flex justify-between -mt-4">
            <span className="numText text-[16px] font-medium">₹ 0</span>
            <span className="numText text-[16px] font-medium">₹ 9999</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
