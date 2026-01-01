"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import LanguageData from "./LanguageData";

const WelcomePanel = () => {
  const [languageNotes, setLanguageNotes] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [protectedData, setProtectedData] = useState(null);

  /* ===== DELETE MODAL STATE ===== */
  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);


  /* ======================
     FETCH PROTECTED ROUTE
  ====================== */
  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const res = await fetch("http://localhost:5000/main-app", {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        if (data.message) {
          setProtectedData(data);
        } else {
          setFetchError("Failed to fetch protected data.");
        }
      } catch (error) {
        setFetchError("Failed to fetch protected data.");
      }
    };

    fetchProtected();
  }, []);


  return (
    <>
    <div className="w-full p-6 space-y-10 bg-transparent relative">
      {/* ===== PROTECTED DATA ===== */}
      <div className="flex justify-center items-center mt-20">
        {protectedData ? (
          <div className="text-center p-8 max-w-4xl">
            <h1 className="flex flex-wrap justify-center gap-5 text-[40px] sm:text-[50px] text-gray-900 mb-4 font-extrabold">
              {protectedData.heading}
              <span className="text-blue-600 text-[25px] sm:text-[50px]">{protectedData.message}</span>
            </h1>
            <p className="text-gray-800 font-semibold text-[18px] sm:text-2xl mb-4">
              Our Valuable User:{" "}
              <span className="text-green-800">{protectedData.user}</span>
            </p>
            <p className="text-gray-700 sm:text-lg text-[16px] leading-relaxed">
              You have full access to the dashboard. Manage your projects and
              settings securely. All your actions are logged for security
              purposes. Enjoy your workflow!
            </p>
          </div>
        ) : (
          <p className="text-gray-400 text-lg animate-pulse">
            Loading protected data...
          </p>
        )}
      </div>

      {/* ===== FETCH ERROR ===== */}
      {fetchError && (
        <div className="text-red-500 text-center font-semibold mt-4 animate-pulse">
          {fetchError}
        </div>
      )}
    </div>
    
    { /*<LanguageData /> */}
    </>
  );
};

export default WelcomePanel;
