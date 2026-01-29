"use client";
import { useEffect, useState } from "react";
import { usePostStore } from "../store/zustand";

const Bospages = () => {
  const { bos = [], bosId = [], searchByidBos, featchBos, loading, error, searchBos } = usePostStore();
  const [input, setInput] = useState("");

  useEffect(() => {
    featchBos();
  }, [featchBos]);

  const handleSearch = async () => {
    await searchBos(input);
  };
  const hendleDetail = async (id) => {
    document.getElementById('my_modal_4').showModal()
    searchByidBos(id)
  }

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
              Bos Information
            </h1>
            <p className="text-sm text-gray-400">
              {bos.length} items tersedia
            </p>
          </div>

          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search bos"
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
          {bos.map((item, i) => (
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

              {/* element */}
              {item.element && (
                <p className="text-xs text-gray-400">
                  {item.element}
                </p>
              )}

              {/* spawn */}
              {item.spawn && (
                <div className="mt-2 space-y-1 text-gray-500">
                  {item.spawn}

                </div>
              )}
              <button type="submit" onClick={() => hendleDetail(item.id)}>detail</button>
              <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                  <h3 className="font-bold text-lg py-2">Bos detail</h3>
                  <div className=" w-full h-full">
                    <div className="flex justify-center">
                      <img src={bosId.image_url} className="avatar object-cover" />
                    </div>
                    <div className="py-2">
                      <p className="font-bold text-sky-500 text-xl">{bosId.name}</p>
                      <small className="text-gray-400">{bosId.element} | </small>
                      <small className="text-gray-400">{bosId.spawn}</small>
                      <div className="">
                        <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed">
                          {bosId.stat}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>

          ))}
        </div>

        {/* EMPTY */}
        {bos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">Tidak ada data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bospages;
