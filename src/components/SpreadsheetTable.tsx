import { useEffect, useRef, useState } from "react";

interface RowData {
  [key: string]: string;
}

const headers = [
  "Job Request",
  "Submitted",
  "Status",
  "Submitter",
  "URL",
  "Assigned",
  "Priority",
  "Due Date",
  "Est. Value",
];

const statusOptions = ["In-process", "Need to start", "Complete", "Blocked"];
const priorityOptions = ["High", "Medium", "Low"];
const LOCAL_KEY = "spreadsheet_data";

export default function SpreadsheetTable() {
  const initialData: RowData[] = [
    {
      "Job Request": "Launch social media campaign for pro...",
      Submitted: "15-11-2024",
      Status: "In-process",
      Submitter: "Aisha Patel",
      URL: "www.aishapatel.com",
      Assigned: "Sophie Choudhury",
      Priority: "Medium",
      "Due Date": "20-11-2024",
      "Est. Value": "6,200,000 ₹",
    },
    {
      "Job Request": "Update press kit for company redesign",
      Submitted: "28-10-2024",
      Status: "Need to start",
      Submitter: "Irfan Khan",
      URL: "www.irfankhan.dev",
      Assigned: "Tejas Pandey",
      Priority: "High",
      "Due Date": "30-10-2024",
      "Est. Value": "3,500,000 ₹",
    },
    {
      "Job Request": "Finalize user testing feedback for app...",
      Submitted: "05-12-2024",
      Status: "In-process",
      Submitter: "Mark Johnson",
      URL: "www.markjohnson.io",
      Assigned: "Rachel Lee",
      Priority: "Medium",
      "Due Date": "10-12-2024",
      "Est. Value": "4,750,000 ₹",
    },
    {
      "Job Request": "Design new features for the website",
      Submitted: "10-01-2025",
      Status: "Complete",
      Submitter: "Emily Green",
      URL: "www.emilygreen.dev",
      Assigned: "Tom Wright",
      Priority: "Low",
      "Due Date": "15-01-2025",
      "Est. Value": "5,900,000 ₹",
    },
    {
      "Job Request": "Prepare financial report for Q4",
      Submitted: "25-01-2025",
      Status: "Blocked",
      Submitter: "Jessica Brown",
      URL: "www.jessicabrown.biz",
      Assigned: "Kevin Smith",
      Priority: "Low",
      "Due Date": "30-01-2025",
      "Est. Value": "2,800,000 ₹",
    },
  ];

  const [data, setData] = useState<RowData[]>(
    () => JSON.parse(localStorage.getItem(LOCAL_KEY) || "null") || initialData
  );

  const [visibleCols, setVisibleCols] = useState<string[]>(headers);
  const [editing, setEditing] = useState<{ row: number; col: number } | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleChange = (value: string, row: number, key: string) => {
    const newData = [...data];
    newData[row][key] = value;
    setData(newData);
  };

  const handleKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    if (!editing) return;
    const maxRow = data.length - 1;
    const visibleHeaderIndices = headers
      .map((h, i) => (visibleCols.includes(h) ? i : -1))
      .filter((i) => i !== -1);
    const currentVisibleCol = visibleHeaderIndices.indexOf(col);

    if (e.key === "ArrowDown" && row < maxRow) setEditing({ row: row + 1, col });
    if (e.key === "ArrowUp" && row > 0) setEditing({ row: row - 1, col });
    if (e.key === "ArrowRight" && currentVisibleCol < visibleHeaderIndices.length - 1)
      setEditing({ row, col: visibleHeaderIndices[currentVisibleCol + 1] });
    if (e.key === "ArrowLeft" && currentVisibleCol > 0)
      setEditing({ row, col: visibleHeaderIndices[currentVisibleCol - 1] });
    if (e.key === "Escape") setEditing(null);
  };

  const isDropdown = (key: string) => key === "Status" || key === "Priority";
  const getOptions = (key: string) => (key === "Status" ? statusOptions : priorityOptions);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "In-process":
        return "bg-yellow-100 text-yellow-800";
      case "Need to start":
        return "bg-orange-100 text-orange-800";
      case "Complete":
        return "bg-green-100 text-green-800";
      case "Blocked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600 font-semibold";
      case "Medium":
        return "text-yellow-600 font-medium";
      case "Low":
        return "text-blue-600 font-medium";
      default:
        return "text-gray-600";
    }
  };

  const addNewRow = () => {
    const blankRow: RowData = {};
    headers.forEach((h) => (blankRow[h] = ""));
    setData((prev) => [...prev, blankRow]);
  };

  const deleteRow = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
    alert("Saved to localStorage ✅");
  };

  const toggleColumn = (col: string) => {
    if (visibleCols.includes(col)) {
      setVisibleCols(visibleCols.filter((c) => c !== col));
    } else {
      setVisibleCols([...visibleCols, col]);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Column Toggle Controls */}
      <div className="flex flex-wrap gap-4 mb-2 text-xs text-gray-600">
        {headers.map((col) => (
          <label key={col} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={visibleCols.includes(col)}
              onChange={() => toggleColumn(col)}
            />
            {col}
          </label>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded border border-gray-200 shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              {headers.map(
                (h, idx) =>
                  visibleCols.includes(h) && (
                    <th key={idx} className="px-3 py-2 border text-left font-semibold">
                      {h}
                    </th>
                  )
              )}
              <th className="px-3 py-2 border font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="even:bg-gray-50">
                {headers.map(
                  (key, colIndex) =>
                    visibleCols.includes(key) && (
                      <td
                        key={colIndex}
                        className="px-3 py-2 border cursor-pointer"
                        onClick={() => setEditing({ row: rowIndex, col: colIndex })}
                      >
                        {editing &&
                        editing.row === rowIndex &&
                        editing.col === colIndex ? (
                          isDropdown(key) ? (
                            <select
                              ref={inputRef as React.RefObject<HTMLSelectElement>}
                              className="w-full border rounded px-2 py-1"
                              value={row[key]}
                              onChange={(e) => handleChange(e.target.value, rowIndex, key)}
                              onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                              onBlur={() => setEditing(null)}
                            >
                              {getOptions(key).map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              ref={inputRef as React.RefObject<HTMLInputElement>}
                              className="w-full border rounded px-2 py-1"
                              value={row[key]}
                              onChange={(e) => handleChange(e.target.value, rowIndex, key)}
                              onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                              onBlur={() => setEditing(null)}
                            />
                          )
                        ) : key === "Status" ? (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                              row[key]
                            )}`}
                          >
                            {row[key]}
                          </span>
                        ) : key === "Priority" ? (
                          <span className={`text-xs ${getPriorityClass(row[key])}`}>
                            {row[key]}
                          </span>
                        ) : (
                          row[key]
                        )}
                      </td>
                    )
                )}
                <td className="px-3 py-2 border text-red-600 text-xs">
                  <button onClick={() => deleteRow(rowIndex)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 pt-2">
        <button
          className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
          onClick={addNewRow}
        >
          + Add Row
        </button>
        <button
          className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700"
          onClick={saveToLocalStorage}
        >
          Save
        </button>
      </div>
    </div>
  );
}
