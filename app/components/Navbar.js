"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [user, setUser] = useState(null);

  const router = useRouter();

  /* ======================
     LOGOUT
  ====================== */
  const handleLogout = async () => {
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });
    router.replace("/");
  };

  /* ======================
     FETCH USER
  ====================== */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/me", {
          credentials: "include",
        });
        const data = await res.json();
        setUser(data);
      } catch {
        console.error("Failed to fetch user");
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      {/* ======================
          NAVBAR
      ====================== */}
      <nav className="backdrop-blur-md bg-white border-b fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/Admin-Dashboard">
            <h1 className="text-gray-900 font-extrabold text-2xl cursor-pointer">
              Butt Networks
            </h1>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* User Initial */}
            {user && (
              <div
                onClick={() => router.push("/userProfile")}
                className="w-10 h-10 bg-blue-500 text-white rounded-full
                flex items-center justify-center font-bold text-lg
                cursor-pointer hover:bg-blue-600 transition"
                title="Profile"
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Menu Button */}
            <button
              onClick={() => setMenu(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Menu
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16" />

      {/* ======================
          SIDEBAR OVERLAY
      ====================== */}
      {menu && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setMenu(false)}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Sidebar */}
          <aside className="fixed right-0 top-0 h-full w-80 bg-white z-50 shadow-2xl animate-slide-in">
            <div className="p-6 flex flex-col h-full">

              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-800">
                  Menu
                </h2>
                <button
                  onClick={() => setMenu(false)}
                  className="text-gray-500 hover:text-gray-800 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-4 text-gray-700">

                <Link
                  href="/Admin-Dashboard"
                  onClick={() => setMenu(false)}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Dashboard
                </Link>

                <Link
                  href="/ProjectPanel"
                  onClick={() => setMenu(false)}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Project Panel
                </Link>

                <Link
                  href="/LanguagePanel"
                  onClick={() => setMenu(false)}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Language Panel
                </Link>

                <Link
                  href="/userProfile"
                  onClick={() => setMenu(false)}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Profile
                </Link>

                <Link
                  href="/About"
                  onClick={() => setMenu(false)}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  About
                </Link>

                <Link
                  href="/faq"
                  onClick={() => setMenu(false)}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  FAQ
                </Link>

                <a
                  href="https://buttnetworks.com/"
                  target="_blank"
                  onClick={() => setMenu(false)}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Our Website
                </a>

              </nav>

              {/* Divider */}
              <div className="my-6 border-t" />

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="mt-auto px-4 py-2 text-left rounded-lg
                text-red-600 hover:bg-red-600 hover:text-white transition"
              >
                Logout
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Navbar;
