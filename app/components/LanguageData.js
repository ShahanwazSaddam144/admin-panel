"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";

// ===== SWIPER IMPORTS =====
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Footer from "./Footer";

const LanguageData = () => {
  const [languageNotes, setLanguageNotes] = useState([]);
  const [fetchError, setFetchError] = useState("");

  /* ===== DELETE MODAL STATE ===== */
  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  /* ======================
     FETCH LANGUAGE NOTES
  ====================== */
  useEffect(() => {
    const fetchLanguageNotes = async () => {
      try {
        const res = await fetch("http://localhost:5000/language", {
          method: "GET",
          credentials: "include",
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
     DELETE REQUEST
  ====================== */
  const confirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/language/${selectedId}`, {
        method: "DELETE",
        credentials: "include",
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
    <div className="w-full bg-gray-50 min-h-screen"> {/* Full-width background */}
      <section className="px-4 lg:px-20 pt-20 pb-10">
        {/* ===== Header ===== */}
        <header className="text-center mb-10">
          <h1 className="font-bold text-4xl text-gray-800">Language Details</h1>
          <p className="text-gray-600 mt-2">
            View, manage, and delete your language records
          </p>
        </header>

        {/* ===== SWIPER ===== */}
        {languageNotes.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={30}
            slidesPerView={1} // default for mobile
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              1024: { slidesPerView: 1, spaceBetween: 30 },
              1280: { slidesPerView: 1, spaceBetween: 40 },
            }}
            className="w-full"
          >
            {languageNotes.map((lang) => (
              <SwiperSlide key={lang._id} className="flex justify-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col h-full  w-full">
                  <h4 className="text-xl font-semibold text-blue-700 mb-3">
                    {lang.LanguageName}
                  </h4>

                  <p className="text-sm text-gray-700 mb-3 flex-grow">
                    {lang.LanguageDetail}
                  </p>

                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Category:</strong> {lang.Category}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Difficulty:</strong> {lang.Difficulty}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Released:</strong> {lang.ReleasedYear}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Frameworks:</strong> {lang.Frameworks}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Website:</strong>{" "}
                    <a
                      href={lang.Website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {lang.Website}
                    </a>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    <strong>Use Cases:</strong> {lang.UseCases}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedId(lang._id);
                      setShowPopup(true);
                    }}
                    className="mt-auto flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            {fetchError || "No language data available."}
          </p>
        )}

        {/* ===== Add New Button ===== */}
        <div className="text-center mt-10">
          <Link href="/LanguagePanel">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Add More Data
            </button>
          </Link>
        </div>

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
      </section>

      <Footer />
    </div>
  );
};

export default LanguageData;
