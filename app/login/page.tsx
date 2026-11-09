
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { saveUser } from "@/lib/client-auth";

export default function LoginPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail) {
      setError("Please enter your name and email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    saveUser({
      name: cleanName,
      email: cleanEmail,
    });

    router.push("/assessment");
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-5">

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xl font-bold">
            D
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome to DDAA
          </h1>

          <p className="text-slate-500 mt-2 text-sm">
            Dynamic Distractor Analytics & Assessment
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              autoComplete="name"
              className="w-full text-slate-900 placeholder:text-slate-400 rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              autoComplete="email"
              className="w-full text-slate-900 placeholder:text-slate-400 rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 transition"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-lg transition"
          >
            Start Assessment
          </button>

        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Enter your details to begin the assessment.
        </p>

      </div>
    </main>
  );
}
