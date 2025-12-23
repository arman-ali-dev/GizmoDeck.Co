import React from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { Link } from "react-router-dom";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#000]  lg:px-14 px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5 lg:grid-cols-5 py-[40px] lg:py-[100px]">
          <div className="col-span-2">
            <div>
              <h1 className="font-semibold text-white text-[17px] lg:text-[22px]">
                GizmoDeck.Co
              </h1>
            </div>

            <div className="lg:mt-5 mt-3">
              <form>
                <label className="lg:text-[16px]   text-[13px] block text-white font-medium">
                  Join Our Newsletter
                </label>

                <div className="mt-4 relative lg:w-[300px]">
                  <input
                    className="lg:text-[15px] text-white outline-none text-[12px] border-[#eee] px-6 w-full py-0.5  border-b  placeholder:text-[#eee]"
                    type="text"
                    placeholder="Enter your Email..."
                  />
                  <EmailOutlinedIcon
                    sx={{
                      color: "#eee",
                      fontSize: 17,
                      position: "absolute",
                      left: 2,
                      top: 3,
                    }}
                  />
                  <div className="bg-[var(--primary-color)] top-0 absolute right-0 flex justify-center items-center h-[20px] w-[20px] rounded-full">
                    <EastOutlinedIcon sx={{ color: "#eee", fontSize: 12 }} />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-span-1 mt-8 md:mt-0">
            <h3 className="font-medium lg:text-[17px] text-[13px] text-white">
              Quick Link
            </h3>

            <ul className="lg:mt-5 mt-3 lg:text-[16px] text-[12px] space-y-2 lg:space-y-4 text-white">
              <li>
                <Link>Home</Link>
              </li>

              <li>
                <Link>Shop</Link>
              </li>

              <li>
                <Link>Deals & Offers</Link>
              </li>

              <li>
                <Link>Today's Offers</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 mt-8 md:mt-0">
            <h3 className="font-medium lg:text-[17px] text-[13px] text-white">
              Support
            </h3>

            <ul className="lg:mt-5 mt-3 lg:text-[16px] text-[12px] space-y-2 lg:space-y-4 text-white">
              <li>
                <Link>Contact Us</Link>
              </li>

              <li>
                <Link>FAQs</Link>
              </li>

              <li>
                <Link>Shopping Info</Link>
              </li>

              <li>
                <Link>Return Policy</Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1 col-span-2 mt-8 md:mt-0">
            <h3 className="font-medium lg:text-[17px] text-[13px] text-white">
              Contact Us
            </h3>

            <ul className="lg:mt-5 mt-3 lg:text-[16px] text-[12px] space-y-2 lg:space-y-4 text-white">
              <li>
                <Link>
                  <PlaceOutlinedIcon sx={{ fontSize: 17 }} /> 123 Maple Street,
                  Springfield
                </Link>
              </li>

              <li>
                <Link>
                  <LocalPhoneIcon sx={{ fontSize: 18 }} /> +91 7665407031
                </Link>
              </li>

              <li>
                <Link>
                  <EmailOutlinedIcon sx={{ fontSize: 17 }} /> arman@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-center py-[16px] lg:py-[30px] border-[rgba(255,255,255,0.7)] border-t text-center lg:text-left ">
          <p className="lg:text-[15px] text-[12px] text-[rgba(255,255,255,0.6)]">
            © <span className="numText">2024</span> Copyright{" "}
          </p>

          <ul className="flex lg:justify-start justify-center lg:gap-10 gap-4 text-[12px] lg:text-[15px] text-[rgba(255,255,255,0.6)]">
            <li>
              <Link>Privacy Policy</Link>
            </li>
            <li>
              <Link>Terms & Condition</Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
