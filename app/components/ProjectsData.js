"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* ======================
   DEVELOPERS INFO
====================== */
const developers = [
  {
    name: "Shahnawaz Saddam Butt",
    role: "Frontend Focused Full Stack Developer",
    portfolio: "https://shahnawaz.dev",
    email: "shahnawaz@email.com",
    github: "https://github.com/shahnawaz",
  },
  {
    name: "Wahb Amir",
    role: "Backend Expert Full Stack Developer",
    portfolio: "https://wahb.dev",
    email: "wahb@email.com",
    github: "https://github.com/wahbamir",
  },
];

const ProjectsData = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /* ======================
     FETCH PROJECTS
  ====================== */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/projects", {
          credentials: "include",
        });
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : data.projects || []);
      } catch (error) {
        console.error("Fetch error:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  /* ======================
     PROJECT STATUS
  ====================== */
  const getStatus = (endDate) =>
    new Date() >= new Date(endDate) ? "Completed" : "Pending";

  const showCustomAlert = (msg) => {
    setAlertMessage(msg);
    setShowAlert(true);
  };

  /* ======================
     DELETE PROJECT
  ====================== */
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/projects/${deleteProjectId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!data.success) {
        showCustomAlert(data.message || "Delete failed");
        return;
      }

      setProjects((prev) =>
        prev.filter((p) => p._id !== deleteProjectId)
      );

      showCustomAlert("Project deleted successfully!");
    } catch {
      showCustomAlert("Server error");
    } finally {
      setShowDeleteModal(false);
      setDeleteProjectId(null);
    }
  };

  return (
    <section className="mt-20 px-4 mb-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        My Projects
      </h2>

      {loading && (
        <p className="text-center text-gray-500">
          Loading projects...
        </p>
      )}

      {!loading && projects.length === 0 && (
        <>
          <p className="text-center text-gray-500 mb-6">
            No projects found.
          </p>
          <Link href="/ProjectPanel">
            <button className="block mx-auto bg-blue-600 text-white px-8 py-2 rounded-md">
              Create Your First Project
            </button>
          </Link>
        </>
      )}

      {!loading && projects.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          className="max-w-6xl mx-auto pb-12"
        >
          {projects.map((project, index) => {
            const status = getStatus(project.EndDate);

            return (
              <SwiperSlide key={project._id}>
                <div className="border rounded-2xl p-6 shadow-md bg-white">

                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {project.ProjectName}
                    </h3>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6">
                    {project.ProjectDetail}
                  </p>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">
                        {new Date(project.StartDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="font-medium">
                        {new Date(project.EndDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-6 mb-6">
                    <a
                      href={project.ProjectLink}
                      target="_blank"
                      className="text-blue-600 font-medium hover:underline"
                    >
                      View Project →
                    </a>

                    <button
                      onClick={() => {
                        setDeleteProjectId(project._id);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-600 font-medium hover:underline"
                    >
                      Delete
                    </button>
                  </div>

                 {/* Developer Info (SHOW ALL DEVELOPERS) */}
<div className="border-t pt-5 flex flex-col gap-4">
  {developers.map((dev, i) => (
    <div key={i} className="flex gap-4 items-start">
      <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
        {dev.name.charAt(0)}
      </div>

      <div className="flex-1">
        <p className="font-semibold text-gray-800">{dev.name}</p>
        <p className="text-sm text-gray-500 mb-2">{dev.role}</p>

        <div className="flex flex-wrap gap-4 text-sm">
          <a
            href={dev.portfolio}
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Portfolio
          </a>
          <a
            href={`mailto:${dev.email}`}
            className="text-gray-600 hover:underline"
          >
            Contact
          </a>
          <a
            href={dev.github}
            target="_blank"
            className="text-gray-800 hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  ))}
</div>

                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-11/12 max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              Confirm Delete
            </h3>
            <p className="mb-6">
              Are you sure you want to delete this project?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert */}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl p-6 w-11/12 max-w-sm">
            <p className="mb-4 text-center">{alertMessage}</p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowAlert(false)}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg"
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
