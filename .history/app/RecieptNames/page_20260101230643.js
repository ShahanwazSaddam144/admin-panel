"use client";

import React, { useEffect, useState,useCallback } from "react";
import Navbar from "../components/Navbar";

const RecieptName = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState({ open: false, id: null });

  // GET → Fetch Email Records
  const fetchEmails = useCallback(async () => {
    setLoading(true); // Start loading state
    try {
      const res = await fetch("http://localhost:5000/emails", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        setEmails(data.emails);
      }
    } catch (error) {
      console.log("Fetch Error:", error);
    } finally {
      setLoading(false); 
    }
  }, []); 

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]); 

  const deleteEmail = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/emails/${id}`, {
        method: "DELETE",
        credentials: "include", // Important for your 'protect' middleware!
      });

      const data = await res.json();

      if (data.success) {
        setConfirmModal({ open: false, id: null });
        fetchEmails(); // Re-runs the memoized function to refresh data
      }
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Email Sending History</h2>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : emails.length === 0 ? (
          <p className="text-gray-600">No email records found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full border border-gray-200 bg-white">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Email To</th>
                  <th className="px-4 py-3 text-left">Subject</th>
                  <th className="px-4 py-3 text-left">Message</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {emails.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-4 py-3">{item.to}</td>
                    <td className="px-4 py-3">{item.subject}</td>
                    <td className="px-4 py-3">{item.text}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openConfirm(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md shadow-sm transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Custom Confirmation Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this email?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeConfirm}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteEmail(confirmModal.id)}
                className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecieptName;
