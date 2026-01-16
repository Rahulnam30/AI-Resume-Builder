import React, { useState } from "react";
import UserNavBar from "../components/user/UserNavBar/UserNavBar";

export default function Downloads() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const downloads = [
    { id: 1, name: "Resume_1.pdf", type: "PDF" },
    { id: 2, name: "Resume_2.docx", type: "DOCX" },
  ];

  const filteredDownloads = downloads.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = filter === "All" || item.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="user-page">
      {/* Top Navbar */}
      <UserNavBar />

      {/* Page content */}
      <div style={{ marginTop: "80px", padding: "1.5rem" }}>
        <h1 className="text-2xl font-bold mb-4">Downloads</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search downloads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded mb-4"
        >
          <option value="All">All</option>
          <option value="PDF">PDF</option>
          <option value="DOCX">DOCX</option>
        </select>

        {/* Files */}
        <div className="space-y-3">
          {filteredDownloads.length === 0 ? (
            <p className="text-gray-500">No downloads found</p>
          ) : (
            filteredDownloads.map((file) => (
              <div
                key={file.id}
                className="border p-3 rounded flex justify-between"
              >
                <span>{file.name}</span>
                <span className="text-gray-500">{file.type}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
