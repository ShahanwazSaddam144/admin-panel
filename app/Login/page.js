"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react"; // Eye icons

export default function AuthPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [isSignup, setIsSignup] = useState(false); // toggle login/signup
  const [showPass, setShowPass] = useState(false); // toggle password visibility

  const handleAuth = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    const name = document.getElementById("name")?.value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    try {
      const endpoint = isSignup
        ? "http://localhost:5000/signup"
        : "http://localhost:5000/login";

      const bodyData = isSignup ? { name, email, pass } : { email, pass };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(
          isSignup
            ? "Signup successful! Redirecting..."
            : "Login successful! Redirecting..."
        );
        setTimeout(() => {
          router.replace("/AdminPanel");
        }, 1200);
      } else {
        setError(data.message || (isSignup ? "Signup failed" : "Login failed"));
      }
    } catch {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row">

      {/* Left Side */}
      <div className="md:w-1/2 bg-blue-600 flex flex-col items-center justify-center text-white p-10 relative overflow-hidden">
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
            Securely manage your projects and workflows.{" "}
            {isSignup
              ? "Sign up to create your account."
              : "Log in to access your dashboard and all features."}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20 text-white animate-slideUp">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8 tracking-wide">
            {isSignup ? "Sign Up" : "Login"}
          </h2>

          <div className="space-y-6">
            {isSignup && (
              <input
                id="name"
                placeholder="Enter Name"
                className="text-black w-full px-5 py-3 rounded-xl bg-white/20 placeholder-gray-500 border border-white/20 focus:outline-none focus:border-blue-400 transition"
              />
            )}

            <input
              id="email"
              placeholder="Enter Email"
              className="text-black w-full px-5 py-3 rounded-xl bg-white/20 placeholder-gray-500 border border-white/20 focus:outline-none focus:border-blue-400 transition"
            />

            {/* Password with show/hide */}
            <div className="relative">
              <input
                id="pass"
                type={showPass ? "text" : "password"}
                placeholder="Enter Password"
                className="text-black w-full px-5 py-3 rounded-xl bg-white/20 placeholder-gray-500 border border-white/20 focus:outline-none focus:border-blue-400 transition pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-700"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              onClick={handleAuth}
              disabled={loading}
              className={`w-full py-3 rounded-xl text-lg font-semibold transition shadow-lg active:scale-95
                ${loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-700/40"
                }`}
            >
              {loading
                ? isSignup
                  ? "Signing up..."
                  : "Checking..."
                : isSignup
                ? "Sign Up"
                : "Login"}
            </button>
          </div>

          {/* Toggle Login/Signup */}
          <p
            onClick={() => setIsSignup(!isSignup)}
            className="mt-6 text-center cursor-pointer text-blue-600 transition"
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </p>

          {error && (
            <p className="mt-6 text-center text-red-400 font-semibold">{error}</p>
          )}
        </div>
      </div>

      {/* Success Toast */}
      {success && (
        <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
          <div className="flex items-center gap-4 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl border border-green-400">
            <span className="text-lg font-semibold">✅</span>
            <p className="font-medium">{success}</p>
          </div>
        </div>
      )}
    </section>
  );
}
