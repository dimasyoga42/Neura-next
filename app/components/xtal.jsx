"use client";
import { useEffect, useState } from "react";
import { usePostStore } from "../store/zustand";

const Xtallpage = () => {
  const { xtall = [], fetchData, loading, error, searchData } = usePostStore();
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = async () => {
    await searchData(input);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-gray-300 border-t-sky-500 rounded-full animate-spin"></div>
          <p className="text-sm text-gray-400 font-medium">Memuat...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <p className="text-red-500 font-medium">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4">
          <div>
            <h1 className="text-lg font-bold uppercase tracking-wide">
              Xtall Information
            </h1>
            <p className="text-sm text-gray-400">
              {xtall.length} items tersedia
            </p>
          </div>

          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search xtall..."
              className="input input-bordered bg-transparent w-full"
            />
            <button
              onClick={handleSearch}
              className="btn bg-sky-500 border-none text-white"
            >
              Search
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
          {xtall.map((item, i) => (
            <div
              key={item.id || i}
              className="
                bg-[#141a21]
                rounded-xl
                p-5
                flex
                flex-col
                gap-3
                hover:shadow-lg
                transition-shadow
              "
            >
              {/* TYPE */}
              <span className="text-xs font-medium text-sky-400 uppercase">
                {item.type}
              </span>

              {/* NAME */}
              <h2 className="text-lg font-bold text-white leading-tight">
                {item.name}
              </h2>

              {/* ROUTE */}
              {item.route && (
                <p className="text-xs text-gray-400">
                  {item.route}
                </p>
              )}

              {/* STATS */}
              {item.stat && (
                <div className="mt-2 space-y-1">
                  {item.stat.split(";").map((stat, idx) => (
                    <p key={idx} className="text-sm text-gray-300">
                      {stat.trim()}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* EMPTY */}
        {xtall.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">Tidak ada data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Xtallpage;
