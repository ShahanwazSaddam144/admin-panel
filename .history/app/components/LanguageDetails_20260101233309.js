"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";

const LanguageDetails = () => {
  const [languageNotes, setLanguageNotes] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [protectedData, setProtectedData] = useState(null);

  /* ===== DELETE MODAL STATE ===== */
  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  /* ======================
     FETCH LANGUAGE NOTES
  ====================== */
  useEffect(() => {
    const fetchLanguageNotes = async () => {
      try {
        const res = await fetch("http://localhost:5000/language",{
          method:"GET",
          credentials: "include"
        });
        const data = await res.json();

        if (data.success && data.charts?.length > 0) {
          setLanguageNotes(data.charts);
        } else {
          setLanguageNotes([]);
          setFetchError(""); // No error, just empty
        }
      } catch (error) {
        setFetchError("Failed to load language details.");
      }
    };

    fetchLanguageNotes();
  }, []);

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

  /* ======================
     DELETE REQUEST
  ====================== */
  const confirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/language/${selectedId}`, {
        method: "DELETE",
        
      });

      const data = await res.json();

      if (data.success) {
        setLanguageNotes((prev) =>
          prev.filter((item) => item._id !== selectedId)
        );
      }
    } catch (error) {
      console.error("Delete failed");
    } finally {
      setShowPopup(false);
      setSelectedId(null);
    }
  };

  return (
    <div className="w-full p-6 space-y-10 bg-transparent relative">
      {/* ===== PROTECTED DATA ===== */}
      <div className="flex justify-center items-center mt-20">
        {protectedData ? (
          <div className="text-center p-8 max-w-4xl">
            <h1 className="flex flex-wrap justify-center gap-5 text-gray-900 mb-4 text-[50px] font-extrabold">
              {protectedData.heading}
              <span className="text-blue-600">{protectedData.message}</span>
            </h1>
            <p className="text-gray-800 font-semibold text-2xl mb-4">
              Our Valuable User:{" "}
              <span className="text-green-800">{protectedData.user}</span>
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
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

      {/* ===== Language Notes Section ===== */}
      <header className="text-center mt-20 mb-6">
        <h1 className="font-bold text-[35px] text-gray-800">Language Details</h1>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {languageNotes.length > 0 ? (
          languageNotes.map((lang) => (
            <div
              key={lang._id}
              className="rounded-2xl bg-white/5 backdrop-blur-md p-5 shadow-lg flex flex-col h-full"
            >
              <h4 className="text-lg font-semibold text-blue-700 mb-2">
                {lang.LanguageName}
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed mb-4 flex-grow">
                {lang.LanguageDetail}
              </p>

              {/* Delete Button */}
              <button
                onClick={() => {
                  setSelectedId(lang._id);
                  setShowPopup(true);
                }}
                className="mt-auto flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition w-[200px]"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full mt-10">
            No language data available.
          </p>
        )}
      </div>

      <Link href="/LanguagePanel">
        <button className="block m-auto mt-6 w-[160px] h-[50px] text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition mb-10">
          Add more Data
        </button>
      </Link>

      {/* ===== DELETE POPUP ===== */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Confirm Delete
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this language? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowPopup(false);
                  setSelectedId(null);
                }}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDetails;
