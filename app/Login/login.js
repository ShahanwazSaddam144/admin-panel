"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, pass }),
      });

      const data = await res.json();

      if (res.ok) {
        router.replace("/MainApp");
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row">
      
      {/* Left Side - Logo & Info */}
      <div className="md:w-1/2 bg-blue-600 flex flex-col items-center justify-center text-white p-10 relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>

        <div className="relative z-10 text-center md:text-left max-w-sm">
          <Image
            src="/butt.png"
            alt="Butt Networks"
            width={150}
            height={150}
            className="mx-auto md:mx-0 rounded-full drop-shadow-2xl mb-6"
          />

          <h1 className="text-4xl font-bold mb-4">
            Welcome to <span className="text-yellow-300">Butt Networks</span>
          </h1>
          <p className="text-lg text-white/90">
            Securely manage your projects and workflows. Log in to access your dashboard and all features.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="md:w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20 text-white animate-slideUp">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8 tracking-wide">
            Login
          </h2>

          <div className="space-y-6">
            <input
              id="email"
              placeholder="Enter Email"
              className="w-full px-5 py-3 rounded-xl bg-white/20 placeholder-gray-300 border border-white/20 focus:outline-none focus:border-blue-400 transition"
            />
            <input
              id="pass"
              type="password"
              placeholder="Enter Password"
              className="w-full px-5 py-3 rounded-xl bg-white/20 placeholder-gray-300 border border-white/20 focus:outline-none focus:border-blue-400 transition"
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full py-3 rounded-xl text-lg font-semibold transition shadow-lg active:scale-95
                ${loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-700/40"
                }`}
            >
              {loading ? "Checking..." : "Login"}
            </button>
          </div>

          {error && (
            <p className="mt-6 text-center text-red-400 font-semibold">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
