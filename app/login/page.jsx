"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Pagereg = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false, // PENTING
      username: username,
      password: password,
      callbackUrl: "/dashboard"
    });

    setLoading(false);

    if (res?.error) {
      setError("Username atau password salah");
      return;
    }

    if (res?.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full h-svh flex justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-sky-500">Neura Sama</h2>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2 text-xs">
            <span className="label">username</span>
            <input
              type="text"
              className="input input-bordered"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <span className="label">password</span>
            <input
              type="password"
              className="input input-bordered"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <p className="text-red-500 text-xs mt-2 text-center">
                {error}
              </p>
            )}

            <div className="mt-6">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? "loading..." : "login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Pagereg;
