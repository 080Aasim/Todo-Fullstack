import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:4000/api/user/verify-otp";

function VerifyOtp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    otp: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: [e.target.value] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API, form);
      if (res.data.success === true) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center flex-col"
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="border"
            onChange={handleChange}
            value={form.email}
          />
          <label htmlFor="otp">OTP</label>
          <input
            type="text"
            name="otp"
            id="otp"
            className="border"
            onChange={handleChange}
            value={form.otp}
          />
          <button
            type="submit"
            className="bg-black text-white mt-2 p-2 rounded cursor-pointer"
          >
            {" "}
            Register{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;
