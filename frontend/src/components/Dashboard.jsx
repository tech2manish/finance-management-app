import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, History, PieChart, Plus } from "lucide-react";
import AddTransaction from "./AddTransaction";
import Summary from "./Summary";
import TransactionHistory from "./TransactionHistory";
import axios from "axios";

function Dashboard({ user }) {
  const [view, setView] = useState("summary");
  const [balance, setBalance] = useState(0);
  const [healthMessage, setHealthMessage] = useState("");

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/transactions/balance/${user.id}`
      );
      const currentBalance = res.data;
      setBalance(currentBalance);

      if (currentBalance >= 0) {
        setHealthMessage("You're saving well!");
      } else {
        setHealthMessage("You're in debt. Try to cut down on expenses.");
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">Finance Tracker</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Hello, {user.name}</span>
              <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-medium">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Balance Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-sm font-medium text-gray-500">
                Current Balance
              </h2>
              <div className="mt-1 flex items-baseline">
                <span className="text-3xl font-extrabold text-gray-900">
                  ₹{balance.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  balance >= 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {balance >= 0 ? (
                  <ArrowUp className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDown className="w-4 h-4 mr-1" />
                )}
                {healthMessage}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="sm:hidden">
            <select
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
              value={view}
              onChange={(e) => setView(e.target.value)}
            >
              <option value="summary">View Balance</option>
              <option value="add">Add Income/Expense</option>
              <option value="history">Transaction History</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setView("summary")}
                  className={`${
                    view === "summary"
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <PieChart className="w-5 h-5 mr-2" />
                  View Balance
                </button>
                <button
                  onClick={() => setView("add")}
                  className={`${
                    view === "add"
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Income/Expense
                </button>
                <button
                  onClick={() => setView("history")}
                  className={`${
                    view === "history"
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <History className="w-5 h-5 mr-2" />
                  Transaction History
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {view === "add" && (
            <AddTransaction userId={user.id} onTransaction={fetchBalance} />
          )}
          {view === "summary" && <Summary userId={user.id} />}
          {view === "history" && <TransactionHistory userId={user.id} />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
