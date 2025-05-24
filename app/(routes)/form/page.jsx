"use client";
import { sub } from "framer-motion/client";
import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function form() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [scheduleTime, setScheduleTime] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "", visible: false });
  const toastTimeout = useRef(null);

  // Email domain validation
  const validDomains = [
    "@gmail.com",
    "@outlook.com",
    "@hotmail.com",
    "@yahoo.com",
    "@protonmail.com",
    "@icloud.com",
    "@aol.com",
    "@zoho.com",
    "@mail.com",
    "@gmx.com",
  ];

  const isValidEmailDomain = (email) => {
    return validDomains.some((domain) => email.endsWith(domain));
  };

  // Subject length limit
  const SUBJECT_MAX_LENGTH = 78;

  const showToast = (message, type = "info") => {
    setToast({ message, type, visible: true });
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, 3000);
  };

  const nextStep = () => {
    if (step == 1) {
      if (!email || !name || !recipient) {
        showToast("Please fill all details", "error");
        return;
      }
      if (!isValidEmailDomain(email)) {
        showToast(
          "Please use a valid email provider (e.g. Gmail, Outlook, Yahoo, etc.)",
          "error"
        );
        return;
      }
      if (!isValidEmailDomain(recipient)) {
        showToast(
          "Recipient must use a valid email provider (e.g. Gmail, Outlook, Yahoo, etc.)",
          "error"
        );
        return;
      }
      setStep(2);
    } else {
      if (!subject || !body) {
        showToast("Please fill all details", "error");
        return;
      }
      if (subject.length > SUBJECT_MAX_LENGTH) {
        showToast(
          `Subject cannot exceed ${SUBJECT_MAX_LENGTH} characters`,
          "error"
        );
        return;
      }
      setStep(3);
    }
  };

  const prevStep = () => {
    if (step == 2) {
      setStep(1);
    } else {
      setStep(2);
    }
  };

  // For DatePicker: restrict to >= now
  const now = new Date();
  const isToday =
    scheduleTime &&
    scheduleTime.getDate() === now.getDate() &&
    scheduleTime.getMonth() === now.getMonth() &&
    scheduleTime.getFullYear() === now.getFullYear();

  function roundUpToNextMinute(date) {
    const d = new Date(date);
    d.setSeconds(0);
    d.setMilliseconds(0);
    if (d < date) d.setMinutes(d.getMinutes() + 1);
    return d;
  }
  const minSelectableTime = isToday
    ? roundUpToNextMinute(now)
    : new Date(0, 0, 0, 0, 0, 0, 0);
  const maxSelectableTime = new Date(0, 0, 0, 23, 59, 0, 0);

  const handleSubmit = async () => {
    if (!scheduleTime) {
      showToast("Please select a schedule time", "error");
      return;
    }
    if (scheduleTime < new Date()) {
      showToast("Scheduled time must be in the future", "error");
      return;
    }

    const data = {
      email,
      name,
      recipient,
      subject,
      body,
      scheduleTime: scheduleTime.toISOString(),
    };
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      showToast("Email scheduled successfully!", "success");
    } else {
      showToast(res.message || "Failed to schedule email", "error");
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-900/40 via-black/90 to-purple-900/20 py-8 px-2">
      {/* Toast Notification */}
      {toast.visible && (
        <div
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 min-w-[280px] max-w-[90vw] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-white font-semibold transition-all duration-500
          ${toast.type === "success" ? "bg-green-600/95" : toast.type === "error" ? "bg-red-600/95" : "bg-blue-600/95"}
          ${toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {toast.type === "success" && (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          {toast.type === "error" && (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
          <span className="flex-1">{toast.message}</span>
          <button
            className="ml-2 p-1 rounded-full hover:bg-white/20 transition"
            onClick={() => setToast((t) => ({ ...t, visible: false }))}
            aria-label="Close notification"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
      {/* Step Indicator */}
      <div className="flex justify-center items-center gap-2 rounded-full bg-blue-500/10 backdrop-blur-sm py-2 px-6 mt-10 mb-6 shadow-md border border-blue-500/20">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${step === s ? "bg-blue-500 scale-125" : "bg-blue-900/40"}`}
          ></div>
        ))}
        <p className="text-blue-400 text-xs ml-4 font-semibold tracking-wide">
          Email Composer
        </p>
      </div>
      <div className="text-3xl md:text-4xl font-bold mb-2 flex gap-2 text-center">
        <h1>Schedule Your</h1>
        <h1 className="text-blue-500">Email</h1>
      </div>
      <div className="text-white/70 text-base md:text-lg text-center max-w-2xl mb-2">
        Create and schedule your email with precision timing for maximum impact
      </div>
      <div className="w-full max-w-2xl flex flex-col bg-gradient-to-br from-blue-500/10 via-[#111] to-purple-500/10 rounded-2xl shadow-2xl border border-white/10 mt-8 mb-8 px-8 py-10 transition-all duration-500">
        {step === 1 && (
          <>
            <div className="w-full mt-2">
              <label
                htmlFor="email"
                className="text-white/70 text-sm font-medium"
              >
                Your Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full h-12 bg-black/80 text-white rounded-lg px-4 py-2 mt-2 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="w-full mt-6">
              <label
                htmlFor="name"
                className="text-white/70 text-sm font-medium"
              >
                Your Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full h-12 bg-black/80 text-white rounded-lg px-4 py-2 mt-2 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
                placeholder="Your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="w-full mt-6">
              <label
                htmlFor="recipient"
                className="text-white/70 text-sm font-medium"
              >
                Recipient Email
              </label>
              <input
                id="recipient"
                type="email"
                className="w-full h-12 bg-black/80 text-white rounded-lg px-4 py-2 mt-2 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
                placeholder="recipient@gmail.com"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end mt-8">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-semibold flex items-center gap-2 shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={nextStep}
              >
                Continue
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="w-full mt-2">
              <label
                htmlFor="subject"
                className="text-white/70 text-sm font-medium"
              >
                Subject
                <span
                  className={`ml-2 text-xs ${subject.length > SUBJECT_MAX_LENGTH ? "text-red-400" : "text-white/40"}`}
                >
                  {subject.length}/{SUBJECT_MAX_LENGTH}
                </span>
              </label>
              <input
                id="subject"
                type="text"
                className="w-full h-12 bg-black/80 text-white rounded-lg px-4 py-2 mt-2 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
                placeholder="Enter email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                maxLength={200}
              />
            </div>
            <div className="w-full mt-6">
              <label
                htmlFor="email_content"
                className="text-white/70 text-sm font-medium"
              >
                Email Content
              </label>
              <textarea
                id="email_content"
                className="w-full h-40 bg-black/80 text-white rounded-lg px-4 py-2 mt-2 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition resize-none"
                placeholder="Enter email content"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between mt-8 gap-2">
              <button
                className="bg-gray-700 hover:bg-gray-800 text-white rounded-lg px-6 py-3 font-semibold flex items-center gap-2 shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={prevStep}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-semibold flex items-center gap-2 shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={nextStep}
              >
                Continue
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="w-full mt-2">
              <label className="text-white/70 text-sm font-medium block mb-2">
                Schedule Time
              </label>
              <DatePicker
                selected={scheduleTime}
                onChange={(date) => setScheduleTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                dateFormat="dd-MM-yyyy h:mm aa"
                placeholderText="Select date and time"
                className="bg-black/80 text-white px-4 py-2 rounded-lg w-full border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
                minDate={now}
                minTime={minSelectableTime}
                maxTime={maxSelectableTime}
              />
            </div>
            <div className="w-full flex flex-col bg-black/80 rounded-xl mt-6 p-4 border border-white/10">
              <h2 className="text-lg font-semibold text-white mb-2">
                Email Summary
              </h2>
              <div className="grid grid-cols-3 gap-2 text-white/60 text-sm mb-1">
                <div className="col-span-1">From:</div>
                <div className="col-span-2 truncate" title={email}>
                  {email}
                </div>
                <div className="col-span-1">To:</div>
                <div className="col-span-2 truncate" title={recipient}>
                  {recipient}
                </div>
                <div className="col-span-1">Subject:</div>
                <div className="col-span-2 truncate" title={subject}>
                  {subject}
                </div>
                <div className="col-span-1">Scheduled for:</div>
                <div className="col-span-2">
                  {scheduleTime && scheduleTime.toLocaleString()}
                </div>
              </div>
              <hr className="border-t border-white/20 my-2" />
              <div className="text-white/60 text-sm truncate" title={body}>
                <span className="font-medium">Content:</span> {body}
              </div>
            </div>
            <div className="flex justify-between mt-8 gap-2">
              <button
                className="bg-gray-700 hover:bg-gray-800 text-white rounded-lg px-6 py-3 font-semibold flex items-center gap-2 shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={prevStep}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 py-3 font-semibold flex items-center gap-2 shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={handleSubmit}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Schedule Email
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
