"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const ProjectsData = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/projects", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        // ✅ FIX HERE
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

  return (
    <section className="mt-20 bg-transparent px-4 md:px-0 mb-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        My Projects
      </h2>

      {loading && (
        <p className="text-center text-gray-500">Loading projects...</p>
      )}

      {!loading && projects.length === 0 && (
        <p className="text-center text-gray-500">No projects found.</p>
      )}

      <div className="grid gap-8 max-w-4xl mx-auto">
        {projects.map((project) => (
          <div
            key={project._id}
            className="border border-gray-300 rounded-xl p-6 shadow-sm"
          >
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

            <a
              href={project.ProjectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 font-medium hover:underline"
            >
              View Project →
            </a>
          </div>
        ))}
      </div>

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
  );
};

export default ProjectsData;
