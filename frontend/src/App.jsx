import "./App.css";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import { TodoContextProvider } from "./context/TodoContext";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <TodoContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Routes>
        {/* <TodoList /> */}
      </TodoContextProvider>
    </AuthProvider>
  );
}

export default App;
