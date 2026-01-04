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
        const origin = process.env.NEXT_PUBLIC_ORIGIN
        const res = await fetch(`${origin}/api/main-app`, {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (data?.user) {
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
              {/* ===== HEADING ===== */}
              <h1 className="flex flex-wrap justify-center gap-3 text-[38px] sm:text-[55px] text-gray-900 mb-6 font-extrabold">
                Welcome to
                <span className="text-blue-600">Our Dashboard</span>
              </h1>

              {/* ===== PROFESSIONAL USER NAME ===== */}
              <div className="mb-6">
                <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-600 mb-1">
                  Signed in as
                </p>
                <p className="text-[20px] sm:text-2xl font-semibold text-gray-900">
                  {protectedData.user}
                </p>
              </div>

              {/* ===== DESCRIPTION ===== */}
              <p className="text-gray-700 sm:text-lg text-[16px] leading-relaxed max-w-2xl mx-auto">
                You have full access to the dashboard. Manage your projects and
                settings securely. All activities are monitored to ensure
                system integrity and data protection.
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

      {/* OPTIONAL: LANGUAGE DATA SECTION */}
      {/*
        <LanguageData />
      */}
    </>
  );
};

export default WelcomePanel;
