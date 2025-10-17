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
    <div className="h-[100vh] w-full bg-[#FFFFF0] flex justify-center items-center">
      <form onSubmit={handleSubmit} className="p-14 flex flex-col justify-around bg-white w-[625px] h-[640px] shadow rounded-xl">
        <h2 className="text-center font-sans font-bold text-3xl">Welcome Back!</h2>
        <h3 className="text-center font-sans font-bold">Email:</h3>
        <input className="p-2 text-center outline outline-[#aaa] outline-solid rounded-md" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="juan@gmail.com" autoComplete="email"/>
        <h3 className="text-center font-sans font-bold">Password:</h3>
        <input className="p-2 text-center outline outline-[#aaa] outline-solid rounded-md" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="123@" />
        <button className="font-sans p-2 bg-amber-500 text-white rounded-md" type="submit">Login</button>
        {<p className="font-sans h-[24px] text-red-500">{error}</p>}
        <p className="text-[#777]">Don't have an account? <a className="text-amber-500" href="/register">Sign up</a></p>
      </form>
    </div>
    
  );
}