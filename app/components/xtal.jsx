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
  }
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600 font-medium">Memuat...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-red-500 font-medium">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8 flex  gap-2 flex-col ">
          <div>
            <h1 className="text-md font-bold mb-1 uppercase">Xtall Information</h1>
            <p className="text-sm text-gray-500">{xtall.length} items tersedia</p>
          </div>
          <div className="flex">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search..." className="input bg-transparent border  w-65" />
            <button onClick={handleSearch} className="btn btn-primary">Search</button>
          </div>
        </div>


        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {xtall.map((item, i) => (
            <div
              key={item.id || i}
              className=" rounded-lg shadow  p-5 hover:shadow-md transition-shadow"
            >
              {/* Type Badge */}
              <div className="mb-3">
                <span className="inline-block px-2.5 py-0.5 text-sky-500 text-xs font-medium rounded">
                  {item.type}
                </span>
              </div>

              {/* Name */}
              <h2 className="text-xl font-bold  mb-4">
                {item.name}
              </h2>
              <p className="text-xs mb-4">
                {item.route}
              </p>
              {/* Stats */}
              {item.stat && (
                <div className="space-y-1.5">
                  {item.stat.split(';').map((stat, idx) => (
                    <p key={idx} className="text-sm text-gray-400">
                      {stat.trim()}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {xtall.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400">Tidak ada data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Xtallpage;
