"use client";

import { useEffect } from "react";
import { usePostStore } from "../store/zustand";

const Banner = () => {
  const { banner = [], fetchBanner, loading, error } = usePostStore();

  useEffect(() => {
    fetchBanner();
  }, [fetchBanner]);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-12">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-3 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center py-12">
        <p className="text-red-500 font-medium">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-5xl mx-auto">
        {/* Flex Layout - Horizontal scroll on mobile, wrap on desktop */}
        <div className="flex overflow-x-auto lg:flex-wrap gap-3 pb-2 scrollbar-hide">
          {banner.map((item, i) => (
            <div
              key={item.id || i}
              className="relative flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[calc(33.333%-0.5rem)] rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[160px] sm:h-[180px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <h3 className="text-sm sm:text-base font-semibold leading-snug drop-shadow-lg line-clamp-2 mb-1">
                  {item.title}
                </h3>
                <small className="text-xs text-gray-200">
                  {item.dateStr}
                </small>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {banner.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400">Tidak ada banner</p>
          </div>
        )}
      </div>

      {/* Custom scrollbar hide */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Banner;
