import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu((prev) => !prev); 
  };

  return (
    <>
      <nav className="backdrop-blur-md bg-white  fixed top-0 left-0 w-full z-50 ">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

          {/* Logo */}
          <h1 className="text-gray-900 font-extrabold text-2xl tracking-wide">
            Butt Networks
          </h1>

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
              <div className="absolute right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden w-40">

                <Link
                  href="https://buttnetworks.com/"
                  target="_blank"
                  className="block px-4 py-2 text-white hover:bg-blue-600 transition"
                >
                  Website Page
                </Link>

                <Link
                  href="https://dev.projects.buttnetworks.com/"
                  target="_blank"
                  className="block px-4 py-2 text-white hover:bg-blue-600 transition"
                >
                 Dev Panel
                </Link>

              </div>
            )}

          </div>
        </div>
      </nav>

      {/* Space so page content doesn't hide behind navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
