"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("SignIn component mounted");
    localStorage.setItem("token", token);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-sky-100">
      <section className="flex flex-col justify-center items-start pl-10 w-[80%] h-[80%] mt-4 max-w-md bg-gradient-to-r from-sky-150 to-purple-150 p-6 rounded-lg shadow-md backdrop-blur-2xl">
        <div class="logo">
          <h1 className="text-3xl font-[800] font-nato-serif">
            <span className="text-purple-600 font-roboto font-[700] italic">
              P
            </span>
            <span className="text-purple-900 font-roboto font-[700] italic">
              C
            </span>
            <span className="text-yellow-500 font-roboto font-[700] italic">
              S
            </span>
          </h1>
        </div>
        <div className="welcome-container mt-8 mb-6 ">
          <h1 className="text-3xl font-[600]">Welcome Back</h1>
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
              className=" w-full py-2.5 placeholder:pl-1.5 caret-purple-200 focus:outline-none focus:ring-2 focus:ring-gray-800 rounded-md  border-2 border-gray-300"
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
              className="w-full py-2.5 placeholder:pl-1.5 caret-purple-200 focus:outline-none focus:ring-2 focus:ring-gray-800 rounded-md border-2 border-gray-300"
            />
          </div>
          <Button
            type="submit"
            className="w-full font-[500] font-roboto text-[1.3rem] py-7 mb-6 cursor-pointer "
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

// new updated code

// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
//         email,
//         password,
//       });

//       const { token } = res.data; // or res.data.data.token depending on your backend structure
//       localStorage.setItem("token", token);

//       // optional redirect
//       router.push("/dashboard");

//     } catch (err) {
//       console.error("Login failed:", err?.response?.data?.message || err.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-sky-100">
//       <section className="flex flex-col justify-center items-start pl-10 w-[80%] h-[80%] mt-4 max-w-md bg-gradient-to-r from-sky-150 to-purple-150 p-6 rounded-lg shadow-md backdrop-blur-2xl">
//         <div className="logo">
//           <h1 className="text-3xl font-[800] font-nato-serif">
//             <span className="text-purple-600 font-roboto font-[700] italic">P</span>
//             <span className="text-purple-900 font-roboto font-[700] italic">C</span>
//             <span className="text-yellow-500 font-roboto font-[700] italic">S</span>
//           </h1>
//         </div>
//         <div className="welcome-container mt-8 mb-6 ">
//           <h1 className="text-3xl font-[600]">Welcome Back</h1>
//           <p className="text-[0.7rem] mt-2 text-gray-600">
//             Please enter your log in details below
//           </p>
//         </div>
//         <form className="sign-in-form w-full" onSubmit={handleSubmit}>
//           <div className="form-group w-full py-2.5">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               required
//               className="w-full py-2.5 placeholder:pl-1.5 caret-purple-200 focus:outline-none focus:ring-2 focus:ring-gray-800 rounded-md border-2 border-gray-300"
//             />
//           </div>
//           <div className="form-group w-full py-2.5 mb-2.5">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               required
//               className="w-full py-2.5 placeholder:pl-1.5 caret-purple-200 focus:outline-none focus:ring-2 focus:ring-gray-800 rounded-md border-2 border-gray-300"
//             />
//           </div>
//           <Button
//             type="submit"
//             className="w-full font-[500] font-roboto text-[1.3rem] py-7 mb-6 cursor-pointer"
//           >
//             Sign In
//           </Button>

//           <p className="sign-up-link text-[0.8rem] text-gray-600">
//             Don't have an account?{" "}
//             <a className="text-[1rem] font-bold pl-1" href="/sign-up">
//               Sign Up
//             </a>
//           </p>
//         </form>
//       </section>
//     </div>
//   );
// };

// export default SignIn;
