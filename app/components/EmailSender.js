"use client";
import { MailCheck } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";

const EmailSender = () => {
  const [popup, setPopup] = useState({ show: false, message: "", type: "success" });

  async function sendEmail() {
    const to = document.getElementById("to").value;
    const subject = document.getElementById("subject").value;
    const limit = document.getElementById("Limit").value;
    const text = document.getElementById("text").value;

    try {
      const res = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, text, limit }),
      });

      const data = await res.json();

      if (data.success) {
        showPopup(data.message, "success");
      } else {
        showPopup(data.message, "error");
      }
    } catch (err) {
      showPopup("Error: " + err.message, "error");
    }
  }

  // Show popup
  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });
    // Auto-hide after 3 seconds
    setTimeout(() => setPopup({ show: false, message: "", type: "success" }), 3000);
  };

  return (
    <>
      <div className="w-full mt-8 p-8 relative">
        <header className="flex flex-row items-center justify-center gap-3 mb-6">
          <MailCheck size={35} className="text-blue-600" />
          <h2 className="text-[30px] font-bold text-gray-800">Email Sending Panel</h2>
        </header>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="font-medium">Recipient Email</label>
            <input
              id="to"
              type="email"
              placeholder="Receiver email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-blue-500"
            />
          </div>

          <div className="flex-1">
            <label className="font-medium">Subject</label>
            <input
              id="subject"
              type="text"
              placeholder="Enter subject"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="font-medium">Sending Limit</label>
          <input
            id="Limit"
            type="number"
            placeholder="Limit (e.g., 5)"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="font-medium">Message</label>
          <textarea
            id="text"
            placeholder="Write your message..."
            className="w-full px-4 py-2 mt-1 border rounded-lg h-28 resize-none focus:outline-blue-500"
          ></textarea>
        </div>

        <button
          onClick={sendEmail}
          className="w-full py-3 bg-blue-700 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
        >
          Send Email
        </button>

        <Link href="/RecieptNames">
          <button className="block m-auto bg-blue-600 mt-5 text-white px-6 py-3 rounded-[4px] font-semibold hover:bg-blue-700 cursor-pointer">
            View Recipient
          </button>
        </Link>

        {/* Custom Popup */}
        {popup.show && (
          <div
            className={`fixed bottom-8 right-8 px-6 py-4 rounded-lg shadow-lg text-white transition-all
            ${popup.type === "success" ? "bg-green-500" : "bg-red-500"} animate-fadeIn`}
          >
            {popup.message}
          </div>
        )}
      </div>

      {/* Tailwind animation for popup */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default EmailSender;
