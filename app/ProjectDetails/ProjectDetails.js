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
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  /* ======================
     FETCH PROJECTS
  ====================== */
  const fetchProjects = async () => {
    try {
      const origin = process.env.NEXT_PUBLIC_ORIGIN;
      const res = await fetch(`${origin}/api/projects`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        setError("Failed to load projects");
        return;
      }

      setProjects(data.projects);
      setFilteredProjects(data.projects);
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
     SEARCH FUNCTIONALITY
  ====================== */
  const handleSearchProjects = () => {
    const filtered = projects.filter((project) =>
      project.ProjectName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

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

        {error && <p className="text-center text-red-500">{error}</p>}

        {/* ✅ FIXED: zero projects check moved OUTSIDE */}
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
          <div className="flex gap-6 flex-wrap lg:flex-nowrap">
            {/* ===== PROJECTS SWIPER CONTAINER ===== */}
            <div className="flex-1 max-w-full">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                centeredSlides={filteredProjects.length === 1}
                loop={filteredProjects.length > 1}
                className="w-full!"
              >
                {filteredProjects.map((project) => {
                  const progress = calculateProgress(
                    project.StartDate,
                    project.EndDate
                  );
                  const status = getStatus(project.EndDate);

                  return (
                    <SwiperSlide
                      key={project._id}
                      className="flex justify-center w-full!"
                    >
                      <div className="w-full rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 bg-white">
                        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                          {project.ProjectName}
                        </h2>

                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {project.ProjectDetail}
                        </p>

                        <div className="flex justify-between text-sm text-gray-500 mb-3">
                          <span>Start: {project.StartDate}</span>
                          <span>End: {project.EndDate}</span>
                        </div>

                        <span
                          className={`inline-block mb-3 px-3 py-1 rounded-full text-sm font-medium ${
                            status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {status}
                        </span>

                        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                          <div
                            className={`h-3 rounded-full transition-all duration-500 ${
                              status === "Completed"
                                ? "bg-green-600"
                                : "bg-blue-600"
                            }`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>

                        <p className="text-sm text-gray-500 mb-4">
                          Progress: {progress}%
                        </p>

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
            </div>

            {/* ===== SEARCH PANEL ===== */}
            <div className="w-72 flex-shrink-0 bg-white p-6 rounded-2xl shadow-lg sticky top-24 h-fit">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Search Projects
              </h3>

              <input
                type="text"
                placeholder="Search by project name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchProjects();
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={handleSearchProjects}
                className="bg-blue-600 px-6 py-2 hover:bg-blue-700 rounded-[5px] text-white mt-5"
              >
                Search
              </button>

              {filteredProjects.length === 0 && (
                <p className="text-gray-500 text-sm mt-3">
                  No projects match your search
                </p>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ProjectDetails;
