import { useContext, useState } from "react";
import {  useAuth } from "../UserContext";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const auth = useAuth();

  const login = (e) => {
    e.preventDefault();
    if(input.username !== "" && input.password !== ""){
      auth.loginAction(input)
      return;
    }
    alert("Please Provide Correct Input")
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-8">
      <h1 className="flex justify-center text-4xl font-bold">Login</h1>
      <form className=" flex flex-col space-y-8" onSubmit={login}>
        <input
          type="email"
          placeholder="email@gmail.com"
          className="p-4 rounded-md hover:border-gray-700 border-transparent border-2"
          name="username"
          onChange={handleInput}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 rounded-lg hover:border-gray-700 border-transparent border-2"
          name="password"
          onChange={handleInput}
        />
        <div className="flex items-center justify-center">
          <button className="p-2 bg-gray-700 hover:bg-gray-900 w-20 rounded-lg text-white">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
