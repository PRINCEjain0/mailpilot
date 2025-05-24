"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const [emails, setEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        const res = await fetch(
          `/api/getEmail?userEmail=${encodeURIComponent(userEmail)}`
        );
        if (!res.ok) {
          console.error("Error fetching emails");
          return;
        }
        const data = await res.json();
        setEmails(data);
      } catch (error) {
        console.error("Error fetching emails:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmails();
  }, []);
  const totalEmails = emails.length;
  const sentEmails = emails.filter((e) => e.status === "success").length;

  const openRate = sentEmails
    ? Math.round(
        (emails.filter((e) => e.openedAt && e.status === "success").length /
          sentEmails) *
          100
      )
    : 0;
  const clickRate = sentEmails
    ? Math.round(
        (emails.filter((e) => e.clickedAt && e.status === "success").length /
          sentEmails) *
          100
      )
    : 0;

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const renderStatusBadge = (status) => {
    const baseClass =
      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border";

    switch (status.toLowerCase()) {
      case "success":
        return (
          <span
            className={`${baseClass} bg-green-500/10 text-green-500 border-green-500/20`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            Success
          </span>
        );
      case "pending":
        return (
          <span
            className={`${baseClass} bg-blue-500/10 text-blue-500 border-blue-500/20`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            Pending
          </span>
        );
      case "failed":
        return (
          <span
            className={`${baseClass} bg-red-500/10 text-red-500 border-red-500/20`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
            Failed
          </span>
        );
      default:
        return (
          <span
            className={`${baseClass} bg-white/10 text-white/70 border-white/20`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
            {status}
          </span>
        );
    }
  };

  const stats = [
    {
      title: "Total Emails",
      value: totalEmails,
      subtitle: "All time",
      icon: "📧",
      color: "purple",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-500",
      borderColor: "border-purple-500/20",
    },
    {
      title: "Sent Successfully",
      value: sentEmails,
      subtitle: `${Math.round((sentEmails / (totalEmails || 1)) * 100)}% of total`,
      icon: "✅",
      color: "green",
      bgColor: "bg-green-500/10",
      textColor: "text-green-500",
      borderColor: "border-green-500/20",
    },
    {
      title: "Avg. Open Rate",
      value: `${openRate}%`,
      subtitle: "Based on sent emails",
      icon: "👁️",
      color: "blue",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-500",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Avg. Click Rate",
      value: `${clickRate}%`,
      subtitle: "Based on sent emails",
      icon: "📊",
      color: "amber",
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-500",
      borderColor: "border-amber-500/20",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-transparent"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>

      <main className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 text-xs font-medium mb-4"
            >
              <span className="flex h-1 w-1 rounded-full bg-blue-500 mr-2"></span>
              <span className="text-blue-400">Email Analytics</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-bold mb-4"
            >
              Performance <span className="text-blue-500">Analytics</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/70 max-w-2xl mx-auto"
            >
              Track and analyze all your email with detailed insights and
              performance metrics
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div
                  className={`bg-[#111] border border-white/10 rounded-lg p-6 h-full transition-all duration-300 group-hover:${stat.borderColor} overflow-hidden relative`}
                >
                  <div
                    className={`absolute top-0 right-0 w-16 h-16 ${stat.bgColor} rounded-full blur-xl -mr-8 -mt-8 transition-all duration-500 group-hover:scale-150`}
                  ></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-white/70">
                        {stat.title}
                      </h3>
                      <span className="text-lg">{stat.icon}</span>
                    </div>
                    <p className="text-3xl font-bold mb-2 group-hover:text-white transition-colors duration-300">
                      {stat.value}
                    </p>
                    <div className="text-xs text-white/50">{stat.subtitle}</div>

                    {stat.title.includes("Rate") &&
                      typeof stat.value === "string" && (
                        <div className="mt-3 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${stat.color === "blue" ? "bg-blue-500" : "bg-amber-500"} transition-all duration-1000`}
                            style={{ width: `${Number.parseInt(stat.value)}%` }}
                          ></div>
                        </div>
                      )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-[#111] border border-white/10 rounded-lg overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

            <div className="relative z-10">
              <div className="px-6 py-4 border-b border-white/10">
                <h2 className="text-lg font-semibold">Email Details</h2>
                <p className="text-sm text-white/70">
                  Detailed view of all your email
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-6 font-medium text-white/70">
                        Recipient
                      </th>
                      <th className="text-left py-4 px-6 font-medium text-white/70">
                        Subject
                      </th>
                      <th className="text-left py-4 px-6 font-medium text-white/70">
                        Scheduled
                      </th>
                      <th className="text-left py-4 px-6 font-medium text-white/70">
                        Status
                      </th>
                      <th className="text-left py-4 px-6 font-medium text-white/70">
                        Opened
                      </th>
                      <th className="text-left py-4 px-6 font-medium text-white/70">
                        Clicked
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {emails.length > 0 ? (
                      [...emails].reverse().map((email, idx) => (
                        <motion.tr
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                        >
                          <td className="py-4 px-6">
                            <div className="font-medium">
                              {email.recipientEmail}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div
                              className="max-w-xs truncate"
                              title={email.subject}
                            >
                              {email.subject}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-white/70">
                            {formatDate(email.scheduledTime)}
                          </td>
                          <td className="py-4 px-6">
                            {renderStatusBadge(email.status)}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              {email.openedAt ? (
                                <>
                                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                  <span className="text-white/70 text-xs">
                                    {formatDate(email.openedAt)}
                                  </span>
                                </>
                              ) : (
                                <span className="text-white/50 text-xs">
                                  Not opened
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              {email.clickedAt ? (
                                <>
                                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                  <span className="text-white/70 text-xs">
                                    {formatDate(email.clickedAt)}
                                  </span>
                                </>
                              ) : (
                                <span className="text-white/50 text-xs">
                                  No clicks
                                </span>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-12 text-center">
                          <div className="text-white/50">
                            <div className="text-4xl mb-4">📭</div>
                            <p className="text-lg font-medium mb-2">
                              No emails found
                            </p>
                            <p className="text-sm">
                              Start by scheduling your first email
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {emails.length > 0 && (
                <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between text-sm text-white/70">
                  <div>
                    Showing {emails.length} email
                    {emails.length !== 1 ? "s" : ""}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
