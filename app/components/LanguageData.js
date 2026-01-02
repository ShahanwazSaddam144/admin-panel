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
    <section>
      {/* ===== Language Notes Section ===== */}
      <header className="text-center mt-20 mb-6">
        <h1 className="font-bold text-[35px] text-gray-800">
          Language Details
        </h1>
      </header>

      {/* ===== SWIPER ===== */}
      {languageNotes.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1} // default for mobile
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {languageNotes.map((lang) => (
            <SwiperSlide key={lang._id}>
              <div className="rounded-2xl ml-5 bg-white/5 backdrop-blur-md p-5 shadow-lg flex flex-col h-full">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">
                  {lang.LanguageName}
                </h4>

                <p className="text-sm text-gray-700 leading-relaxed mb-4 flex-grow">
                  {lang.LanguageDetail}
                </p>

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
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500 col-span-full mt-10">
          No language data available.
        </p>
      )}

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
      <Footer />
    </section>
  );
};

export default LanguageData;
