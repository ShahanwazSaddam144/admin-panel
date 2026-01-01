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
      <nav className="backdrop-blur-md bg-white border-b fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/AdminPanel">
            <h1 className="text-gray-900 font-extrabold text-2xl cursor-pointer">
              Butt Networks
            </h1>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-4 relative">
            {/* User Initial → Profile Page */}
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
              onClick={() => setMenu(!menu)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Menu
            </button>

            {/* Menu Dropdown */}
            {menu && (
              <div className="absolute right-0 top-14 bg-slate-800 rounded-lg w-48 overflow-hidden z-40">
                <Link
                  href="https://buttnetworks.com/"
                  target="_blank"
                  className="block px-4 py-2 text-white hover:bg-blue-600"
                >
                  Our Website
                </Link>

                <Link
                  href="/ProjectPanel"
                  className="block px-4 py-2 text-white hover:bg-blue-600"
                >
                  Project Panel
                </Link>

                <Link
                  href="/LanguagePanel"
                  className="block px-4 py-2 text-white hover:bg-blue-600"
                >
                  Language Panel
                </Link>

                <div className="border-t border-slate-700" />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-600 hover:text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
