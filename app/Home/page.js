import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home_ = () => {
  const features = [
    {
      icon: "❓",
      title: "FAQ",
      desc: "Access frequently asked questions and find answers quickly without contacting support.",
    },
    {
      icon: "🧠",
      title: "Language Notes",
      desc: "Create and manage programming language notes, syntax references, and internal documentation.",
    },
    {
      icon: "📁",
      title: "Project Management",
      desc: "Organize projects, assign development tasks, set deadlines, and manage workflows efficiently.",
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      desc: "Track project completion, development progress, and milestones with clear visual indicators.",
    },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="backdrop-blur-md bg-white border-b border-b-gray-400 fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/Home">
            <h1 className="text-gray-900 font-extrabold text-2xl tracking-wide">
              Butt Networks
            </h1>
          </Link>

          {/* Right side: User initial + Dropdown */}
          <div className="relative flex items-center gap-4">
            <Link href="/Login">
              <button className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition active:scale-95">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-transparent">
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Effortless Client & Developer <br className="hidden md:block" />
            <span className="text-blue-600">Collaboration</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-3xl text-base md:text-lg text-gray-600 leading-relaxed">
            Replaces fragmented emails and chats with a single platform for
            quotes, messaging, and automated progress reporting.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex gap-4 flex-wrap justify-center">
            <Link href="/Login">
              <button className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition active:scale-95">
                Get Started
              </button>
            </Link>

            <Link href="#features">
              <button className="px-8 py-3 rounded-xl border border-gray-300 text-gray-800 font-semibold hover:bg-gray-100 transition active:scale-95">
                View Features
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-transparent py-20" id="features">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Core Features
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Powerful tools built specifically for developers to manage
              projects, track progress, and collaborate efficiently.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="cursor-pointer p-8 rounded-2xl border border-gray-200 bg-white/10 backdrop-blur-md hover:shadow-xl transition"
              >
                <div className="text-3xl mb-4 text-blue-600">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home_;
