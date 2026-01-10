import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-gray-600 bg-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
          {/* Branding */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-blue-600">ButtNetworks</h2>
            <p className="text-gray-600 text-sm max-w-xs">
              Building modern web solutions and creative projects with passion and precision.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h3 className="font-semibold mb-3 text-blue-600">Company</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  <Link href="/About" className="hover:text-gray-800 transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/ProjectsData" className="hover:text-gray-800 transition">
                    Projects
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-blue-600">Resources</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  <Link href="/FAQ" className="hover:text-gray-800 transition">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/About" className="hover:text-gray-800 transition">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="p-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="p-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-5"></div>

        {/* Bottom Section */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} ButtNetworks Admin-Dashboard. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
