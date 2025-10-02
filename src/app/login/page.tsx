"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.replace("/")
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <h2>Email:</h2>
      <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="juan@gmail.com" autoComplete="email"/>
      <h2>Password:</h2>
      <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="123@"/>
      <button type="submit">Login</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}