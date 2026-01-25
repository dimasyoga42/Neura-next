"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

const Navbar = ({ session }) => {
  return (
    <div className="w-full h-16 flex items-center justify-between">
      <h1 className="font-extrabold ml-2">Neura Sama</h1>

      {session ? (
        <div className="mr-2 flex gap-2 items-center">
          <span>halo {session.user.username}</span>
          <button onClick={() => signOut()} className="btn btn-sm">
            logout
          </button>
        </div>
      ) : (
        <Link href="/login" className="mr-2">
          login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
