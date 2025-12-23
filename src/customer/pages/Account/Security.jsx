import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Security = () => {
  return (
    <>
      <div class="border-gray-300  border lg:rounded-2xl rounded-md px-6 pt-5 pb-6">
        <h3 class="lg:text-[17px] text-[16px] gap-2 flex items-start !text-[#353535] font-medium">
          <LockOutlinedIcon />
          Change Password
        </h3>

        <form class="mt-5 space-y-4">
          <div>
            <label class="lg:text-[15px] text-[14px] font-medium">
              Current Password
            </label>
            <input
              class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
              type="text"
            />
          </div>

          <div>
            <label class="lg:text-[15px] text-[14px] font-medium">
              New Password
            </label>
            <input
              class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
              type="text"
            />

            <p class="mt-1 text-[12px]">Must be at least 8 characters long</p>
          </div>

          <div>
            <label class="lg:text-[15px] text-[14px] font-medium">
              Confirm New Password
            </label>
            <input
              class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
              type="text"
            />
          </div>

          <div class="mt-8 space-x-2 text-right">
            <button class="py-2 lg:text-[14px] text-[12px] cursor-pointer font-medium text-black border-black border rounded-sm px-6 inline-block">
              Cancel
            </button>
            <button class="py-2 lg:text-[14px] text-[12px] cursor-pointer font-medium bg-black text-white border-[#000] border rounded-sm px-6 inline-block">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Security;
