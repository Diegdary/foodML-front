"use client";

import { useState } from "react";

export default function History() {//get info
  const [name, setName] = useState("Diego");
    return (
      <div>
        <header className="h-14 w-full border border-black border-solid">
          <nav className="flex justify-between items-center h-full">
            <a href="/" className="font-bold text-2xl ml-3">Recomendations</a>
            <div className="flex justify-around items-center w-[600px] h-full">
              <a href="/history" className="font-bold basis-full text-center">History</a>
              <a href="/" className="font-bold basis-full text-center">All foods</a>
              <a href="/" className="font-bold basis-full text-center">Run</a>
              <div className="font-bold basis-full text-center h-full flex justify-center items-center">
                <div className="bg-amber-100 border-2 border-black border-solid rounded-full h-10 w-10 flex justify-center items-center">
                    <a href="/" >{name[0]}</a>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main className="flex flex-col items-center">
          <h2 className="text-left">Previous recomendations:</h2>
          <article className="w-[90%] h-[330px] border border-solid border-black rounded-md ">

          </article>
          <h2 className="text-left">Your ratings:</h2>
          <article className="w-[90%] h-[330px] border border-solid border-black rounded-md ">

          </article>
        </main>
            
      </div>
    )
};