"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ChartsData = () => {
  const [formData, setFormData] = useState({
    LanguageName: "",
    LanguageDetail: "",
    Category: "",
    Difficulty: "",
    ReleasedYear: "",
    Frameworks: "",
    Website: "",
    UseCases: "",
  });

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });

    setTimeout(() => {
      setPopup({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.LanguageName || !formData.LanguageDetail) {
      showPopup("Please fill all required fields", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/language", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        showPopup(data.message || "Error adding project", "error");
        return;
      }

      showPopup("Project added successfully!", "success");

      setFormData({
        LanguageName: "",
        LanguageDetail: "",
        Category: "",
        Difficulty: "",
        ReleasedYear: "",
        Frameworks: "",
        Website: "",
        UseCases: "",
      });
    } catch (err) {
      console.error(err);
      showPopup("Error adding project", "error");
    }
  };

  return (
    <>
      <Navbar />
      <section className="mt-10 px-4 md:px-0">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Add New Data
        </h2>

        <form
          onSubmit={handleSubmit}
          className="w-full p-6 space-y-6 rounded-xl"
        >
          {/* Language Name */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <label className="lg:w-40 text-sm font-medium text-gray-700">
              Language Name
            </label>
            <input
              type="text"
              name="LanguageName"
              placeholder="Enter Language Name"
              value={formData.LanguageName}
              onChange={handleChange}
              className="border border-gray-300 h-24 w-full rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Language Detail */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-3">
            <label className="lg:w-40 text-sm font-medium text-gray-700 lg:pt-2">
              Language Detail
            </label>
            <textarea
              name="LanguageDetail"
              placeholder="Enter Language Detail"
              value={formData.LanguageDetail}
              onChange={handleChange}
              className="border border-gray-300 h-24 w-full rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

{/* Category */}
<div className="flex flex-col lg:flex-row lg:items-center gap-3">
  <label className="lg:w-40 text-sm font-medium text-gray-700">
    Category
  </label>
  <select
    name="Category"
    value={formData.Category}
    onChange={handleChange}
    className="border border-gray-300 h-24 w-full rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  >
    <option value="">Select Category</option>
    <option value="Frontend">Frontend</option>
    <option value="Backend">Backend</option>
    <option value="Mobile">Mobile</option>
    <option value="Fullstack">Fullstack</option>
    <option value="Other">Other</option>
  </select>
</div>


{/* Difficulty */}
<div className="flex flex-col lg:flex-row lg:items-center gap-3">
  <label className="lg:w-40 text-sm font-medium text-gray-700">
    Difficulty
  </label>
  <select
    name="Difficulty"
    value={formData.Difficulty}
    onChange={handleChange}
    className="border border-gray-300 h-24 w-full rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  >
    <option value="">Select Difficulty</option>
    <option value="Beginner">Beginner</option>
    <option value="Intermediate">Intermediate</option>
    <option value="Advanced">Advanced</option>
  </select>
</div>


          {/* Released Year */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <label className="lg:w-40 text-sm font-medium text-gray-700">
              Released Year
            </label>
            <input
              type="Date"
              name="ReleasedYear"
              placeholder="Enter Language Released Date"
              value={formData.ReleasedYear}
              onChange={handleChange}
              className="border border-gray-300 h-24 w-full rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Frameworks */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <label className="lg:w-40 text-sm font-medium text-gray-700">
              Frameworks
            </label>
            <input
              type="text"
              name="Frameworks"
              placeholder="Like React, Vue, Angular"
              value={formData.Frameworks}
              onChange={handleChange}
              className="border border-gray-300 h-24 w-full rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Website */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <label className="lg:w-40 text-sm font-medium text-gray-700">
              Official Website
            </label>
            <input
              type="url"
              name="Website"
              placeholder="Enter Language Website Name"
              value={formData.Website}
              onChange={handleChange}
              className="border border-gray-300 h-24 w-full rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Use Cases */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-3">
            <label className="lg:w-40 text-sm font-medium text-gray-700 lg:pt-2">
              Use Cases
            </label>
            <textarea
              name="UseCases"
              placeholder="Enter Languages Case"
              value={formData.UseCases}
              onChange={handleChange}
              className="border border-gray-300 h-24 w-full rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 w-full text-white p-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Add Details
          </button>
        </form>

        <Link href="/LanguageData">
          <button className="block m-auto mt-6 w-[220px] h-[50px] text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 mb-10">
            View Language Details
          </button>
        </Link>

        {popup.show && (
          <div
            className={`fixed bottom-8 right-8 px-6 py-4 rounded-lg text-white ${
              popup.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {popup.message}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default ChartsData;
