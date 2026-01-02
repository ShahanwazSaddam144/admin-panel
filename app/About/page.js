import React from "react";
import { Github } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <section className="bg-transparent">
        <header className="flex flex-col min-h-screen justify-center items-center px-4 md:px-10">
          <h1 className="text-4xl sm:text-5xl md:text-[50px] text-gray-900 font-extrabold text-center">
            Client & Developer
            <span className="ml-2 sm:ml-3 text-blue-600 block sm:inline">
              Collaboration Platform
            </span>
          </h1>
          <p className="text-center w-full sm:w-4/5 md:w-3/5 text-gray-700 font-semibold mt-5 text-sm sm:text-base md:text-lg">
            A single-platform collaboration tool that replaced fragmented
            email/chat processes and automated progress reporting — improving
            transparency and reducing manual status updates.
          </p>
          <a
            href="https://github.com/ShahanwazSaddam144/admin-panel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="mt-10 bg-blue-600 px-6 py-2 hover:bg-blue-700 text-white
                         rounded-[5px] font-medium cursor-pointer flex items-center gap-2"
            >
              <Github size={18} />
              View Repo
            </button>
          </a>
        </header>
      </section>
      <Footer />
    </>
  );
};

export default About;
