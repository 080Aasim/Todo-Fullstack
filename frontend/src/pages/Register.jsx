import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:4000/api/user/register";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(form);
      const res = await axios.post(API, form);
      if (res.data.success === true) {
        navigate("/verify-otp");
      }
    } catch (error) {
      console.log(error.message);
      console.log("AXIOS ERROR:", error.response?.data || error.message);
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
          <label htmlFor="name">Username</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border"
            id="name"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="border"
            onChange={handleChange}
            value={form.email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border"
            onChange={handleChange}
            value={form.password}
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

export default Register;
