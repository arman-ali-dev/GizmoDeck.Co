import React from "react";
import { Divider } from "@mui/material";
import ProfileFieldCard from "../../components/ProfileFieldCard";

const UserDetails = () => {
  return (
    <>
      <div className="flex justify-center py-2 lg:py-10">
        <div className="w-full lg:w-[70%]">
          <div className="flex items-center pb-3 px-4 lg:block justify-between">
            <h1 className="font-bold lg:text-xl text-md ">Personal Details</h1>
          </div>

          <div>
            <ProfileFieldCard keys={"Name"} value={"Arman Ali"} />
            <Divider />
            <ProfileFieldCard
              keys={"Email"}
              value={"armaanali.dev@gmail.com"}
            />
            <Divider />

            <ProfileFieldCard keys={"Mobile"} value={"7665407031"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
