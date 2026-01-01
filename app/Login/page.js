"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [isSignup, setIsSignup] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  /* ======================
     PASSWORD VALIDATION
  ====================== */
  const validatePassword = (value) => {
    setPassword(value);

    if (!isSignup) {
      setPasswordError("");
      return;
    }

    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  /* ======================
     AUTH HANDLER
  ====================== */
  const handleAuth = async () => {
    if (isSignup && passwordError) return;

    setLoading(true);
    setError("");
    setSuccess("");

    const name = document.getElementById("name")?.value;
    const email = document.getElementById("email").value;
    const pass = password;

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
        setTimeout(() => router.replace("/AdminPanel"), 1200);
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     PASSWORD STRENGTH
  ====================== */
  const passwordStrength = () => {
    if (password.length < 8) return "Weak";
    if (password.match(/[A-Z]/) && password.match(/[0-9]/))
      return "Strong";
    return "Good";
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT */}
      <div className="md:w-1/2 bg-blue-600 flex items-center justify-center p-10 text-white">
        <div>
          <Image
            src="/butt.png"
            alt="Butt Networks"
            width={150}
            height={150}
            className="mx-auto rounded-full mb-6"
          />
          <h1 className="text-4xl font-bold mb-3">
            Welcome to <span className="text-yellow-300">Butt Networks</span>
          </h1>
          <p>
            {isSignup
              ? "Create your account to get started."
              : "Login to access your admin dashboard."}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="md:w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            {isSignup ? "Sign Up" : "Login"}
          </h2>

          {isSignup && (
            <input
              id="name"
              placeholder="Enter Name"
              className="mb-4 w-full px-4 py-3 rounded-xl text-black"
            />
          )}

          <input
            id="email"
            placeholder="Enter Email"
            className="mb-4 w-full px-4 py-3 rounded-xl text-black"
          />

          {/* PASSWORD */}
          <div className="relative mb-2">
            <input
              id="pass"
              type={showPass ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => validatePassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-black pr-12"
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute top-1/2 right-3 -translate-y-1/2"
            >
              {showPass ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* PASSWORD FEEDBACK */}
          {isSignup && (
            <p
              className={`text-sm mb-3 ${
                passwordStrength() === "Strong"
                  ? "text-green-500"
                  : passwordStrength() === "Good"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              Password strength: {passwordStrength()}
              {passwordError && ` • ${passwordError}`}
            </p>
          )}

          <button
            onClick={handleAuth}
            disabled={loading || (isSignup && passwordError)}
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            {loading
              ? "Processing..."
              : isSignup
              ? "Sign Up"
              : "Login"}
          </button>

          <p
            onClick={() => setIsSignup(!isSignup)}
            className="mt-6 text-center cursor-pointer text-blue-600"
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </p>

          {error && (
            <p className="text-center mt-4 text-red-500">{error}</p>
          )}
        </div>
      </div>

      {/* SUCCESS TOAST */}
      {success && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg">
          {success}
        </div>
      )}
    </section>
  );
}
