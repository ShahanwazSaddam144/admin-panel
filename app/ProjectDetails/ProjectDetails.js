"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProjectDetails = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ======================
     FETCH PROJECTS
  ====================== */
  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/projects", {
        method: "GET",
        credentials: "include",
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

  /* ======================
     PROGRESS + STATUS
  ====================== */
  const calculateProgress = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const today = new Date();

    const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
    const passedDays = (today - startDate) / (1000 * 60 * 60 * 24);

    if (passedDays <= 0) return 0;
    if (passedDays >= totalDays) return 100;

    return Math.round((passedDays / totalDays) * 100);
  };

  const getStatus = (end) => {
    const today = new Date();
    const endDate = new Date(end);
    return today >= endDate ? "Completed" : "Pending";
  };

  return (
    <>
      <Navbar />

      <section className="mt-10 px-6 mb-12">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-900">
          Project Details
        </h1>

        {loading && (
          <p className="text-center text-gray-500">Loading projects...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {projects.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            {projects.map((project) => {
              const progress = calculateProgress(
                project.StartDate,
                project.EndDate
              );
              const status = getStatus(project.EndDate);

              return (
                <SwiperSlide key={project._id} className="flex justify-center">
                  <div className="w-full rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 bg-white">

                    {/* Project Name */}
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                      {project.ProjectName}
                    </h2>

                    {/* Project Detail */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.ProjectDetail}
                    </p>

                    {/* Dates */}
                    <div className="flex justify-between text-sm text-gray-500 mb-3">
                      <span>Start: {project.StartDate}</span>
                      <span>End: {project.EndDate}</span>
                    </div>

                    {/* Status */}
                    <span
                      className={`inline-block mb-3 px-3 py-1 rounded-full text-sm font-medium
                        ${
                          status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {status}
                    </span>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                      <div
                        className={`h-3 rounded-full transition-all duration-500
                          ${
                            status === "Completed"
                              ? "bg-green-600"
                              : "bg-blue-600"
                          }
                        `}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    {/* Percentage */}
                    <p className="text-sm text-gray-500 mb-4">
                      Progress: {progress}%
                    </p>

                    {/* View More */}
                    <Link
                      href="/ProjectsData"
                      className="inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
                    >
                      View More Details →
                    </Link>

                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

        {!loading && projects.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No projects found
          </p>
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
      </section>
    </>
  );
};

export default ProjectDetails;
