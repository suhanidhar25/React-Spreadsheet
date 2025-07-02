import { useState } from "react";

export default function Toolbar() {
  const [activeTab, setActiveTab] = useState("Hide fields");

  const tabs = ["Tool bar", "Hide fields", "Sort", "Filter", "Cell view"];

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b bg-[#fefce8] text-xs font-medium text-gray-700">
      {/* Left tabs */}
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-3 py-1 rounded border transition-all duration-150 ${
              activeTab === tab
                ? "bg-white border-gray-300 shadow-sm"
                : "bg-transparent border-transparent hover:bg-white hover:border-gray-300"
            }`}
            onClick={() => {
              console.log(`${tab} clicked`);
              setActiveTab(tab);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Right-side buttons */}
      <div className="flex items-center gap-2">
        <button
          className="border px-3 py-1 rounded bg-white hover:bg-gray-50"
          onClick={() => console.log("Import clicked")}
        >
          Import
        </button>
        <button
          className="border px-3 py-1 rounded bg-white hover:bg-gray-50"
          onClick={() => console.log("Export clicked")}
        >
          Export
        </button>
        <button
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
          onClick={() => console.log("New Action clicked")}
        >
          + New Action
        </button>
      </div>
    </div>
  );
}
