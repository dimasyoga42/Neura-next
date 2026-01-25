"use client";

import { useEffect } from "react";
import { usePostStore } from "../store/zustand";

const Banner = () => {
  const { xtall, fetchBanner, loading, error } = usePostStore();

  useEffect(() => {
    fetchBanner();
  }, [fetchBanner]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="w-full mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {xtall.map((item, i) => (
            <div
              key={item.id || i}
              className="rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden relative group"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="h-auto w-full object-cover"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Text content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg md:text-xl font-semibold drop-shadow-lg">
                    {item.title}
                  </h2>
                  <small className="text-gray-200 text-xs md:text-sm">
                    {item.dateStr}
                  </small>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-600/80 backdrop-blur-sm text-white rounded w-fit mt-1">
                    {item.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Banner;
