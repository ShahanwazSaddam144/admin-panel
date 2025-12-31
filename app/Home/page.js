import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

const Home = () => {
  const features = [
    {
      icon: "📧",
      title: "Email Sending",
      desc: "Send automated emails, system notifications, and important updates directly from the developer admin panel."
    },
    {
      icon: "🧠",
      title: "Language Notes",
      desc: "Create and manage programming language notes, syntax references, and internal documentation."
    },
    {
      icon: "📁",
      title: "Project Management",
      desc: "Organize projects, assign development tasks, set deadlines, and manage workflows efficiently."
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      desc: "Track project completion, development progress, and milestones with clear visual indicators."
    }
  ];

  return (
    <>
    <Navbar />
      {/* Hero Section */}
      <section className="bg-transparent">
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Effortless Developer <br className="hidden md:block" />
            <span className="text-blue-600">Collaboration</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-3xl text-base md:text-lg text-gray-600 leading-relaxed">
            A developer-focused admin panel designed to streamline internal
            collaboration, manage workflows, share updates, and track progress
            efficiently — all in one centralized system.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex gap-4 flex-wrap justify-center">

            <Link href="/MainApp">
            <button className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition active:scale-95">
              Open Dashboard
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
              Powerful tools built specifically for developers to manage projects,
              track progress, and collaborate efficiently.
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
    </>
  );
};

export default Home;
