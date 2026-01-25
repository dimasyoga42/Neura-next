"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { usePostStore } from "../store/zustand";

export default function Crud() {
  const { xtall = [], fetchData, loading, error, editXtall, searchData, deleteData, inputxtall } = usePostStore();

  const [selectedId, setSelectedId] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [stat, setStat] = useState("");
  const [route, setRoute] = useState("");
  const [search, setSearch] = useState("");
  const [id, setId] = useState(null);

  //input xtall
  const [inputname, setinputName] = useState("");
  const [inputtype, setinputType] = useState("");
  const [inputstat, setinputStat] = useState("");
  const [inputroute, setinputRoute] = useState("");
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openModal = (item) => {
    setSelectedId(item.id);
    setName(item.name);
    setType(item.type);
    setStat(item.stat);
    setRoute(item.route);
    document.getElementById("edit_modal").showModal();
  };

  const handleSubmit = async () => {
    await editXtall(selectedId, name, type, stat, route);
    document.getElementById("edit_modal").close();
  };
  const handleSearch = async () => {
    await searchData(search);
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }
  const handleDelete = async (id) => {
    await deleteData(id);
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }
  const handleInsert = async () => {
    await inputxtall(inputname, inputtype, inputstat, inputroute);
    document.getElementById('tambah_modal_1').close();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="w-full flex justify-end mb-5 gap-2">
        <input
          type="text"
          className="input pl-2"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>search</button>
        <button className="btn btn-primary" onClick={() => document.getElementById('tambah_modal_1').showModal()}>tambah</button>
        <dialog id="tambah_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center mb-4">
              TAMBAHKAN XTAL
            </h3>

            <div className="flex flex-col gap-2 w-full">
              <input
                type="text"
                className="input mx-auto"
                placeholder="Name"
                value={inputname}
                onChange={(e) => setinputName(e.target.value)}
                required
              />
              <input
                type="text"
                className="input mx-auto"
                placeholder="Type"
                value={inputtype}
                onChange={(e) => setinputType(e.target.value)}
                required
              />
              <input
                type="text"
                className="input mx-auto"
                placeholder="Stat"
                value={inputstat}
                onChange={(e) => setinputStat(e.target.value)}
                required
              />
              <input
                type="text"
                className="input mx-auto"
                placeholder="Route"
                value={inputroute}
                onChange={(e) => setinputRoute(e.target.value)}
                required
              />
            </div>

            <div className="modal-action">
              <button className="btn btn-primary mx-auto" onClick={handleInsert}>
                Tambah
              </button>

            </div>
          </div>
        </dialog>

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {xtall.map((item) => (
          <div
            key={item.id}
            className="rounded-lg shadow p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-lg font-semibold text-blue-700">
                {item.name}
              </h2>
              <span className="px-2 py-1 text-xs font-medium text-blue-700 rounded">
                {item.type}
              </span>
            </div>

            <p className="text-sm mb-2">{item.stat}</p>

            <div className="flex flex-col">
              <div className="inline-block px-2 py-1 text-xs rounded">
                {item.route}
              </div>

              <button
                className="btn btn-sm mt-3"
                onClick={() => openModal(item)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm mt-3"
                onClick={() => handleDelete(item.id)}
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <dialog id="edit_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center mb-4">
            UPDATE XTAL
          </h3>

          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              className="input mx-auto"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="input mx-auto"
              placeholder="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <input
              type="text"
              className="input mx-auto"
              placeholder="Stat"
              value={stat}
              onChange={(e) => setStat(e.target.value)}
            />
            <input
              type="text"
              className="input mx-auto"
              placeholder="Route"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
            />
          </div>

          <div className="modal-action">
            <button className="btn btn-primary mx-auto" onClick={handleSubmit}>
              Save
            </button>

          </div>
        </div>
      </dialog>
    </div>
  );
}
