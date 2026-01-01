"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

const roles = ["Administrator", "Job", "Business", "Student", "Other"];

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [role, setRole] = useState("Administrator");
  const [extraInfo, setExtraInfo] = useState("");
  const [showSavedPopup, setShowSavedPopup] = useState(false);
  const router = useRouter();

  /* ======================
     FETCH USER
  ====================== */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/me", {
          credentials: "include",
        });
        const data = await res.json();
        setUser(data);

        const savedRole = localStorage.getItem("userRole") || data.role || "Administrator";
        const savedInfo = localStorage.getItem("userExtraInfo") || data.extraInfo || "";

        setRole(savedRole);
        setExtraInfo(savedInfo);
      } catch {
        console.error("Failed to fetch user");
      }
    };
    fetchUser();
  }, []);

  /* ======================
     DELETE ACCOUNT
  ====================== */
  const confirmDeleteAccount = async () => {
    try {
      await fetch("http://localhost:5000/delete-account", {
        method: "DELETE",
        credentials: "include",
      });
      router.replace("/");
    } catch {
      alert("Failed to delete account");
    }
  };

  /* ======================
     SAVE PROFILE LOCALLY & SHOW POPUP
  ====================== */
  const handleSave = () => {
    localStorage.setItem("userRole", role);
    localStorage.setItem("userExtraInfo", extraInfo);
    setShowSavedPopup(true);
    setTimeout(() => setShowSavedPopup(false), 1500);
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <p className="text-center mt-32 text-gray-500">Loading profile...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="max-w-4xl mx-auto mt-28 px-4">
        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col lg:flex-row gap-8">
          {/* LEFT: Avatar */}
          <div className="flex flex-col items-center lg:items-start gap-4 flex-shrink-0">
            <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center text-4xl font-extrabold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
              Active Account
            </span>
          </div>

          {/* RIGHT: Details */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-semibold text-gray-800">{user.name}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-semibold text-gray-800">{user.email}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Account Role</p>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-semibold text-gray-800">— — —</p>
              </div>
            </div>

            {/* EXTRA INFO */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-2">Additional Info</p>
              <textarea
                placeholder={
                  role === "Job"
                    ? "Enter your job title or company"
                    : role === "Business"
                    ? "Enter your business name or description"
                    : "Additional info about you"
                }
                value={extraInfo}
                onChange={(e) => setExtraInfo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col lg:flex-row gap-4">
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save Profile
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================
          DELETE CONFIRMATION MODAL
      ====================== */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Confirm Account Deletion
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              This will permanently delete your account and all associated
              data. This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={confirmDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================
          PROFILE SAVED POPUP
      ====================== */}
      {showSavedPopup && (
        <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
          <div className="flex items-center gap-3 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl border border-green-400">
            <span className="text-lg font-semibold">✅</span>
            <p className="font-medium">Profile Saved!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
