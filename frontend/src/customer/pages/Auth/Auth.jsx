import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <div className="flex justify-center h-[90vh] items-center">
        <div className="py-8  md:w-[450px] w-full rounded-md shadow-lg">
          <div className="py-3">
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </div>
          <div className="flex items-center gap-1 justify-center mt-3">
            <p className="lg:text-[16px] text-[13px]">
              {isLogin && "Don't"} Have Account ?
            </p>
            <button
              size="small"
              className="text-black cursor-pointer lg:text-[16px] text-[13px]"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create Account" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
