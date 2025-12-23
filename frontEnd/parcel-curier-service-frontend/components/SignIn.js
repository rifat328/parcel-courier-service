"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

import { useAuth } from "../context/AuthContext.js";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUser } = useAuth(); // Access setUser from AuthContext to update user state after login
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const signInRoute = process.env.NEXT_PUBLIC_API_SIGN_IN_ROUTE;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.error("Email and password are required");
      return;
    }
    try {
      console.log(apiBaseUrl);
      const res = await axios.post(
        `${apiBaseUrl}${signInRoute}`,
        {
          email,
          password,
        },
        { withCredentials: true }
      ); // Include credentials to handle cookies
      if (res.status !== 200) {
        throw new Error("Login failed");
      }
      // Update user state in context
      const user = res.data.data.user;
      setUser(user);
      // redirect to dashboard based on user role
      if (user.role === "customer") {
        router.push("/dashboard/customer");
      } else if (user.role === "admin") {
        setTimeout(() => {
          router.push("/dashboard/admin");
        }, 1500);
      } else if (user.role === "agent") {
        router.push("/dashboard/agent");
      } else {
        throw new Error("Unknown user role");
      }

      console.log("Login successful:", res.data); // Log the entire response for debugging

      console.log("User json.stringyfy test :", JSON.stringify(user));
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      console.error("Login failed:", message);
    }
  };

  return (
    <div className="main min-h-screen bg-[linear-gradient(to_bottom_right,#87E5FF_0%,#FFDFaa_32%,#FF9797_42%,#E3DEDB_87%)] flex items-center justify-center p-6">
      <section className="flex flex-col bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl w-full max-w-xl p-10  justify-center items-start pl-10  bg-gradient-to-r from-sky-150 to-purple-150 ">
        <div className="sign-in-form ">
          <div className="logo text-4xl mb-4 font-nico tracking-widest">
            <span className="font-nico text-[#4EC4D9]">P</span>
            <span className="font-nico text-[#DB9118]">C</span>
            <span className="font-nico text-[#D94E4E]">S</span>
          </div>
        </div>

        <div className="heading mb-2 ml-2">
          <h1 className="text-2xl mb-1   font-nico tracking-wide">Sign-in</h1>
          <p className=" text-gray-600 mt-1">Please enter your details below</p>
        </div>

        <form className="sign-in-form w-full" onSubmit={handleSubmit}>
          <div className="form-group w-full py-2.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="px-4 py-2 rounded-lg  w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
            />
          </div>
          <div className="form-group w-full py-2.5 ">
            <input
              type="password"
              className="px-4 py-2 rounded-lg  w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <Button
            type="submit"
            className="w-full font-[500] font-roboto text-[1.3rem] py-7 mb-6 cursor-pointer"
          >
            Sign In
          </Button>

          <p className="sign-up-link text-[0.8rem] text-gray-600">
            Don't have an account?{" "}
            <a className="text-[1rem] font-bold pl-1" href="/sign-up">
              Sign Up
            </a>
          </p>
        </form>
      </section>
    </div>
  );
};

export default SignIn;
