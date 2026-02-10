"use client"
import { useEffect } from "react";
import { usePostStore } from "../store/zustand";

const AbilityPage = () => {
  const { ability = [], getAbility, loading, error } = usePostStore()
  useEffect(() => {
    getAbility()
  }, [getAbility])

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
    <>
      <div className="w-full min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <h1 className="ml-2 font-extrabold text-sky-500 text-xl">Ability Information</h1>
            <p className="text-gray-500 ml-2">{ability.length} data ability </p>
            <div className="flex justify-items-center items-center gap-2 mr-5">
            </div>

          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
            {ability.map((item, i) => (
              <div
                key={item.id || i}
                className="
                bg-[#141a21]
                rounded-xl
                p-5
                flex
                flex-col
                gap-2
                hover:shadow-lg
                transition-shadow
              "
              >
                {/* TYPE */}
                <span className="text-xs font-medium text-sky-400 uppercase">
                  Ability
                </span>

                {/* NAME */}
                <h2 className="text-lg font-bold text-white leading-tight">
                  {item.name}
                </h2>

                {/* ROUTE */}
                {item.tier && (
                  <p className="text-xs text-gray-400">
                    {item.tier}
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
        </div>
      </div>
    </>
  )
}

export default AbilityPage;
