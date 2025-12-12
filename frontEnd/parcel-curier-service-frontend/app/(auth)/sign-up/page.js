"use client";
import { useState } from "react";
const SignUp = () => {
  return (
    <div className="main min-h-screen bg-[linear-gradient(to_bottom_right,#87E5FF_0%,#FFDFaa_32%,#FF9797_42%,#E3DEDB_87%)] flex items-center justify-center p-6">
      <div className="sign-up-form bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl w-full max-w-xl p-10">
        <div className="logo"></div>

        <div className="heading">
          <h1>Sign-up</h1>
          <p>Please enter your details below</p>
        </div>

        <div className="form">
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="email" placeholder="Email" />
          <input type="text" name="phone" placeholder="Phone" />
          <input type="text" name="role" />
          <input type="text" name="address" placeholder="Address" />
          <input type="password" name="password" placeholder="Password" />
        </div>
      </div>
      <div className="promo hidden md:flex items-center justify-center bg-gray-100">
        <img src="" alt="" srcset="" />
      </div>
    </div>
  );
};

export default SignUp;
