import React from "react";
import deleteIcon from "../../../assets/delete.png";
import editIcon from "../../../assets/tabler_edit.png";
import { useDispatch } from "react-redux";
import { deleteAddress } from "../../../store/customer/addressSlice";

const AddressCard = ({ address, handleOpenEditAddressForm }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteAddress(address?.id));
  };

  return (
    <>
      <div className="lg:p-5 p-3 border border-gray-300 rounded-md flex">
        <div className="lg:space-y-3 space-y-1.5 lg:pt-3">
          <h1 className="font-bold lg:text-[16px] text-[12px]">
            {address?.name}
          </h1>
          <p className="lg:text-[16px] text-[12px]">
            {address?.address}, {address?.locality}, {address?.city},{" "}
            {address?.state} - {address?.pincode}
          </p>

          <p className="lg:text-[16px] text-[12px]">
            <strong>Mobile No. : </strong>
            {address?.phoneNumber}
          </p>
          <div class="mt-5 flex gap-3">
            <button
              onClick={() => handleOpenEditAddressForm(address)}
              className="lg:text-[13px] cursor-pointer text-[12px] rounded-md bg-[#F5F5F5] px-3 py-1 flex items-start font-medium gap-1"
            >
              <img className="w-[16px] !mt-[1px]" src={editIcon} alt="" />
              Edit
            </button>

            <button
              onClick={handleDelete}
              class="lg:text-[13px] cursor-pointer  text-[12px] text-[#FF0000] rounded-md bg-[#F5F5F5] px-3 py-1  flex items-start font-medium gap-1 "
            >
              <img class="w-[16px] !mt-[0.5px]" src={deleteIcon} alt="" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressCard;
