"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkSignInStatus = async () => {
      try {
        const res = await fetch("/api/checkSignIn", {
          method: "GET",
        });

        const data = await res.json();

        if (data.userEmail) {
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
        }
      } catch (error) {
        console.error("Error checking sign-in status:", error);
        setIsSignedIn(false);
      }
    };

    checkSignInStatus();
  }, [isSignedIn]);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/signOut", {
        method: "POST",
      });

      if (res.ok) {
        setIsSignedIn(false);
        console.log("Signed out successfully");
        window.location.href = "/";
      } else {
        console.error("Error signing out");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed z-20 w-full flex items-center justify-between px-4 sm:px-6 py-4 bg-black/40 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold text-blue-400 tracking-tight hover:text-blue-300 transition-colors"
          >
            Mailpilot
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
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
        </div>

        {/* Desktop Auth Button */}
        <div className="hidden md:flex gap-3">
          {isSignedIn ? (
            <button
              className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium transition"
              onClick={handleSignOut}
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          <div className="absolute top-20 left-4 right-4 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-2xl">
            <div className="flex flex-col gap-4">
              <Link
                href="/form"
                className="text-blue-400 hover:text-blue-500 font-medium transition py-2 text-lg"
                onClick={closeMobileMenu}
              >
                Send Email
              </Link>
              <Link
                href="/analytics"
                className="text-purple-400 hover:text-purple-500 font-medium transition py-2 text-lg"
                onClick={closeMobileMenu}
              >
                Analytics
              </Link>
              <div className="border-t border-white/10 pt-4 mt-2">
                {isSignedIn ? (
                  <button
                    className="w-full px-4 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium transition text-lg"
                    onClick={() => {
                      handleSignOut();
                      closeMobileMenu();
                    }}
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    className="w-full px-4 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium transition text-lg"
                    onClick={() => {
                      window.location.href = "/api/auth/login";
                      closeMobileMenu();
                    }}
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
