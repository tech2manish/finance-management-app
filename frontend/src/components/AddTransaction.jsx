"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  CreditCard,
  DollarSign,
  ShoppingBag,
} from "lucide-react";
import api from "../api";

function AddTransaction({ userId, onTransaction }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("Food");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAdd = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) return;

    setIsSubmitting(true);
    try {
      await api.post(`/transactions/add`, null, {
        params: { userId, amount, type, category },
      });
      onTransaction();
      setAmount("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error adding transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { value: "Food", label: "Food", icon: <ShoppingBag className="w-4 h-4" /> },
    { value: "Rent", label: "Rent", icon: <CreditCard className="w-4 h-4" /> },
    {
      value: "Entertainment",
      label: "Entertainment",
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      value: "Other",
      label: "Other",
      icon: <DollarSign className="w-4 h-4" />,
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6">
        Add {type === "income" ? "Income" : "Expense"}
      </h3>

      {success && (
        <div className="mb-4 rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Transaction added successfully!
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        {/* Transaction Type */}
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transaction Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`flex items-center justify-center rounded-md border ${
                type === "income"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              } px-3 py-2 text-sm font-medium cursor-pointer`}
              onClick={() => setType("income")}
            >
              <ArrowUp
                className={`w-5 h-5 mr-2 ${
                  type === "income" ? "text-emerald-500" : "text-gray-400"
                }`}
              />
              Income
            </div>
            <div
              className={`flex items-center justify-center rounded-md border ${
                type === "expense"
                  ? "bg-red-50 border-red-200 text-red-700"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              } px-3 py-2 text-sm font-medium cursor-pointer`}
              onClick={() => setType("expense")}
            >
              <ArrowDown
                className={`w-5 h-5 mr-2 ${
                  type === "expense" ? "text-red-500" : "text-gray-400"
                }`}
              />
              Expense
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="sm:col-span-3">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Amount
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">₹</span>
            </div>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="block w-full rounded-md border-gray-300 h-8 pl-7 pr-12 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Category */}
        <div className="sm:col-span-6">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full rounded-md border-gray-300 h-8 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleAdd}
          disabled={isSubmitting || !amount || Number.parseFloat(amount) <= 0}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
            isSubmitting || !amount || Number.parseFloat(amount) <= 0
              ? "bg-gray-300 cursor-not-allowed"
              : type === "income"
              ? "bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              : "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          }`}
        >
          {isSubmitting
            ? "Adding..."
            : `Add ${type === "income" ? "Income" : "Expense"}`}
        </button>
      </div>
    </div>
  );
}

export default AddTransaction;
