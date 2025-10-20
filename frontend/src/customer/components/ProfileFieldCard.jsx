import { Divider } from "@mui/material";
import React from "react";

const ProfileFieldCard = ({ keys, value }) => {
  return (
    <>
      <div className="p-5 flex items-center bg-slate-50">
        <p className="w-20 lg:w-36 pr-5 lg:text-[16px] text-[14px]">{keys}</p>
        <Divider orientation="vertical" flexItem />
        <p className="pl-4 lg:pl-10 font-semibold lg:text-lg text-[14px]  ">
          {value}
        </p>
      </div>
    </>
  );
};

export default ProfileFieldCard;
