import React, { useState } from "react";

export default function Downloads() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Dummy data (can be replaced with real data later)
  const downloads = [
    { id: 1, name: "Resume_1.pdf", type: "PDF" },
    { id: 2, name: "Resume_2.docx", type: "DOCX" },
  ];

  const filteredDownloads = downloads.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || item.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
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

      {/* Downloads List */}
      {filteredDownloads.length === 0 ? (
        <p className="text-gray-500">No downloads found</p>
      ) : (
        <ul className="space-y-2">
          {filteredDownloads.map((item) => (
            <li
              key={item.id}
              className="border p-3 rounded flex justify-between"
            >
              <span>{item.name}</span>
              <span className="text-sm text-gray-500">{item.type}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

