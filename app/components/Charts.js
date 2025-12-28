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

  useEffect(() => {
    const fetchLanguageNotes = async () => {
      try {
        const res = await fetch("http://localhost:5000/charts"); 
        const data = await res.json();
        if (data.success && data.charts) {
          const notes = data.charts.map((item) => ({
            title: item.LanguageName,
            note: item.LanguageDetail,
          }));
          setLanguageNotes(notes);
        } else {
          setFetchError("Failed to load language details.");
        }
      } catch (err) {
        setFetchError("Failed to load language details.");
      }
    };

    fetchLanguageNotes();
  }, []);

  return (
    <div className="w-full p-6 space-y-10 bg-transparent">
      <h2 className="text-2xl font-semibold text-gray-900">
        Programming Languages Analytics
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 rounded-2xl bg-white/5 backdrop-blur-md p-6 shadow-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Usage Comparison
          </h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData}>
                <XAxis dataKey="name" stroke="#111827" />
                <YAxis stroke="#6b7280" />
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
          <div className="w-full h-80 flex justify-center">
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
                  paddingAngle={4}
                >
                  {likeData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {languageNotes.map((lang) => (
          <div
            key={lang.title}
            className="rounded-2xl bg-white/5 backdrop-blur-md p-5 shadow-lg"
          >
            <h4 className="text-lg font-semibold text-blue-700 mb-2">
              {lang.title}
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {lang.note}
            </p>
          </div>
        ))}
      </div>

      <Link href="/ChartsData">
        <button
          className="block m-auto mt-6 w-[160px] h-[50px] text-white font-semibold bg-blue-600
          rounded-lg hover:bg-blue-700 transition-colors cursor-pointer mb-10"
        >
          Add more Data
        </button>
      </Link>
    </div>
  );
};

export default Charts;
