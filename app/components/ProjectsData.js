"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";  
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const ProjectsData = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/projects", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : data.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

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
        credentials: "include"
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
    <section className="mt-20 bg-transparent px-4 md:px-0 mb-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        My Projects
      </h2>

      {loading && <p className="text-center text-gray-500">Loading projects...</p>}

      {!loading && projects.length === 0 && (
        <p className="text-center text-gray-500">No projects found.</p>
      )}

      {!loading && projects.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
          }}
          className="max-w-6xl mx-auto pb-10"
        >
          {projects.map((project) => (
            <SwiperSlide key={project._id}>
              <div className="border border-gray-300 rounded-xl p-6 shadow-sm w-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {project.ProjectName}
                </h3>

                <p className="text-gray-600 mb-6">{project.ProjectDetail}</p>

                <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium text-gray-700">
                      {new Date(project.StartDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="font-medium text-gray-700">
                      {new Date(project.EndDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Days Consumed</p>
                    <p className="font-medium text-gray-700">
                      {project.DaysConsumed} days
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.ProjectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-600 font-medium hover:underline"
                  >
                    View Project →
                  </a>

                  <button
                    onClick={() => {
                      setDeleteProjectId(project._id);
                      setShowDeleteModal(true);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {!loading && projects.length === 0 && (
        <Link href="/ProjectPanel">
          <button
            className="bg-blue-600 hover:bg-blue-700 px-8 py-2 block m-auto mt-5
            text-white font-semibold rounded-[4px] cursor-pointer active:bg-blue-700 transition
            duration-200"
          >
            Create your First Project
          </button>
        </Link>
      )}

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

      {/* ===== Alert Modal ===== */}
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
    </section>
  );
};

export default ProjectsData;
