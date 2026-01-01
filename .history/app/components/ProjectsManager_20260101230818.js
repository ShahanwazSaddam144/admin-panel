"use client";

import React, { useState } from "react";
import Link from "next/link";

const ProjectsManager = () => {
  const [formData, setFormData] = useState({
    ProjectName: "",
    ProjectDetail: "",
    ProjectLink: "",
    StartDate: "",
    EndDate: "",
    DaysConsumed: "",
  });

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "",
  });

  /* =======================
      HANDLE INPUT CHANGE
  ======================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      if (name === "StartDate" || name === "EndDate") {
        const { StartDate, EndDate } = updatedData;

        if (StartDate && EndDate) {
          const start = new Date(StartDate);
          const end = new Date(EndDate);

          if (end >= start) {
            const diffTime = end - start;
            const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            updatedData.DaysConsumed = days;
          } else {
            updatedData.DaysConsumed = "";
          }
        }
      }

      return updatedData;
    });
  };

  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });
    setTimeout(() => {
      setPopup({ show: false, message: "", type: "" });
    }, 3000);
  };

  /* =======================
      SUBMIT FORM
  ======================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.ProjectName ||
      !formData.ProjectDetail ||
      !formData.ProjectLink ||
      !formData.StartDate ||
      !formData.EndDate
    ) {
      showPopup("Please fill all fields", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/projects", {
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
        ProjectName: "",
        ProjectDetail: "",
        ProjectLink: "",
        StartDate: "",
        EndDate: "",
        DaysConsumed: "",
      });
    } catch (err) {
      showPopup("Error adding project", "error");
    }
  };

  return (
    <section className="mt-10 px-4 md:px-0">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Add New Project
      </h2>

      <form onSubmit={handleSubmit} className="w-full p-6 space-y-6 rounded-xl">
        {/* Project Name */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <label className="md:w-40 text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            type="text"
            name="ProjectName"
            value={formData.ProjectName}
            onChange={handleChange}
            className="border border-gray-300 h-10 w-full rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Project Detail */}
        <div className="flex flex-col md:flex-row md:items-start gap-3">
          <label className="md:w-40 text-sm font-medium text-gray-700 md:pt-2">
            Project Detail
          </label>
          <textarea
            name="ProjectDetail"
            value={formData.ProjectDetail}
            onChange={handleChange}
            className="border border-gray-300 h-24 w-full rounded-lg p-2 resize-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Project Link */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <label className="md:w-40 text-sm font-medium text-gray-700">
            Project Link
          </label>
          <input
            type="text"
            name="ProjectLink"
            value={formData.ProjectLink}
            onChange={handleChange}
            className="border border-gray-300 h-10 w-full rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dates Row */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3 w-full">
            <label className="md:w-40 text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              name="StartDate"
              value={formData.StartDate}
              onChange={handleChange}
              className="border border-gray-300 h-10 w-full rounded-lg p-2"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-3 w-full">
            <label className="md:w-40 text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              name="EndDate"
              value={formData.EndDate}
              onChange={handleChange}
              className="border border-gray-300 h-10 w-full rounded-lg p-2"
            />
          </div>
        </div>

        {/* Days Consumed */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <label className="md:w-40 text-sm font-medium text-gray-700">
            Days Consumed
          </label>
          <input
            type="number"
            name="DaysConsumed"
            value={formData.DaysConsumed}
            readOnly
            className="border border-gray-300 h-10 w-full rounded-lg p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 w-full text-white p-3 rounded-lg font-medium hover:bg-blue-700"
        >
          Add Project
        </button>
      </form>

      <Link href="/ProjectDetails">
        <button className="block m-auto mt-6 w-[160px] h-[50px] text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700">
          View Projects
        </button>
      </Link>

      {/* Popup Toast */}
      {popup.show && (
        <div
          className={`fixed bottom-8 right-8 px-6 py-4 rounded-lg shadow-lg text-white ${
            popup.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {popup.message}
        </div>
      )}
    </section>
  );
};

export default ProjectsManager;
