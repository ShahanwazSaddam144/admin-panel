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

{/* Main Points */}
<section className="mt-20 px-4">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Role Card */}
    <div className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 text-xl">
        🧳
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900">Role</h2>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
          Full-Stack Engineer — owned end-to-end design and implementation of
          client & developer workflows, GitHub integration, and CI/CD automation.
        </p>
      </div>
    </div>

    {/* Constraints Card */}
    <div className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 text-gray-700 text-xl">
        ✅
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900">Constraints</h2>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
          MVP in 8 weeks, role-based access, secure logins, enterprise-grade data
          isolation, limited budget for external integrations.
        </p>
      </div>
    </div>
  </div>

  {/* Networks Problems*/}
  <div className="mt-15 flex flex-col justify-center items-center">
    <div className="w-full h-20 bg-white border border-gray-200">
      <div className="flex gap-5 items-center justify-start">
        <h1>🛜</h1>
        <h1>Problem</h1>
      </div>
    </div>
  </div> 
</section>

      <Footer />
    </>
  );
};

export default About;
