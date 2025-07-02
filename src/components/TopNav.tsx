export default function TopNav() {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b bg-white">
      <div className="text-gray-600 text-xs">
        <span className="text-gray-400">Workspace &gt; Folder 2 &gt;</span>{" "}
        <span className="font-semibold text-gray-700">Spreadsheet 3</span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search within sheet"
          className="border rounded px-2 py-1 text-xs"
        />
        <div className="rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center text-xs font-bold">
          SD
        </div>
      </div>
    </div>
  )
}
