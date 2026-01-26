"use client";

import { useEffect, useState } from "react";
import { usePostStore } from "../store/zustand";

const Bospage = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [element, setElement] = useState("");
  const [stat, setStat] = useState("");
  const [search, setSearch] = useState("");
  //edit
  const [selectedId, setSelectedId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editElement, setEditElement] = useState("");
  const [editStat, setEditStat] = useState("");
  const { bos = [], featchBos, loading, error, searchBos, insertBos, deleteBos, editBos } = usePostStore();

  useEffect(() => {
    featchBos();
  }, [featchBos]);

  if (loading) {
    return (
      <p className="w-full h-svh flex justify-center items-center font-bold text-sky-500">
        Loading...
      </p>
    );
  }
  const handleSearch = async () => {
    await searchBos(search);
  }
  const handleInsert = async () => {
    await insertBos(name, type, image, location, element, stat);
  }
  const handleDelete = async (id) => {
    await deleteBos(id);
  }
  const handleEdit = async () => {
    await editBos(selectedId, editName, editType, editImage, editLocation, editElement, editStat);
  }
  const editModal = (item) => {
    setSelectedId(item.id);
    setEditName(item.name);
    setEditType(item.type);
    setEditImage(item.image_url);
    setEditLocation(item.spawn);
    setEditElement(item.element);
    setEditStat(item.stat);
    document.getElementById("my_modal_bos").showModal();
  }
  if (error) {
    return (
      <p className="w-full text-center text-red-500">
        Error: {error}
      </p>
    );
  }

  return (
    <>
      <div className="flex gap-2 flex-wrap ml-2 justify-between justify-items-center items-center">
        <h1 className="text-sky-500 font-extrabold ml-2">Dashboard Bos Information</h1>
        <div className="flex gap-2 mr-5">
          <input
            type="text"
            className="input ml-2 bg-transparent border"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>search</button>
          <button className="btn btn-warning" onClick={() => document.getElementById('tambah_modal_1').showModal()}>tambah</button>
          <dialog id="tambah_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-center mb-4">
                TAMBAHKAN BOS
              </h3>

              <div className="flex flex-col gap-2 w-full">
                <input
                  type="text"
                  className="input mx-auto border"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="input mx-auto border"
                  placeholder="Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="input mx-auto border"
                  placeholder="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="input mx-auto border"
                  placeholder="spawn"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="input mx-auto border"
                  placeholder="element"
                  value={element}
                  onChange={(e) => setElement(e.target.value)}
                  required
                />
                <textarea
                  type="text"
                  className="textarea p-10 mx-auto  border"
                  placeholder="stat"
                  value={stat}
                  onChange={(e) => setStat(e.target.value)}
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
      </div>
      <div className="w-full mx-auto py-8 px-4 space-y-4 flex flex-wrap gap-2 justify-center">
        {bos.map((item, i) => (
          <div
            key={item.id || i}
            className=" lg:w-[45%] w-[95%]  flex gap-3 p-4 border rounded-lg shadow-sm"
          >
            {/* Image */}
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-28 h-28 object-cover rounded"
              />
            )}
            {/* Content */}
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold text-sky-600">
                {item.name}
              </h3>

              {item.type && (
                <p className="text-sm text-gray-200">
                  <span className="font-medium">Type:</span> {item.type}
                </p>
              )}

              {item.spawn && (
                <p className="text-sm text-gray-200">
                  <span className="font-medium">Location:</span> {item.spawn}
                </p>
              )}

              {item.element && (
                <p className="text-sm text-gray-200">
                  <span className="font-medium">Element:</span> {item.element}
                </p>
              )}
              <div className="flex gap-2">
                <button className="btn btn-primary text-white" onClick={() => editModal(item)}>Edit</button>
                <dialog id="my_modal_bos" className="modal">
                  <div className="modal-box  flex justify-center justify-items-center items-centerw-full mx-auto">
                    <div className="modal-action">
                      <form method="dialog">
                        <div className=" w-full mx-auto flex justify-center flex-col gap-2">
                          <h3 className="font-bold text-lg text-center mb-4">
                            EDIT BOS
                          </h3>
                          <input
                            type="text"
                            className="input mx-auto border"
                            placeholder="Name"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            required
                          />
                          <input
                            type="text"
                            className="input mx-auto border"
                            placeholder="Type"
                            value={editType}
                            onChange={(e) => setEditType(e.target.value)}
                            required
                          />
                          <input
                            type="text"
                            className="input mx-auto border"
                            placeholder="image"
                            value={editImage}
                            onChange={(e) => setEditImage(e.target.value)}
                            required
                          />
                          <input
                            type="text"
                            className="input mx-auto border"
                            placeholder="spawn"
                            value={editLocation}
                            onChange={(e) => setEditLocation(e.target.value)}
                            required
                          />
                          <input
                            type="text"
                            className="input mx-auto border"
                            placeholder="element"
                            value={editElement}
                            onChange={(e) => setEditElement(e.target.value)}
                            required
                          />
                          <textarea
                            type="text"
                            className="textarea p-10 border"
                            placeholder="stat"
                            value={editStat}
                            onChange={(e) => setEditStat(e.target.value)}
                            required
                          />
                          <button className="btn btn-primary text-white m-auto mx-auto" onClick={handleEdit}>update</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </dialog>
                <button className="btn btn-warning" onClick={() => handleDelete(item.id)}>Hapus</button>
              </div>
              <div className="collapse collapse-arrow join-item">
                <input type="radio" name="my-accordion-4" defaultChecked />
                <div className="collapse-title font-semibold text-sky-600">Stat Information</div>
                <div className="collapse-content text-sm">
                  {item.stat && (
                    <p className="text-sm text-gray-200 whitespace-pre-line">
                      <span className="font-medium">Stat:</span>{" "}
                      {item.stat.replaceAll(";", "\n")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {bos.length === 0 && (
          <p className="w-full h-screen flex justify-items-center items-center justify-center text-center text-gray-500">
            Tidak ada data Bos
          </p>
        )}
      </div>
    </>
  );
};

export default Bospage;
