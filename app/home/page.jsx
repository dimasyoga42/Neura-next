"use client"

import Bospages from "../components/bospage";
import Navhome from "../components/navhome";

const Bosview = () => {
  return (
    <main className="w-full min-h-screen bg-[#0f141a]">
      <Navhome />
      <Bospages />
    </main>
  )
}
export default Bosview;
