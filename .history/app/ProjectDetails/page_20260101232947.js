"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const ProjectDetails = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/projects"{
        method:"GET"
      });
      const data = await res.json();

      if (!data.success) {
        setError("Failed to load projects");
        return;
      }

      setProjects(data.projects);
    } catch (err) {
      console.error(err);
      setError("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const showCustomAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/projects/${deleteProjectId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!data.success) {
        showCustomAlert(data.message || "Failed to delete project");
        return;
      }

      setProjects((prev) => prev.filter((p) => p._id !== deleteProjectId));
      showCustomAlert("Project deleted successfully!");
    } catch (err) {
      console.error(err);
      showCustomAlert("Server error");
    } finally {
      setShowDeleteModal(false);
      setDeleteProjectId(null);
    }
  };

  return (
    <>
      <Navbar />

      <section className="mt-10 px-6">
        <h1 className="text-4xl font-bold mb-10 text-center text-gradient bg-clip-text">
          Project Details
        </h1>

        {loading && (
          <p className="text-center text-gray-500">Loading projects...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
            >
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                {project.ProjectName}
              </h2>

              <p className="text-gray-600 mb-5 line-clamp-3">
                {project.ProjectDetail}
              </p>

              <div className="flex justify-between items-center">
                <a
                  href={project.ProjectLink}
                  target="_blank"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition"
                >
                  View Project →
                </a>

                <button
                  onClick={() => {
                    setDeleteProjectId(project._id);
                    setShowDeleteModal(true);
                  }}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md hover:shadow-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {!loading && projects.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No projects found
          </p>
        )}
      </section>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-11/12 max-w-md shadow-xl animate-slide-down">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6 text-gray-700">Are you sure you want to delete this project?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 w-11/12 max-w-sm shadow-xl animate-fade-in">
            <p className="mb-4 text-center text-gray-800">{alertMessage}</p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowAlert(false)}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetails;
