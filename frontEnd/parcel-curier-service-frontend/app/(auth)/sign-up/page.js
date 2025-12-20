"use client";
import { useState } from "react";
const SignUp = () => {
  return (
    <div className="main min-h-screen bg-[linear-gradient(to_bottom_right,#87E5FF_0%,#FFDFaa_32%,#FF9797_42%,#E3DEDB_87%)] flex items-center justify-center p-6">
      <div className="sign-up-form bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl w-full max-w-xl p-10">
        <div className="logo mb-6 text-4xl  font-nico tracking-widest">
          <span className="font-nico text-[#4EC4D9]">P</span>
          <span className="font-nico text-[#DB9118]">C</span>
          <span className="font-nico text-[#D94E4E]">S</span>
        </div>

        <div className="heading mb-2">
          <h1 className="text-2xl mb-1   font-nico tracking-wide">Sign-up</h1>
          <p className=" text-gray-600 mt-1">Please enter your details below</p>
        </div>

        <div className="form flex flex-col gap-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="px-4 py-2 rounded-lg   focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="px-4 py-2 rounded-lg   focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="px-4 py-2 rounded-lg   focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
          />
          {/* Role Radio Buttons */}
          <div className="flex px-4 py-2 gap-2 bg-white rounded-lg ">
            <span className="pr-5 text-gray-400"> Role</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  className="radio radio-sm  checked:accent-cyan-300"
                />
                <span>Customer</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="agent"
                  className="radio radio-sm checked:accent-cyan-300"
                />
                <span>Agent</span>
              </label>
            </div>
          </div>

          <input
            type="text"
            name="address"
            placeholder="Address"
            className="px-4 py-2 rounded-lg   focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="px-4 py-2 rounded-lg   focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
          />
          {/* submit button */}
          <button
            type="submit"
            className="mt-4 bg-black text-white w-full py-3 rounded-lg font-semibold transition"
          >
            Create Account
          </button>
        </div>
      </div>
      <div className="promo hidden md:flex items-center justify-center bg-gray-100">
        <img src="" alt="" srcset="" />
      </div>
    </div>
  );
};

export default SignUp;
