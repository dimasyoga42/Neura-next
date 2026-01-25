"use client";
import { useEffect } from "react";
import Navbar from "../components/navbar";
import { usePostStore } from "../store/zustand";

export default function Crud() {
  const { xtall, fetchData, loading, error } = usePostStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {xtall.map((item, i) => (
          <div
            key={item.id || i}
            className=" rounded-lg shadow  p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-lg font-semibold text-blue-700">{item.name}</h2>
              <span className="px-2 py-1 text-xs font-medium  text-blue-700 rounded">
                {item.type}
              </span>
            </div>

            <p className="text-sm  mb-2">{item.stat}</p>

            <span className="inline-block px-2 py-1 text-xs  rounded">
              {item.route}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
