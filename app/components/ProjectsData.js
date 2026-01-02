"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Footer from "./Footer";

/* ======================
   STATIC TEAM DEVELOPERS
====================== */
const teamDevelopers = [
  {
    name: "Shahnawaz Saddam Butt",
    role: "Frontend Focused Full Stack Developer",
    portfolio: "https://shahnawaz.buttnetworks.com",
    email: "shahnawazsaddamb@gmail.com",
    github: "https://github.com/ShahanwazSaddam144",
  },
  {
    name: "Wahb Amir",
    role: "Backend Expert Full Stack Developer",
    portfolio: "https://wahb.space",
    email: "wahb@email.com",
    github: "https://github.com/wahb-amir",
  },
];

const ProjectsData = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===== CURRENT USER ===== */
  const [currentUser, setCurrentUser] = useState(null);

  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /* ======================
     FETCH CURRENT USER (/me)
  ====================== */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/me", {
          credentials: "include",
        });
        const data = await res.json();
        if (data?.email) setCurrentUser(data);
      } catch (err) {
        console.error("User fetch failed");
      }
    };
    fetchUser();
  }, []);

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
      } catch {
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

      setProjects((prev) => prev.filter((p) => p._id !== deleteProjectId));
      showCustomAlert("Project deleted successfully!");
    } catch {
      showCustomAlert("Server error");
    } finally {
      setShowDeleteModal(false);
      setDeleteProjectId(null);
    }
  };

  return (
    <>
      <section className="mt-20 px-4 mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          My Projects
        </h2>

        {loading && (
          <p className="text-center text-gray-500">Loading projects...</p>
        )}

        {!loading && projects.length === 0 && (
          <>
            <p className="text-center text-gray-500 mb-6">No projects found.</p>
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
            {projects.map((project) => {
              const status = getStatus(project.EndDate);

              return (
                <SwiperSlide key={project._id}>
                  <div className="rounded-2xl p-6 shadow-md bg-gray-50">
                    {/* ===== HEADER ===== */}
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

                    <p className="text-gray-600 mb-6">
                      {project.ProjectDetail}
                    </p>

                    {/* ===== DATES ===== */}
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

                    {/* ===== ACTIONS ===== */}
                    <div className="flex gap-6 mb-6">
                      <a
                        href={project.ProjectLink}
                        target="_blank"
                        className="bg-blue-600 text-white px-6 py-2 font-medium hover:underline
                        hover:bg-blue-700 rounded-[5px]"
                      >
                        View Project →
                      </a>
                      <button
                        onClick={() => {
                          setDeleteProjectId(project._id);
                          setShowDeleteModal(true);
                        }}
                        className="bg-red-600 text-white px-6 py-2 font-medium hover:underline
                        hover:bg-red-700 rounded-[5px]"
                      >
                        Delete
                      </button>
                    </div>

                    {/* ===== DEVELOPERS ===== */}
                    <section className="border-t pt-6">
                      <h3 className="font-semibold text-gray-900 mb-5 text-lg">
                        Developers
                      </h3>

                      <div className="flex sm:flex-row flex-col justify-between gap-6">
                        {/* TEAM DEVELOPERS FIRST */}
                        {teamDevelopers.map((dev, i) => (
                          <div key={i} className="flex gap-4 items-start">
                            <div className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold">
                              {dev.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">
                                {dev.name}
                              </p>
                              <p className="text-sm text-gray-500 mb-1">
                                {dev.role}
                              </p>
                              <div className="flex gap-4 text-sm">
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
                    </section>

                    {/* ===== CLIENT / PROJECT OWNER ===== */}
                    {currentUser && (
                      <section className="mt-14">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          Project Owner
                        </h3>

                        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center p-6 rounded-2xl border border-blue-200 shadow-sm">
                          {/* Avatar */}
                          <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                            {currentUser.name?.charAt(0)}
                          </div>

                          {/* User Info */}
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-1">
                              <p className="text-lg font-semibold text-gray-900">
                                {currentUser.name}
                              </p>

                              <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                                You
                              </span>

                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                Active Client
                              </span>
                            </div>

                            <p className="text-sm text-gray-600">
                              {currentUser.email}
                            </p>

                            {/* Extra Details */}
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-700">
                              <p>
                                <span className="font-medium text-gray-800">
                                  Company:
                                </span>{" "}
                                {currentUser.company ||
                                  "Independent / Personal"}
                              </p>
                              <p>
                                <span className="font-medium text-gray-800">
                                  Role:
                                </span>{" "}
                                {currentUser.role || "Project Owner"}
                              </p>
                              <p>
                                <span className="font-medium text-gray-800">
                                  Account Type:
                                </span>{" "}
                                Client
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

        {/* ===== DELETE MODAL ===== */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-11/12 max-w-md">
              <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
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

        {/* ===== ALERT ===== */}
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
    </>
  );
};

export default ProjectsData;
