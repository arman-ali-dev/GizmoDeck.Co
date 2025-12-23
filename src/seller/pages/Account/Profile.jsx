import React, { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import { fetchSellerProfile } from "../../../store/seller/sellerSlice";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      dispatch(fetchSellerProfile());
    }
  }, [dispatch]);

  const { seller } = useSelector((state) => state.seller);

  return (
    <>
      <div class="border-gray-300 mt-4 border lg:rounded-2xl rounded-md px-6 pt-5 pb-6">
        <h3 class="lg:text-[17px] text-[16px] text-[#353535] font-medium">
          Personal Information
        </h3>

        <form class="mt-5 space-y-4">
          <div className="flex gap-5">
            <div className="flex-1">
              <label class="lg:text-[15px] text-[13px] font-medium">Name</label>
              <input
                value={seller?.user?.fullName}
                class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
                type="text"
              />
            </div>

            <div className="flex-1">
              <label class="lg:text-[15px] text-[13px]  font-medium">
                Email
              </label>
              <input
                value={seller?.user?.email}
                class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
                type="text"
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex-1">
              <label class="lg:text-[15px] text-[13px] font-medium">
                Phone Number
              </label>
              <input
                value={"+91 " + seller?.user?.phoneNumber}
                class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
                type="text"
              />
            </div>

            <div className="flex-1">
              <label class="lg:text-[15px] text-[13px]  font-medium">
                GSTIN
              </label>
              <input
                value={seller?.gstin}
                class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
                type="text"
              />
            </div>
          </div>

          <div className="flex gap-2 items-start mt-5">
            {seller?.verified ? (
              <>
                <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />
                <p className="text-[14px] font-medium text-green-600">
                  Verified
                </p>
              </>
            ) : (
              <>
                <CancelIcon color="error" sx={{ fontSize: 18 }} />
                <p className="text-[14px] font-medium text-red-500">
                  Not Verified
                </p>
              </>
            )}
          </div>
        </form>
      </div>

      <div class="border-gray-300 mt-4 border lg:rounded-2xl rounded-md px-6 pt-5 pb-6">
        <h3 class="lg:text-[17px] text-[16px] text-[#353535] font-medium">
          Business Information
        </h3>

        <form class="mt-5 space-y-4">
          <div className="flex gap-5">
            <div className="flex-1">
              <label class="lg:text-[15px] text-[13px] font-medium">
                Business Name
              </label>
              <input
                value={seller?.businessDetails?.businessName}
                class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
                type="text"
              />
            </div>

            <div className="flex-1">
              <label class="lg:text-[15px] text-[13px]  font-medium">
                Business Email
              </label>
              <input
                value={seller?.businessDetails?.businessEmail}
                class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
                type="text"
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex-1">
              <label class="lg:text-[15px] text-[13px] font-medium">
                Business Phone Number
              </label>
              <input
                value={"+91 " + seller?.businessDetails?.businessMobileNumber}
                class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
                type="text"
              />
            </div>

            <div className="flex-1">
              <label class="lg:text-[15px] text-[13px]  font-medium">
                Business Address
              </label>
              <input
                value={seller?.businessDetails?.businessAddress}
                class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
                type="text"
              />
            </div>
          </div>
        </form>
      </div>

      <div class="border-gray-300 mt-4 border lg:rounded-2xl rounded-md px-6 pt-5 pb-6">
        <h3 class="lg:text-[17px] text-[16px] text-[#353535] font-medium">
          Bank Details
        </h3>

        <form class="mt-5 space-y-4">
          <div className="flex gap-5">
            <div className="flex-1">
              <label class="lg:text-[15px] text-[13px] font-medium">
                Account Holder Name
              </label>
              <input
                value={seller?.bankDetails?.accountHolderName}
                class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
                type="text"
              />
            </div>

            <div className="flex-1">
              <label class="lg:text-[15px] text-[13px]  font-medium">
                Account Number
              </label>
              <input
                value={seller?.bankDetails?.accountNumber}
                class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
                type="text"
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex-1">
              <label class="lg:text-[15px] text-[13px] font-medium">
                IFSC Code
              </label>
              <input
                value={seller?.bankDetails?.ifscCode}
                class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
                type="text"
              />
            </div>
          </div>
        </form>
      </div>

      <div class="border-gray-300 mt-4 border lg:rounded-2xl rounded-md px-6 pt-5 pb-6">
        <h3 class="lg:text-[17px] text-[16px] text-[#353535] font-medium">
          Pickup Address
        </h3>

        <form class="mt-5 space-y-4">
          <div className="flex gap-5">
            <div className="flex-1">
              <label class="lg:text-[15px] text-[13px] font-medium">Name</label>
              <input
                value={seller?.pickupAddress?.name}
                class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
                type="text"
              />
            </div>

            <div className="flex-1">
              <label class="lg:text-[15px] text-[13px]  font-medium">
                Phone Number
              </label>
              <input
                value={"+91 " + seller?.pickupAddress?.phoneNumber}
                class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
                type="text"
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex-1">
              <label class="lg:text-[15px] text-[13px] font-medium">
                Pin Code
              </label>
              <input
                value={seller?.pickupAddress?.pincode}
                class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
                type="text"
              />
            </div>

            <div className="flex-1">
              <label class="lg:text-[15px] text-[13px] font-medium">
                Address
              </label>
              <input
                value={seller?.pickupAddress?.address}
                class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
                type="text"
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex-1">
              <label class="lg:text-[15px] text-[13px] font-medium">
                Locality
              </label>
              <input
                value={seller?.pickupAddress?.locality}
                class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
                type="text"
              />
            </div>

            <div className="flex-1">
              <label class="lg:text-[15px] text-[13px] font-medium">City</label>
              <input
                value={seller?.pickupAddress?.city}
                class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
                type="text"
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex-1">
              <label class="lg:text-[15px] text-[13px] font-medium">
                State
              </label>
              <input
                value={seller?.pickupAddress?.state}
                class="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
                type="text"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
