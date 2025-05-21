"use client";

import React from "react";
import { ArrowUpDown, Eye, MoreHorizontal, Trash } from "lucide-react";

export const EmailTable = ({
  emails,
  renderStatusBadge,
  renderPriorityBadge,
  formatDate,
  requestSort,
  sortConfig,
  handleViewDetails,
  tableRef,
  isMobile,
}) => {
  return (
    <div
      ref={tableRef}
      className="overflow-auto rounded-md border border-gray-300"
    >
      <table className="w-full table-auto text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">
              To
              <button
                onClick={() => requestSort("to")}
                className="ml-2 inline-flex items-center"
              >
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </th>
            <th className="p-3 text-left">
              Subject
              <button
                onClick={() => requestSort("subject")}
                className="ml-2 inline-flex items-center"
              >
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </th>
            <th className="p-3 text-left">
              Scheduled For
              <button
                onClick={() => requestSort("scheduledFor")}
                className="ml-2 inline-flex items-center"
              >
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Priority</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {emails.length > 0 ? (
            emails.map((email) => (
              <tr
                key={email.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3 font-medium">{email.to}</td>
                <td className="p-3">{email.subject}</td>
                <td className="p-3">{formatDate(email.scheduledFor)}</td>
                <td className="p-3">{renderStatusBadge(email.status)}</td>
                <td className="p-3">{renderPriorityBadge(email.priority)}</td>
                <td className="p-3 text-right">
                  <div className="relative inline-block text-left">
                    <button
                      className="inline-flex items-center p-1 text-gray-500 hover:text-black"
                      onClick={() => {
                        const menu = document.getElementById(
                          `menu-${email.id}`
                        );
                        if (menu) menu.classList.toggle("hidden");
                      }}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    <div
                      id={`menu-${email.id}`}
                      className="absolute right-0 mt-2 w-40 rounded-md border bg-white shadow-lg hidden z-10"
                    >
                      <button
                        onClick={() => handleViewDetails(email.id)}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                      >
                        <Eye className="mr-2 inline h-4 w-4" />
                        View Details
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100">
                        <Trash className="mr-2 inline h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                No emails found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
