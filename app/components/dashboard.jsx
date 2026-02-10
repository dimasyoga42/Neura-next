"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { usePostStore } from "../store/zustand";

export default function Crud() {
  const {
    xtall = [],
    fetchData,
    loading,
    error,
    editXtall,
    searchData,
    deleteData,
    inputxtall
  } = usePostStore();

  // Edit state
  const [selectedId, setSelectedId] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [stat, setStat] = useState("");
  const [route, setRoute] = useState("");

  // Search state
  const [search, setSearch] = useState("");

  // Insert state
  const [inputName, setInputName] = useState("");
  const [inputType, setInputType] = useState("");
  const [inputUpgrade, setinputUpgrade] = useState("")
  const [inputStat, setInputStat] = useState("");
  const [inputRoute, setInputRoute] = useState("");

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openEditModal = (item) => {
    setSelectedId(item.id);
    setName(item.name);
    setType(item.type);
    setStat(item.stat);
    setRoute(item.route);
    document.getElementById("edit_modal").showModal();
  };

  const handleEdit = async () => {
    await editXtall(selectedId, name, type, stat, route);
    document.getElementById("edit_modal").close();
  };

  const handleSearch = async () => {
    await searchData(search);
  };

  const handleDelete = async (id) => {
    await deleteData(id);
  };

  const openInsertModal = () => {
    setInputName("");
    setInputType("");
    setInputStat("");
    setInputRoute("");
    document.getElementById("insert_modal").showModal();
  };

  const handleInsert = async () => {
    await inputxtall(inputName, inputType, inputUpgrade, inputStat, inputRoute);
    document.getElementById("insert_modal").close();
  };

  const closeModal = (modalId) => {
    document.getElementById(modalId).close();
  };

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
      {/* Search & Action Bar */}
      <div className="w-full flex justify-end mb-5 gap-2">
        <input
          type="text"
          className="input pl-2"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn bg-yellow-500 text-white" onClick={handleSearch}>
          search
        </button>
        <button className="btn bg-sky-500 text-white" onClick={openInsertModal}>
          tambah
        </button>
      </div>

      {/* Data Grid */}
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
                className="btn bg-sky-500 text-white btn-sm mt-3"
                onClick={() => openEditModal(item)}
              >
                Edit
              </button>
              <button
                className="btn bg-yellow-500 text-white btn-sm mt-3"
                onClick={() => handleDelete(item.id)}
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL INSERT */}
      <dialog id="insert_modal" className="modal">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg text-center mb-4">
            TAMBAHKAN XTAL
          </h3>

          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              className="input mx-auto border"
              placeholder="Name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            <input
              type="text"
              className="input mx-auto border"
              placeholder="Type"
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
            />
            <input
              type="text"
              className="input mx-auto border"
              placeholder="upgrade"
              value={inputUpgrade}
              onChange={(e) => setinputUpgrade(e.target.value)}
            />
            <input
              type="text"
              className="input mx-auto border"
              placeholder="Stat"
              value={inputStat}
              onChange={(e) => setInputStat(e.target.value)}
            />
            <input
              type="text"
              className="input mx-auto border"
              placeholder="Route"
              value={inputRoute}
              onChange={(e) => setInputRoute(e.target.value)}
            />
          </div>

          <div className="modal-action">
            <button
              className="btn bg-gray-500 text-white"
              onClick={() => closeModal("insert_modal")}
            >
              Batal
            </button>
            <button
              className="btn bg-sky-500 text-white"
              onClick={handleInsert}
            >
              Tambah
            </button>
          </div>
        </div>
      </dialog>

      {/* MODAL EDIT */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg text-center mb-4">
            UPDATE XTAL
          </h3>

          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              className="input mx-auto border"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="input mx-auto border"
              placeholder="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <input
              type="text"
              className="input mx-auto border"
              placeholder="Stat"
              value={stat}
              onChange={(e) => setStat(e.target.value)}
            />
            <input
              type="text"
              className="input mx-auto border"
              placeholder="Route"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
            />
          </div>

          <div className="modal-action">
            <button
              className="btn bg-gray-500 text-white"
              onClick={() => closeModal("edit_modal")}
            >
              Batal
            </button>
            <button
              className="btn btn-primary"
              onClick={handleEdit}
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
