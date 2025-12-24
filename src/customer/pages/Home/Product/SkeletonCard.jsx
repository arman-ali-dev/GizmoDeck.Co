import { IconButton, Skeleton } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const SkeletonCard = () => {
  return (
    <div className="mt-2">
      <div className="relative overflow-hidden rounded-xl bg-[#f8f8f8]">
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: { xs: 170, lg: 230 },
          }}
        />

        <Skeleton
          variant="circular"
          sx={{
            width: 28,
            height: 28,
            position: "absolute",
            top: 12,
            left: 12,
          }}
        />
      </div>

      <div className="px-4">
        <Skeleton
          variant="text"
          sx={{
            width: "80%",
            height: 24,
            marginTop: "12px",
          }}
        />

        <Skeleton
          variant="text"
          sx={{
            width: "90%",
            height: 18,
          }}
        />

        <div className="flex gap-2 mt-2">
          <Skeleton variant="text" width={60} height={20} />
          <Skeleton variant="text" width={50} height={20} />
          <Skeleton variant="text" width={45} height={20} />
        </div>

        <div className="mt-4 flex gap-2 mb-2">
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              height: 36,
              borderRadius: "999px",
            }}
          />
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              height: 36,
              borderRadius: "999px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
