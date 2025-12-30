import { Button, CircularProgress, Divider, IconButton } from "@mui/material";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartItem,
  updateCartQuantity,
} from "../../../store/customer/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { deleteItemId, updatingItemId } = useSelector((state) => state.cart);

  const handleRemoveItemFromCart = () => {
    dispatch(removeCartItem(item?.id));
  };

  const handleUpdateQuantity = (itemId, newQty) => {
    dispatch(updateCartQuantity({ itemId, quantity: newQty }));
  };

  return (
    <>
      <div className="border rounded-md relative border-gray-300">
        <div className="flex lg:p-5 p-3 gap-3">
          <div>
            <img
              className="lg:w-[100px] w-[120px] h-[90px] object-cover object-top lg:h-[135px] rounded-md"
              src={item?.variant?.images[0]}
              alt="Aeropostale T-Shirt"
            />
          </div>
          <div className="lg:space-y-2 space-y-1">
            <h1 className="font-semibold text-[12px] lg:text-[17px]">
              {item?.product?.name}
            </h1>

            <p className="text-gray-600 font-medium text-[10px] lg:text-sm">
              {item?.product?.description?.split(" ").slice(0, 11).join(" ") +
                " ..."}
            </p>

            <p className="text-gray-500 text-[10px] lg:text-xs">
              Color: {item?.variant?.color}
            </p>

            <p className="text-gray-500 text-[10px] lg:text-xs">
              Size: {item?.variant?.size}
            </p>

            <p className="lg:text-sm text-[11px] text-gray-500 mt-1">
              <strong>Quantity: </strong> {item?.quantity}
            </p>
          </div>

          <Divider />
        </div>

        <div className="lg:px-5 px-3 lg:py-2 py-1.5 flex justify-between items-center w-full border-t border-gray-300">
          <div className="flex items-center gap-2 w-[85px] lg:w-[140px] justify-between">
            <button
              disabled={item.quantity <= 1 || updatingItemId === item.id}
              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
              className={
                `cursor-pointer ` +
                (item.quantity <= 1 || updatingItemId === item.id
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-black")
              }
            >
              {updatingItemId === item.id ? (
                <CircularProgress color="black" size={12} />
              ) : (
                <RemoveIcon sx={{ fontSize: 18 }} />
              )}
            </button>

            <span className="lg:text-[16px] text-[14px]">{item?.quantity}</span>

            <button
              className="cursor-pointer"
              disabled={updatingItemId === item.id}
              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
            >
              {updatingItemId === item.id ? (
                <CircularProgress color="black" size={12} />
              ) : (
                <AddIcon sx={{ fontSize: 18 }} />
              )}
            </button>
          </div>

          <div>
            <p className="text-gray-700 font-medium lg:text-[16px] text-[14px]">
              ₹{item?.totalPrice}
            </p>
          </div>
        </div>

        <div className="absolute top-0 lg:top-2 right-1 lg:right-3">
          <IconButton
            disabled={deleteItemId === item.id}
            onClick={handleRemoveItemFromCart}
          >
            {deleteItemId === item.id ? (
              <CircularProgress size={12} color="black" />
            ) : (
              <CloseIcon
                color="primary"
                sx={{ fontSize: 20, color: "black" }}
              />
            )}
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default CartItem;
