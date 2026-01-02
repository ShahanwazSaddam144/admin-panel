"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ChartsData = () => {
  const [formData, setFormData] = useState({
    LanguageName: "",
    LanguageDetail: "",
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
      showPopup("Please fill all fields", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/language", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include"
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
      });
    } catch (err) {
      console.error(err);
      showPopup("Error adding project", "error");
    }
  };

  return (
    <>
    <Navbar />
    <section className="mt-10 px-4 md:px-0 ">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Add New Data
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full p-6 space-y-6 rounded-xl"
      >
        {/* Project Name */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <label htmlFor="ProjectName" className="md:w-40 text-sm font-medium text-gray-700">
            Language Name
          </label>
          <input
            id="LanguageName"
            type="text"
            name="LanguageName"
            placeholder="Enter language name"
            value={formData.LanguageName}
            onChange={handleChange}
            className="border border-gray-300 h-10 w-full rounded-lg p-2
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Project Detail */}
        <div className="flex flex-col md:flex-row md:items-start gap-3">
          <label htmlFor="ProjectDetail" className="md:w-40 text-sm font-medium text-gray-700 md:pt-2">
            Language Detail
          </label>
          <textarea
            id="LanguageDetail"
            name="LanguageDetail"
            placeholder="Enter language details"
            value={formData.LanguageDetail}
            onChange={handleChange}
            className="border border-gray-300 h-24 w-full rounded-lg p-2 resize-none
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 w-full text-white p-3 rounded-lg font-medium
            hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Add Project
        </button>
      </form>

      <Link href="/LanguageData">
        <button
          className="block m-auto mt-6 w-[160px] h-[50px] text-white font-semibold bg-blue-600
            rounded-lg hover:bg-blue-700 transition-colors cursor-pointer mb-10"
        >
          View Details
        </button>
      </Link>

      {/* 🔔 Popup Toast */}
      {popup.show && (
        <div
          className={`fixed bottom-8 right-8 px-6 py-4 rounded-lg shadow-lg text-white
            transition-all animate-fadeIn
            ${popup.type === "success" ? "bg-green-500" : "bg-red-500"}`}
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
