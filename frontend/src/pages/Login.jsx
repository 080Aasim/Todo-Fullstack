import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:4000/api/user/login";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    try {
      const res = await axios.post(API, form);
      localStorage.setItem("token", res.data.token);
      if (res.data.success === true) {
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
            Login{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
