import { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { useContext } from "react";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login"; // SAFE redirect
//     }
//     return Promise.reject(error);
//   },
// );

const API = "/todo";

export const TodoContext = createContext({});

export const TodoContextProvider = (props) => {
  const {token} = useContext(AuthContext);
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    if(!token) return;
    const getTodos = async () => {
      try {
        const res = await api.get(API);
        if (res.data.success) {
          setTodo(res.data.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getTodos();
  }, [token]);

  // Add Todo
  const add = async (newTodo) => {
    try {
      const res = await api.post(API, newTodo);
      if (res.data.success) {
        setTodo((prevTodo) => [...prevTodo, res.data.data]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const remove = async (id) => {
    try {
      const res = await api.delete(`${API}/${id}`);
      if (res.data.success) {
        setTodo((prevTodo) => prevTodo.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChecked = async (id) => {
    try {
      const res = await api.patch(`${API}/${id}`);
      if (res.data.success) {
        setTodo((prev) => prev.map((t) => (t._id === id ? res.data.data : t)));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const contextValue = {
    todo,
    add,
    remove,
    setTodo,
    handleChecked,
  };
  return (
    <TodoContext.Provider value={contextValue}>
      {props.children}
    </TodoContext.Provider>
  );
};
