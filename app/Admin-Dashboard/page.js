"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import WelcomePanel from "../components/WelcomePanel";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import Footer from "../components/Footer";

const Main = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const origin = process.env.NEXT_PUBLIC_ORIGIN

        const res = await fetch(`${origin}/api/main-app`, {
          method: "GET",
          credentials: "include", 
        });

        if (!res.ok) {
          console.log(res)
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
    <WelcomePanel />
    <ProjectDetails />
    <Footer />
     </>
  );
};

export default Main;
