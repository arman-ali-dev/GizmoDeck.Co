import React, { useEffect, useState } from "react";
import AddressCard from "./AddressCard";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Box, Modal, Skeleton } from "@mui/material";
import AddressForm from "../Checkout/AddressForm";
import { useDispatch, useSelector } from "react-redux";
import EditAddressForm from "../Checkout/EditAddressForm";
import { fetchAddresses } from "../../../store/customer/addressSlice";
import NoAddressFound from "./NoAddressFound";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", md: 500 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: { xs: 3, lg: 4 },
  borderRadius: "8px",
};

const Address = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    dispatch(fetchAddresses());
  }, [dispatch]);

  const [openAddAddressForm, setOpenAddAddressForm] = useState(false);

  const [openEditAddressForm, setOpenEditAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleOpenAddAddressForm = () => setOpenAddAddressForm(true);
  const handleCloseAddAddressForm = () => setOpenAddAddressForm(false);

  const handleCloseEditAddressForm = () => setOpenEditAddressForm(false);

  const { addresses, loading } = useSelector((state) => state.address);

  const handleOpenEditAddressForm = (address) => {
    setSelectedAddress(address); // store selected address
    setOpenEditAddressForm(true); // open modal
  };

  return (
    <>
      <div>
        <div className="mb-5 text-right">
          <Button
            onClick={handleOpenAddAddressForm}
            variant="contained"
            sx={{
              textTransform: "capitalize",
              backgroundColor: "black",
              fontSize: 14,
              paddingY: 1,
              paddingX: 3,
            }}
          >
            <AddIcon />
            <span className="ml-1 text-[13px]">Add Address</span>
          </Button>
        </div>

        {loading ? (
          <AddressListSkeleton />
        ) : addresses?.length === 0 ? (
          <NoAddressFound />
        ) : (
          <div className="space-y-3">
            {addresses?.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                handleOpenEditAddressForm={handleOpenEditAddressForm}
              />
            ))}
          </div>
        )}
      </div>

      <Modal open={openAddAddressForm} onClose={handleCloseAddAddressForm}>
        <Box sx={style}>
          <AddressForm handleClose={handleCloseAddAddressForm} />
        </Box>
      </Modal>

      <Modal open={openEditAddressForm} onClose={handleCloseEditAddressForm}>
        <Box sx={style}>
          <EditAddressForm
            handleClose={handleCloseEditAddressForm}
            addressData={selectedAddress}
          />
        </Box>
      </Modal>
    </>
  );
};

const AddressListSkeleton = () => {
  return (
    <Box className="space-y-3">
      {[1, 2, 3].map((i) => (
        <Box key={i} className="border border-gray-300 rounded-md p-4 lg:p-5">
          <Skeleton height={20} width="40%" />
          <Skeleton height={16} width="90%" style={{ marginTop: 10 }} />
          <Skeleton height={16} width="60%" />
          <Skeleton height={16} width="80%" style={{ marginTop: 10 }} />

          <Box className="flex gap-3 mt-5">
            <Skeleton height={35} width={80} />
            <Skeleton height={35} width={80} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Address;
