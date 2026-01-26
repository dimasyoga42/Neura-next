"use client";
import { usePostStore } from "../store/zustand";
import { useEffect, useState } from "react";
const Appview = () => {
  const [search, Setsearch] = useState("")
  const { appview = [], fetchAppview, loading, error, searchAppview } = usePostStore();
  useEffect(() => {
    fetchAppview();
  }, [fetchAppview])
  if (loading) return <div className="w-full h-lvh flex justify-center justify-items-center items-center"><h1 className="text-gray-500 font-extrabold">loading...</h1></div>
  if (error) return <div className="w-full h-lvh flex justify-center justify-items-center items-center"><h1 className="text-red-500 font-extrabold">Error: {error}</h1></div>



  const handleSearch = async () => {
    await searchAppview(search)
  }
  return (
    <>
      <div className="flex justify-items-center items-center w-full justify-between">
        <h1 className="ml-2 font-extrabold text-sky-500 text-xl">App View dashboard</h1>
        <div className="flex justify-items-center items-center gap-2 mr-5">
          <input type="text" placeholder="search" className="input" value={search} onChange={(e) => Setsearch(e.target.value)} />
          <button className="btn btn-primary" type="submit" onClick={handleSearch}>search</button>
          <button className="btn btn-secondary" type="submit" onClick={handleSearch}>tambah</button>
        </div>

      </div>
      <div className="w-full h-lvh flex justify-center justify-items-center items-center gap-2 flex-wrap">
        {appview.map((item, i) => {
          return (
            <div key={item.id || i} className="max-w-5xl">
              <div className="card w-48 h-58 shadow">
                <div className="card-body">
                  <img src={item.image_url} alt={item.name} className="avatar h-32 w-32" />
                  <h1 className="font-medium text-sm card-title" onClick={() => alert(item.id)}>{item.name}</h1>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default Appview;
