"use client";
import { useState } from "react";
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    address: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // event.preventDefault(); // might not need it .
    // const formData = new FormData(event.currentTarget);
    // const fromElement = event.currentTarget;
    // fromElement.reset();
    console.log("State change executed");
    console.log(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(`Final Submited Data ${formData}`);
  };

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

        <form onSubmit={handleSubmit} className="form flex flex-col gap-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="px-4 py-2 rounded-lg   focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="px-4 py-2 rounded-lg   focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="px-4 py-2 rounded-lg   focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
            value={formData.phone}
            onChange={handleChange}
          />

          <div className="flex items-center gap-2">
            <span className="font-medium px-2">Role</span>

            <div className="flex gap-3">
              {/* Customer */}
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  className="peer hidden"
                  checked={formData.role === "customer"}
                  onChange={handleChange}
                />
                <div
                  className="
                    px-4 py-2 rounded-full border
                    border-gray-300 text-gray-600
                    transition
                    peer-checked:bg-[#4EC4D9]
                    peer-checked:text-white
                    peer-checked:border-[#4EC4D9]
                     hover:border-[#4EC4D9]/60
                      peer-focus-visible:ring-2
                     peer-focus-visible:ring-[#4EC4D9]/40
                  "
                >
                  Customer
                </div>
              </label>

              {/* Agent */}
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="agent"
                  className="peer hidden"
                  checked={formData.role === "agent"}
                  onChange={handleChange}
                />
                <div
                  className="
                    px-4 py-2 rounded-full border
                    border-gray-300 text-gray-600
                    transition
                    peer-checked:bg-[#4EC4D9]
                    peer-checked:text-white
                    peer-checked:border-[#4EC4D9]
                     hover:border-[#4EC4D9]/60
                      peer-focus-visible:ring-2
                     peer-focus-visible:ring-[#4EC4D9]/40

                  "
                >
                  Agent
                </div>
              </label>
            </div>
          </div>

          <textarea
            name="address"
            placeholder="Address"
            rows={3}
            className="px-4 py-3 rounded-lg resize-none  focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:bg-white active:bg-white bg-white"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="px-4 py-2 rounded-lg   focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
            value={formData.password}
            onChange={handleChange}
          />
          {/* submit button */}
          <button
            type="submit"
            className="mt-4 bg-black text-white w-full py-3 rounded-lg font-semibold transition"
          >
            Create Account
          </button>
        </form>
      </div>
      <div className="promo hidden md:flex items-center justify-center bg-gray-100">
        <img src="" alt="" srcset="" />
      </div>
    </div>
  );
};

export default SignUp;
