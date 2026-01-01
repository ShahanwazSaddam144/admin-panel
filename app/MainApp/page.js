"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Charts from "../components/Charts";
import ProjectsData from "../components/ProjectsData";
import EmailSender from "../components/EmailSender";

const Main = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/main-app", {
          method: "GET",
          credentials: "include", // send cookie
        });

        if (!res.ok) {
          // Not authenticated → redirect to login
          router.replace("/");
        } else {
          setLoading(false); // Authenticated → show page
        }
      } catch (err) {
        router.replace("/"); // On error → redirect to login
      }
    };

    verifyAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-white text-center text-xl">
          Checking authentication...
        </p>
      </div>
    );
  }

  return (
    <>
   <Navbar />
    <Charts />
    <ProjectsData />
     </>
  );
};

export default Main;
