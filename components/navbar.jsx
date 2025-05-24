"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setIsSignedIn(!!localStorage.getItem("userEmail"));
  }, []);

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-transparent">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-400 tracking-tight hover:text-blue-300 transition-colors"
        >
          Mailpilot
        </Link>
        <Link
          href="/form"
          className="text-blue-400 hover:text-blue-500 font-medium transition"
        >
          Send Email
        </Link>
        <Link
          href="/analytics"
          className="text-purple-400 hover:text-purple-500 font-medium transition"
        >
          Analytics
        </Link>
      </div>
      <div className="flex gap-3">
        {isSignedIn ? (
          <button
            className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium transition"
            onClick={() => {
              localStorage.removeItem("userEmail");
              setIsSignedIn(false);
            }}
          >
            Sign Out
          </button>
        ) : (
          <button
            className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium transition"
            onClick={() => {
              window.location.href = "/api/auth/login";
            }}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
