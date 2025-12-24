import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";
import { Button, CircularProgress, Divider } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import shoppingImage from "../../../assets/shopping.png";
import vanImage from "../../../assets/van.png";
import returnImage from "../../../assets/return.png";
import SimilarProduct from "./SimilarProducts";
import Details from "./Details";
import Features from "./Features";
import Reviews from "./Reviews";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductDetails,
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../../store/customer/productSlice";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../../store/customer/wishlistSlice";
import { addToCart } from "../../../store/customer/cartSlice";
import { Skeleton } from "@mui/material";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productDetails, loadingProductDetails } = useSelector(
    (state) => state.product
  );

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

  const handleActiveImage = (value) => {
    setActiveImage(value);
  };

  const handleChangeActiveTab = (tab) => {
    setActiveTab(tab);
  };

  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  const currentVariant = productDetails?.variants[currentVariantIndex];

  useEffect(() => {
    if (productId) {
      dispatch(fetchSimilarProducts(productId));
      dispatch(fetchProductDetails(productId));
    }

    return () => {
      dispatch(clearProductDetails());
    };
  }, [productId, dispatch]);

  const handleChangeVariant = (idx) => {
    setActiveImage(0);
    setCurrentVariantIndex(idx);
  };

  const { wishlist, addingItemId, removingItemId } = useSelector(
    (state) => state.wishlist
  );

  // check if product already exists in wishlist
  const wishlistItem = wishlist.wishlistItems.find(
    (item) => item.product.id == productId
  );

  const handleWishlistClick = () => {
    if (wishlistItem) {
      // REMOVE
      dispatch(removeItemFromWishlist(wishlistItem.id));
    } else {
      // ADD
      dispatch(addItemToWishlist(productId));
    }
  };

  /// ------ cart

  const { addLoading } = useSelector((state) => state.cart);

  const handleAddItemToCart = () => {
    dispatch(
      addToCart({
        productId,
        variantId: currentVariant?.id,
        quantity,
        price: currentVariant?.sellingPrice,
      })
    );
  };

  return (
    <>
      <div className="px-4 lg:px-14 lg:pt-10 pt-5">
        {loadingProductDetails ? (
          <ProductDetailsSkeleton />
        ) : (
          <div className="grid  grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10">
            <section className="flex flex-col md:flex-row gap-5">
              <div className="w-full md:w-[15%] flex md:flex-col gap-3">
                {currentVariant?.images?.map((elem, index) => (
                  <img
                    onClick={() => handleActiveImage(index)}
                    className="md:w-[90px] w-[25%] h-[70px] lg:h-[110px] object-cover object-top cursor-pointer rounded-md"
                    src={elem}
                    alt=""
                  />
                ))}
              </div>

              <div className="w-full  md:w-[85%]">
                <img
                  className="w-full lg:h-[600px] h-[370px] object-center object-cover  rounded-md"
                  src={currentVariant?.images[activeImage]}
                  alt=""
                />
              </div>
            </section>

            <section>
              <h1 className="font-bold md:text-lg text-md ">
                {productDetails?.name}
              </h1>

              <p className="text-gray-500 lg:text-[14px] md:text-[14px] text-[12px] ">
                {productDetails?.description}
              </p>

              <div className="flex justify-between items-center py-2 rounded-sm border border-gray-300 w-[150px] lg:w-[180px] px-3 mt-3 lg:mt-5">
                <div className="flex gap-1 items-center">
                  <span className="lg:text-[16px] text-[13px]">4</span>
                  <StarIcon
                    sx={{
                      color: yellow[800],
                      fontSize: { xs: "14px", md: "17px" },
                      marginTop: "-2px",
                    }}
                  />
                </div>

                <Divider orientation="vertical" flexItem />
                <span className="lg:text-[16px] text-[13px]">234 Ratings</span>
              </div>

              <div>
                <div className="price flex items-center gap-3 lg:mt-5 mt-3 text-[14px] md:text-md lg:text-xl">
                  <span className="font-sans text-gray-800">
                    ₹ {currentVariant?.sellingPrice}
                  </span>
                  <span className="line-through text-gray-400">
                    ₹ {currentVariant?.mrpPrice}
                  </span>
                  <span className=" font-semibold">
                    {Math.floor(currentVariant?.discount)}%
                  </span>
                </div>

                <p className="lg:text-sm md:text-[14px] text-[12px]">
                  Inclusive of all taxes. Free Shipping above ₹1500.
                </p>
              </div>

              <div class="mt-4">
                <p class="lg:text-[15px] text-[13px] font-medium">
                  Color:  {currentVariant?.color}
                </p>

                <ul class="mt-2 flex gap-2">
                  {productDetails?.variants?.map((elem, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleChangeVariant(idx)}
                      style={{ background: elem?.color?.toLowerCase() }}
                      class={`lg:w-8 w-6 ${
                        elem?.color?.toLowerCase() == "white" &&
                        "border-gray-300 border"
                      }  cursor-pointer  lg:h-8 h-6  ${
                        currentVariant?.color == elem?.color && "activeColor"
                      } rounded-full inline-block`}
                    ></li>
                  ))}
                </ul>
              </div>

              <div class="mt-7">
                <p class="lg:text-[15px] text-[13px] font-medium">Size:</p>

                <ul class="flex flex-wrap mt-2 gap-2">
                  {productDetails?.variants?.map((elem, idx) => (
                    <li key={idx}>
                      <Button
                        onClick={() => {
                          handleChangeVariant(idx);
                        }}
                        variant="outlined"
                        sx={{
                          color:
                            elem?.size == currentVariant?.size
                              ? "white"
                              : "black",
                          background:
                            elem?.size == currentVariant?.size && "black",
                          borderColor: "#000",
                        }}
                        className={`border rounded-md lg:px-7 px-4 py-2 `}
                      >
                        <span className="font-medium lg:text-[14px] text-[12px]">
                          {elem?.size}
                        </span>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:mt-4 mt-3 space-y-2">
                <h1 className="font-medium lg:text-[16px] text-[14px]">
                  Quantity
                </h1>

                <div className="flex gap-4">
                  <div className="flex lg:py-2 py-1 px-3 border-gray-300 border rounded-sm items-center gap-2 min-w-[120px] lg:min-w-[140px] justify-between">
                    <button
                      onClick={() => setQuantity(quantity - 1)}
                      disabled={quantity === 1}
                      className={`${
                        quantity === 1
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer opacity-100"
                      }`}
                    >
                      <RemoveIcon sx={{ color: "black", fontSize: 16 }} />
                    </button>
                    <span className="lg:text-[16px] text-[13px]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={false}
                      className={`${
                        false
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer opacity-100"
                      }`}
                    >
                      <AddIcon sx={{ color: "black", fontSize: 16 }} />
                    </button>
                  </div>

                  <Button
                    variant="outlined"
                    className="!border-gray-300 !text-black !capitalize"
                    sx={{
                      py: { xs: "8px", md: "10px" },
                      px: 2,
                    }}
                    onClick={handleWishlistClick}
                    disabled={
                      addingItemId === productId ||
                      removingItemId === wishlistItem?.id
                    }
                  >
                    {addingItemId === productId ? (
                      <CircularProgress size={13} />
                    ) : removingItemId === wishlistItem?.id ? (
                      <CircularProgress size={13} />
                    ) : wishlistItem ? (
                      <FavoriteIcon
                        sx={{
                          color: "red",
                          fontSize: { xs: "17px", lg: "19px" },
                        }}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        sx={{ fontSize: { xs: "17px", lg: "19px" } }}
                      />
                    )}
                  </Button>
                </div>
              </div>

              <div className="lg:mt-5 mt-3 flex  gap-2 lg:gap-5">
                <Button
                  fullWidth
                  onClick={() =>
                    navigate(
                      `/checkout?productId=${productId}&variantId=${currentVariant?.id}&qty=${quantity}`
                    )
                  }
                  className="!border-black !border !text-white !bg-black !capitalize"
                  variant="contained"
                  sx={{
                    py: { xs: "8px", md: "10px" },
                    px: 2,
                  }}
                >
                  <span className="font-medium lg:text-[16px] text-[13px]">
                    Buy Now
                  </span>
                </Button>

                <Button
                  fullWidth
                  onClick={handleAddItemToCart}
                  className="!border-gray-300 !text-black !capitalize"
                  variant="outlined"
                  sx={{
                    py: { xs: "8px", md: "10px" },
                    px: 2,
                  }}
                  disabled={addLoading}
                >
                  {addLoading ? (
                    <CircularProgress color="white" size={15} />
                  ) : (
                    <span className="font-medium lg:text-[16px] text-[13px]">
                      Add To Cart
                    </span>
                  )}
                </Button>
              </div>

              <div class="flex mt-4 lg:gap-3 gap-2">
                <div class="bg-black w-[220px] lg:rounded-xl rounded-md text-center px-2 lg:px-4 py-4">
                  <div class=" mx-auto w-[50px] h-[50px] flex justify-center items-center rounded-full">
                    <img class="lg:w-[28px] w-[24px]" src={vanImage} alt="" />
                  </div>

                  <h3 class="text-white lg:text-[14px] text-[12px] font-medium mt-1">
                    Free Fast Ship
                  </h3>
                  <p class="text-white lg:text-[12px] text-[10px] font-medium">
                    All World Orders
                  </p>
                </div>

                <div class="bg-black w-[220px] lg:rounded-xl rounded-md text-center px-2 lg:px-4 py-4">
                  <div class="mx-auto w-[50px] h-[50px] flex justify-center items-center rounded-full">
                    <img
                      class="lg:w-[28px] w-[24px]"
                      src={shoppingImage}
                      alt=""
                    />
                  </div>

                  <h3 class="text-white lg:text-[14px] text-[12px] font-medium mt-1">
                    Safe Card Pay
                  </h3>
                  <p class="text-white lg:text-[12px] text-[10px] font-medium">
                    Secure Cash Flow
                  </p>
                </div>

                <div class="bg-black w-[220px] lg:rounded-xl rounded-md text-center px-2 lg:px-4 py-4">
                  <div class=" mx-auto w-[50px] h-[50px] flex justify-center items-center rounded-full">
                    <img
                      class="lg:w-[28px] w-[24px]"
                      src={returnImage}
                      alt=""
                    />
                  </div>

                  <h3 class="text-white lg:text-[14px] text-[12px] font-medium mt-1">
                    Easy Free Return
                  </h3>
                  <p class="text-white lg:text-[12px] text-[10px] font-medium">
                    30 Days Back
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {loadingProductDetails ? (
          <div className="mt-10">
            <div className="flex justify-between bg-gray-100 backdrop-blur px-2 py-2 rounded-sm">
              <Skeleton
                variant="rectangular"
                className="rounded-sm"
                sx={{ width: { xs: 80, md: 150 }, height: 32 }}
              />
            </div>

            <div className="mt-6 bg-white rounded-md p-4 border border-gray-200 w-full">
              <div className="mt-4 space-y-3">
                <Skeleton variant="text" sx={{ width: "85%", height: 22 }} />
                <Skeleton variant="text" sx={{ width: "95%", height: 20 }} />
                <Skeleton variant="text" sx={{ width: "75%", height: 20 }} />
                <Skeleton variant="text" sx={{ width: "90%", height: 20 }} />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div class="bg-black backdrop-blur mt-10 px-2 flex justify-between  py-2 rounded-sm">
              <span
                onClick={() => handleChangeActiveTab("details")}
                class={`
              ${activeTab == "details" && "bg-[#FFFFFF] !text-[#000]"}
              lg:px-20 px-8 inline-block  cursor-pointer  rounded-sm py-1.5 text-white  lg:text-[14px] text-[12px] font-medium `}
              >
                Details
              </span>
              <span
                onClick={() => handleChangeActiveTab("features")}
                class={`
              ${activeTab == "features" && "bg-[#FFFFFF] !text-[#000]"}
              lg:px-20 px-8 inline-block  cursor-pointer  rounded-sm py-1.5 text-white  lg:text-[14px] text-[12px] font-medium `}
              >
                Features
              </span>
              <span
                onClick={() => handleChangeActiveTab("reviews")}
                class={`
              ${activeTab == "reviews" && "bg-[#FFFFFF] !text-[#000]"}
              lg:px-20 px-8 inline-block  cursor-pointer  rounded-sm py-1.5 text-white  lg:text-[14px] text-[12px] font-medium `}
              >
                Reviews
              </span>
            </div>

            {activeTab == "details" ? (
              <Details
                specifications={currentVariant?.specifications}
                description={productDetails?.description}
              />
            ) : activeTab == "features" ? (
              <Features keyFeatures={currentVariant?.keyFeatures} />
            ) : (
              <Reviews productId={productId} />
            )}
          </>
        )}

        <div className="lg:my-20 my-16">
          <h1 className="lg:text-2xl md:text-[24px] text-[20px] font-bold">
            Similar Products
          </h1>
          <div className="lg:pt-5 pt-3">
            <SimilarProduct />
          </div>
        </div>
      </div>
    </>
  );
};

function ProductDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10">
      <section className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-[15%] flex md:flex-col gap-3">
          {[1, 2, 3, 4].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={"100%"}
              height={80}
              className="rounded-md"
            />
          ))}
        </div>

        <div className="w-full md:w-[85%]">
          <Skeleton
            variant="rectangular"
            className="rounded-md w-full"
            sx={{
              height: {
                xs: 300,
                sm: 380,
                md: 450,
                lg: 550,
                xl: 600,
              },
            }}
          />
        </div>
      </section>

      <section>
        <Skeleton variant="text" height={30} width={"70%"} />

        <Skeleton variant="text" height={20} width={"90%"} />
        <Skeleton variant="text" height={20} width={"85%"} />

        <div className="mt-4 border border-gray-300 w-[150px] lg:w-[180px] px-3 py-2">
          <Skeleton variant="text" width={"60%"} height={25} />
        </div>

        <div className="mt-4">
          <Skeleton variant="text" width={"40%"} height={32} />
          <Skeleton variant="text" width={"60%"} height={20} />
        </div>

        <div className="mt-4">
          <Skeleton variant="text" width={80} height={20} className="mb-2" />
          <div className="flex gap-2">
            {[1, 2, 3].map((_, i) => (
              <Skeleton key={i} variant="circular" width={32} height={32} />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Skeleton variant="text" width={80} height={20} />
          <div className="flex flex-wrap gap-2 mt-2">
            {[1, 2, 3, 4].map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width={70}
                height={35}
                className="rounded-md"
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Skeleton variant="text" width={90} height={24} />

          <div className="flex gap-4 mt-2">
            <Skeleton
              variant="rectangular"
              width={120}
              height={40}
              className="rounded-md"
            />
            <Skeleton
              variant="rectangular"
              width={50}
              height={40}
              className="rounded-md"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Skeleton
            variant="rectangular"
            height={50}
            width={"100%"}
            className="rounded-md"
          />
          <Skeleton
            variant="rectangular"
            height={50}
            width={"100%"}
            className="rounded-md"
          />
        </div>

        <div className="flex mt-5 gap-3">
          {[1, 2, 3].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={220}
              height={110}
              className="rounded-xl"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
