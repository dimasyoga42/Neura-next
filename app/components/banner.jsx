"use client";

import { useEffect } from "react";
import { usePostStore } from "../store/zustand";

const Banner = () => {
  const { banner = [], fetchBanner, loading } = usePostStore();

  useEffect(() => {
    fetchBanner();
  }, [fetchBanner]);

  if (loading) return null;

  return (
    <section className="flex justify-center relative">
      <div className="w-full h-auto flex gap-2 flex-wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {banner.slice(0, 2).map((item, i) => (
            <div
              key={i}
              className="relative w-full h-auto "
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover"
              />
              <div className=" max-w-xl">
                <h2 className="text-white font-extrabold">
                  {item.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
