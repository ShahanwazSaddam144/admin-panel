import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Link from "next/link";

const usageData = [
  { name: "C", usage: 60 },
  { name: "C++", usage: 70 },
  { name: "JavaScript", usage: 90 },
  { name: "Python", usage: 85 },
  { name: "Java", usage: 65 },
  { name: "Go", usage: 55 },
  { name: "Rust", usage: 50 },
  { name: "PHP", usage: 58 },
];

const likeData = [
  { name: "JavaScript", value: 35 },
  { name: "Python", value: 30 },
  { name: "C++", value: 12 },
  { name: "Java", value: 10 },
  { name: "Go", value: 8 },
  { name: "Rust", value: 5 },
];

const COLORS = [
  "#3056B2",
  "#22c55e",
  "#facc15",
  "#38bdf8",
  "#a855f7",
  "#f97316",
];

const Charts = () => {
  const [languageNotes, setLanguageNotes] = useState([]);
  const [fetchError, setFetchError] = useState("");

  /* ===== DELETE MODAL STATE ===== */
  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  /* ======================
     FETCH DATA
  ====================== */
  useEffect(() => {
    const fetchLanguageNotes = async () => {
      try {
        const res = await fetch("http://localhost:5000/charts");
        const data = await res.json();

        if (data.success && data.charts) {
          setLanguageNotes(data.charts);
        } else {
          setFetchError("Failed to load language details.");
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
      const res = await fetch(
        `http://localhost:5000/charts/${selectedId}`,
        { method: "DELETE" }
      );

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
      <h2 className="text-2xl font-semibold text-gray-900">
        Programming Languages Analytics
      </h2>

      {/* ===== Charts ===== */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 rounded-2xl bg-white/5 backdrop-blur-md p-6 shadow-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Usage Comparison
          </h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="usage" fill="#3056B2" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex-1 rounded-2xl bg-white/5 backdrop-blur-md p-6 shadow-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Languages People Like Most
          </h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={likeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                >
                  {likeData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {fetchError && (
        <div className="text-red-600 text-center font-semibold">
          {fetchError}
        </div>
      )}

      {/* ===== Language Notes ===== */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {languageNotes.map((lang, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white/5 backdrop-blur-md p-5 shadow-lg relative"
          >
            <h4 className="text-lg font-semibold text-blue-700 mb-2">
              {lang.LanguageName}
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              {lang.LanguageDetail}
            </p>

            <button
              onClick={() => {
                setSelectedId(lang._id);
                setShowPopup(true);
              }}
              className="absolute top-4 right-4 px-3 py-1 text-sm
              bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <Link href="/ChartsData">
        <button
          className="block m-auto mt-6 w-[160px] h-[50px]
          text-white font-semibold bg-blue-600 rounded-lg
          hover:bg-blue-700 transition mb-10"
        >
          Add more Data
        </button>
      </Link>

      {/* ===== CUSTOM DELETE POPUP ===== */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Confirm Delete
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this language? This action
              cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowPopup(false);
                  setSelectedId(null);
                }}
                className="px-4 py-2 rounded-md bg-gray-200
                text-gray-700 hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-md bg-red-500
                text-white hover:bg-red-600 transition"
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

export default Charts;
