"use client";

import { useState } from "react";

export default function Run(){

    const [name, setName] = useState("?");

    return (
        <div>
          <header className="h-14 w-full border border-black border-solid">
            <nav className="flex justify-between items-center h-full">
              <a href="/" className="font-bold text-2xl ml-3">Recomendations</a>
              <div className="flex justify-around items-center w-[600px] h-full">
                <a href="/history" className="font-bold basis-full text-center">History</a>
                <a href="/foods" className="font-bold basis-full text-center">All foods</a>
                <a href="/run" className="font-bold basis-full text-center">Run</a>
                <div className="font-bold basis-full text-center h-full flex justify-center items-center">
                  <div className="bg-amber-100 border-2 border-black border-solid rounded-full h-10 w-10 flex justify-center items-center">
                    <a href="/profile" >{name[0]}</a>
                  </div>
                </div>
              </div>
            </nav>
          </header>
          <h1>RUN!!!</h1>
        </div>
    )
}