"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EmailSender from "../components/EmailSender";
import ProjectsManager from "../components/ProjectsManager";
import Navbar from "../components/Navbar";
import Charts from "../components/Charts";

const Main = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/main-app", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          
          router.replace("/");
        } else {
        
          setLoading(false);
        }
      } catch (err) {
        router.replace("/");
      }
    };

    verifyAuth();
  }, [router]);

  if (loading) {
    return (
      <p className="text-white text-center mt-20 text-xl">
        Checking authentication...
      </p>
    );
  }

  return (
    <>
      <Navbar />
      <Charts />
      <ProjectsManager />
      <EmailSender />
    </>
  );
};

export default Main;
