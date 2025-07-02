import TopNav from "./components/TopNav"
import Toolbar from "./components/Toolbar"
import SpreadsheetTable from "./components/SpreadsheetTable"

export default function App() {
  return (
    <div className="font-sans text-sm text-gray-800">
      <TopNav />
      <Toolbar />
      <SpreadsheetTable />
    </div>
  )
}


