"use client";

import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import api from "../api";

function Summary({ userId }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/transactions/summary/${userId}`);
        setSummary(res.data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No summary data available</p>
      </div>
    );
  }

  // Calculate savings rate if income is not zero
  const savingsRate =
    summary.income > 0
      ? (((summary.income - summary.expense) / summary.income) * 100).toFixed(1)
      : 0;

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6">
        Financial Summary
      </h3>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Income Card */}
        <div className="bg-white overflow-hidden rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-emerald-100 rounded-md p-3">
                <TrendingUp
                  className="h-6 w-6 text-emerald-600"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Income
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      ₹{summary.income.toLocaleString()}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Expense Card */}
        <div className="bg-white overflow-hidden rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                <TrendingDown
                  className="h-6 w-6 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Expenses
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      ₹{summary.expense.toLocaleString()}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Rate Card */}
        <div className="bg-white overflow-hidden rounded-lg border border-gray-200 sm:col-span-2 lg:col-span-1">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <DollarSign
                  className="h-6 w-6 text-blue-600"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Savings Rate
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {savingsRate}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Health Message */}
      <div className="mt-6 bg-white overflow-hidden rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-medium text-gray-900">
            Financial Health
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>{summary.message}</p>
          </div>
          <div className="mt-5">
            <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
              <div className="sm:flex sm:items-start">
                {summary.income > summary.expense ? (
                  <div className="flex-shrink-0 rounded-full bg-emerald-100 p-2">
                    <ArrowUp
                      className="h-6 w-6 text-emerald-600"
                      aria-hidden="true"
                    />
                  </div>
                ) : (
                  <div className="flex-shrink-0 rounded-full bg-red-100 p-2">
                    <ArrowDown
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div className="mt-3 sm:mt-0 sm:ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {summary.income > summary.expense
                      ? "Positive Cash Flow"
                      : "Negative Cash Flow"}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    {summary.income > summary.expense
                      ? "You're earning more than you're spending. Great job!"
                      : "You're spending more than you're earning. Consider reducing expenses."}
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium ${
                    summary.income > summary.expense
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {summary.income > summary.expense
                    ? "Healthy"
                    : "Needs Attention"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
