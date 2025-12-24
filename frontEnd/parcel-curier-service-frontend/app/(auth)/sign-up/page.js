"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const SignUp = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    address: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // event.preventDefault(); // might not need it .
    // const formData = new FormData(event.currentTarget);
    // const fromElement = event.currentTarget;
    // fromElement.reset();
    console.log("State change executed");
    console.log(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    setLoading(true);
    setServerError({ type: "", text: "" });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_SIGN_UP_ROUTE}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      // console.log(data.message);
      // 409 Conflict  / 400 Bad Request / 500 Internal Server Error on rest
      if (res.status === 409) {
        setServerError({
          type: "error",
          text: "User already exists! Redirecting to Sign-in...",
        });
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      } else if (res.ok) {
        setServerError({
          type: "success",
          text: "Account created! Redirecting...",
        });
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      } else {
        setServerMsg({
          type: "error",
          text: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setServerError({
        type: "error",
        text: "Server is unreachable. Check your connection.",
      });
    } finally {
      setLoading(false);
    }

    console.log(`Final Submited Data ${JSON.stringify(formData, null, 2)}`);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    const phoneRegex = /^\d{11}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 11 digits";
    }

    if (!formData.role) {
      newErrors.role = "Please select a role";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    //  returns true if no errors
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="main min-h-screen bg-[linear-gradient(to_bottom_right,#87E5FF_0%,#FFDFaa_32%,#FF9797_42%,#E3DEDB_87%)] flex items-center justify-center p-6">
      <div className="sign-up-form bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl w-full max-w-xl p-10">
        <div className="logo mb-6 text-4xl  font-nico tracking-widest">
          <span className="font-nico text-[#4EC4D9]">P</span>
          <span className="font-nico text-[#DB9118]">C</span>
          <span className="font-nico text-[#D94E4E]">S</span>
        </div>
        {serverError.text && (
          <div
            className={`mb-4 p-3 rounded-lg text-center text-sm font-medium animate-pulse ${
              serverError.type === "error"
                ? "bg-red-100 text-red-500"
                : "bg-green-100 text-green-500"
            }`}
          >
            {serverError.text}
          </div>
        )}
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
          {errors.name && (
            <p className="text-sm ml-2 text-red-500">{errors.name}</p>
          )}
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="px-4 py-2 rounded-lg   focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-sm ml-2 text-red-500">{errors.email}</p>
          )}
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="px-4 py-2 rounded-lg   focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-sm ml-2 text-red-500">{errors.phone}</p>
          )}

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
            {errors.role && (
              <p className="text-sm ml-2 text-red-500">{errors.role}</p>
            )}
          </div>

          <textarea
            name="address"
            placeholder="Address"
            rows={3}
            spellCheck={false}
            className="px-4 py-3 rounded-lg resize-none text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:bg-white  bg-white"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && (
            <p className="text-sm ml-2 text-red-500">{errors.address}</p>
          )}

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="px-4 py-2 rounded-lg   w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-sm ml-2 text-red-500">{errors.password}</p>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? (
                <FaEyeSlash className="text-xl" />
              ) : (
                <FaEye className="text-xl" />
              )}
            </button>
          </div>

          {/* submit button */}
          {serverError.type === "error" && (
            <p className="text-sm text-red-600 text-center">
              {serverError.text}
            </p>
          )}
          <button
            type="submit"
            className={`mt-4 w-full py-3 rounded-lg font-semibold transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"
            }`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="promo md:flex flex-col justify-center items-center bg-gradient-to-br from-[#4EC4D9] to-[#87E5FF] text-white p-10 relative">
          {/* Decorative blur */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />

          {/* Image */}
          <img
            src="/images/delivery.svg"
            alt="Parcel Delivery"
            className="w-72 mb-8 drop-shadow-xl"
          />

          {/* Text */}
          <h2 className="text-3xl font-nico tracking-wide mb-4 text-center">
            Fast & Reliable Delivery
          </h2>

          <p className="text-center text-white/90 max-w-sm">
            Send, track, and manage parcels effortlessly. Built for customers,
            agents, and admins.
          </p>

          {/* Feature list */}
          <ul className="mt-6 space-y-2 text-sm">
            <li>🚚 Real-time tracking</li>
            <li>🔒 Secure authentication</li>
            <li>⚡ Fast delivery workflow</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
