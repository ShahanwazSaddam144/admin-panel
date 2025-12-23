"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const router = useRouter();

  const handleMenu = () => {
    setMenu((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include", // 🔑 important
      });

      router.replace("/"); // back to login
    } catch (err) {
      console.error("Logout failed");
    }
  };

  return (
    <>
      <nav className="backdrop-blur-md bg-white fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

          {/* Logo */}
          <Link
          href="/MainApp"
          >
          <h1 className="text-gray-900 font-extrabold text-2xl tracking-wide">
            Butt Networks
          </h1>
          </Link>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={handleMenu}
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg 
                         hover:bg-blue-600 transition-all duration-300"
            >
              Menu
            </button>

            {menu && (
              <div className="absolute right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden w-48">

                <Link
                  href="https://buttnetworks.com/"
                  target="_blank"
                  className="block px-4 py-2 text-white hover:bg-blue-600 transition"
                  onClick={() => setMenu(false)}
                >
                  Website Page
                </Link>

                <Link
                  href="https://dev.projects.buttnetworks.com/"
                  target="_blank"
                  className="block px-4 py-2 text-white hover:bg-blue-600 transition"
                  onClick={() => setMenu(false)}
                >
                  Dev Panel
                </Link>

                {/* Divider */}
                <div className="border-t border-slate-700"></div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-600 hover:text-white transition"
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
