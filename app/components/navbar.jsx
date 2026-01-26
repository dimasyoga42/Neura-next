"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { Menu } from "lucide-react";
import { Links } from "react-router-dom";

const Navbar = ({ session }) => {
  return (
    <div className="w-full h-16 flex justify-between justify-items-center items-center">
      <div className="">
        <h1 className="font-extrabold ml-2">Neura Sama</h1>
      </div>
      <div className="flex gap-2">
        {session ? (
          <div className="mr-2 flex gap-2 items-center w-auto">
            <button onClick={() => signOut()} className="btn btn-sm btn-soft">
              logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="mr-2">
            login
          </Link>
        )}
        <div className="drawer">
          <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer-1" className="btn btn-soft btn-md bg-transparent border-none shadow-none">
              <Menu />
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay">Neura Sama</label>
            <ul className="menu bg-base-200 min-h-full w-80">
              {/* Sidebar content here */}
              <li><Link href="/dashboard/bos">Bos</Link></li>
              <li><Link href="/dashboard/appview">Appview</Link></li>
              <li><Link href="/dashboard">xtall</Link></li>
              <li><Link href="/">homepage</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
