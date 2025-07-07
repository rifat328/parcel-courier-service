import React from "react";
import { Button } from "@/components/ui/button";
const SignIn = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-sky-100">
      <section className="flex flex-col justify-center items-start pl-10 w-[80%] h-[80%] mt-4 max-w-md bg-gradient-to-r from-sky-150 to-purple-150 p-6 rounded-lg shadow-md backdrop-blur-2xl">
        <img src="null" alt="" srcset="" />
        <div className="welcome-container mt-8 mb-6 ">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-[0.7rem] mt-2 text-gray-600">
            Please enter your log in details below
          </p>
        </div>
        <form className="sign-in-form w-full ">
          <div className="form-group w-full py-2.5">
            <label htmlFor="email" hidden>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              className=" w-full py-2.5 placeholder:pl-1.5 caret-purple-200 focus:outline-none focus:ring-2 focus:ring-gray-800 rounded-md "
            />
          </div>
          <div className="form-group w-full py-2.5 mb-2.5">
            <label htmlFor="password" hidden>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              className="w-full py-2.5 placeholder:pl-1.5 caret-purple-200 focus:outline-none focus:ring-2 focus:ring-gray-800 rounded-md"
            />
          </div>
          <Button
            type="submit"
            className="w-full font-semibold text-2xl py-7 mb-6 cursor-pointer "
          >
            Sign In
          </Button>

          <p className="sign-up-link text-[0.8rem] text-gray-600">
            Don't have an account?{" "}
            <a className=" text-[1rem] font-bold pl-1" href="/sign-up">
              Sign Up
            </a>
          </p>
        </form>
      </section>
    </div>
  );
};

export default SignIn;
