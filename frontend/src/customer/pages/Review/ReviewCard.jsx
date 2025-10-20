import { Avatar, Box, Button, Grid, IconButton, Rating } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";

const ReviewCard = () => {
  return (
    <>
      <div className="flex justify-between border-gray-300 rounded-sm border p-3">
        <div className="flex justify-between w-full">
          <div className="flex gap-3">
            <div item xs={1}>
              <Box>
                <Avatar
                  className="text-white"
                  sx={{
                    width: { xs: 40, lg: 47 },
                    height: { xs: 40, lg: 47 },
                    bgcolor: "#000",
                  }}
                >
                  A
                </Avatar>
              </Box>
            </div>

            <div>
              <div className="space-y-1.5">
                <div>
                  <p className="font-semibold text-[14px] lg:text-[16px]">
                    Arman Ali
                  </p>
                  <p className="opacity-70 text-[11px] lg:text-[13px]">
                    2024-09-271T3:16:07.478333
                  </p>
                </div>

                <div>
                  <Rating
                    readOnly
                    name="size-small"
                    defaultValue={3.5}
                    size="small"
                  />
                  <p className="text-gray-500 text-[14px] lg:text-[15px]">
                    value for money, great product!
                  </p>

                  <div className="mt-2 flex gap-2">
                    <img
                      className="w-16 cursor-pointer h-14 rounded-sm object-cover object-top"
                      src="https://i.pinimg.com/736x/cd/a4/f0/cda4f03ca3634bd2d155aa32520e8e4b.jpg"
                      alt=""
                    />

                    <img
                      className="w-16 cursor-pointer h-14 rounded-sm object-cover object-top"
                      src="https://i.pinimg.com/736x/cd/a4/f0/cda4f03ca3634bd2d155aa32520e8e4b.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <IconButton sx={{ color: "black" }} size="small">
              <DeleteIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
