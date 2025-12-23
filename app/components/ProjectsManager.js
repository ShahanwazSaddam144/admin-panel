import React, { useState } from "react";
import Link from "next/link";

const ProjectsManager = () => {
  const [formData, setFormData] = useState({
    ProjectName: "",
    ProjectDetail: "",
    ProjectLink: "",
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

    if (
      !formData.ProjectName ||
      !formData.ProjectDetail ||
      !formData.ProjectLink
    ) {
      showPopup("Please fill all fields", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
      });
    } catch (err) {
      console.error(err);
      showPopup("Error adding project", "error");
    }
  };

  return (
    <section className="mt-10">
      <h2 className="text-[30px] font-bold mb-6 text-center">
        Add New Project
      </h2>

      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl p-4 space-y-4"
        >
          {/* Project Name */}
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <label
              htmlFor="ProjectName"
              className="md:w-40 text-sm font-medium"
            >
              Project Name
            </label>
            <input
              id="ProjectName"
              type="text"
              name="ProjectName"
              placeholder="Enter project name"
              value={formData.ProjectName}
              onChange={handleChange}
              className="border h-10 w-full rounded-[5px] p-2
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Project Detail */}
          <div className="flex flex-col md:flex-row md:items-start gap-3">
            <label
              htmlFor="ProjectDetail"
              className="md:w-40 text-sm font-medium md:pt-2"
            >
              Project Detail
            </label>
            <textarea
              id="ProjectDetail"
              name="ProjectDetail"
              placeholder="Enter project details"
              value={formData.ProjectDetail}
              onChange={handleChange}
              className="border h-24 w-full rounded-[5px] p-2 resize-none
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Project Link */}
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <label
              htmlFor="ProjectLink"
              className="md:w-40 text-sm font-medium"
            >
              Project Link
            </label>
            <input
              id="ProjectLink"
              type="text"
              name="ProjectLink"
              placeholder="https://example.com"
              value={formData.ProjectLink}
              onChange={handleChange}
              className="border h-10 w-full rounded-[5px] p-2
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-700 w-full text-white p-2 rounded
              hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Add Project
          </button>
        </form>
      </div>

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
      <Link href="/ProjectDetails">
      <button className="block m-auto w-[150px] h-[50px] text-white font-semibold bg-blue-600
      mb-5 rounded-[5px] mt-5 hover:bg-blue-700 cursor-pointer">
        View Projects</button>
        </Link>
    </section>
  );
};

export default ProjectsManager;
