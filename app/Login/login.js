"use client";

import React, { useState } from "react";
import Image from "next/image";
import Main from "../MainApp/Main";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    const name = document.getElementById("Name").value;
    const password = document.getElementById("Password").value;
    const result = document.getElementById("Result");

    const user = process.env.NEXT_PUBLIC_NAME;
    const pass = process.env.NEXT_PUBLIC_PASSWORD;

    if (name === user && password === pass) {
      result.innerText = "Access Granted";
      result.classList.remove("text-red-500");
      result.classList.add("text-green-500");

      setTimeout(() => setLoggedIn(true), 2000);
    } else {
      result.innerText = "Invalid Credentials";
      result.classList.remove("text-green-500");
      result.classList.add("text-red-500");

      setTimeout(() => (result.innerText = ""), 2500);
    }
  };

  if (loggedIn) {
    return <Main />;
  }

  return (
    <section id="Login-Section" className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center px-4">

      {/* Logo */}
      <div className="mb-6 animate-fadeIn">
        <Image
          src="/butt.png"
          alt="Logo"
          width={150}
          height={150}
          className="drop-shadow-lg rounded-full"
        />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 text-white animate-slideUp">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">
          Login to Butt Networks
        </h2>

        {/* Inputs */}
        <div className="space-y-5">
          <input
            type="text"
            placeholder="Enter Name"
            id="Name"
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-gray-300 
            border border-white/20 focus:outline-none focus:border-blue-400 transition"
          />

          <input
            type="password"
            placeholder="Enter Password"
            id="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-gray-300 
            border border-white/20 focus:outline-none focus:border-blue-400 transition"
          />

          {/* Login Button */}
          <button
            className="w-full bg-blue-600 py-3 rounded-lg text-lg font-semibold 
            hover:bg-blue-700 transition shadow-lg hover:shadow-blue-700/40 active:scale-95"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>

        {/* Result Text */}
        <p id="Result" className="mt-4 text-center font-semibold text-lg"></p>
      </div>

      {/* Footer */}
      <p className="text-gray-300 mt-6 tracking-wide text-sm">
        © {new Date().getFullYear()} Butt Networks • Secure Access Panel
      </p>
    </section>
  );
};

export default Login;
