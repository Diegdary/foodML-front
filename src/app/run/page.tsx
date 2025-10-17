"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Run(){

  const { fetchWithAuth, accessToken } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("?");

  useEffect(()=>{
        const load = async ()=>{
            if(!accessToken){router.replace('/login')}
            //const res = await fetchWithAuth('http://localhost:8000/api/foods/ratings'); RUN view
            const infoUser = await fetchWithAuth("http://localhost:8000/api/auth/me");
            setName(infoUser.username);
            
        }
        load();
    },[])

    return (
        <div className="h-dvh w-full bg-[#FFFFF0]">
          <header className="bg-[#fffaab] h-14 w-full ">
            <nav className="flex justify-between items-center h-full">
              <a href="/" className="font-bold text-2xl ml-3">Recomendations</a>
              <div className="flex justify-around items-center w-[600px] h-full">
                <a href="/history" className="font-bold basis-full text-center">History</a>
                <a href="/foods" className="font-bold basis-full text-center">All foods</a>
                <a href="/run" className="font-bold basis-full text-center">Run</a>
                <div className="font-bold basis-full text-center h-full flex justify-center items-center">
                  <div className="bg-amber-100 border-2 border-black border-solid rounded-full h-10 w-10 flex justify-center items-center">
                    <a href="/profile" >{name[0].toUpperCase()}</a>
                  </div>
                </div>
              </div>
            </nav>
          </header>
          <main>
            <h1>RUN!!!</h1>
          </main>
          
        </div>
    )
}