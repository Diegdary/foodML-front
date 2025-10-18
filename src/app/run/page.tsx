"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Run(){

  const { fetchWithAuth, accessToken } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("?");
  const [last_rec,setLast] = useState<any>({});
  const [waiting,setWaiting] = useState("");

  const runModel = async ()=>{
    const body = await JSON.stringify({})
    const makeSession = await fetchWithAuth("http://localhost:8000/api/recommendations/sessions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },body:body})
      console.log(makeSession)
      setWaiting("Waiting for the model's training...");
      const model = await fetchWithAuth(`http://localhost:8000/api/recommendations/sessions/${makeSession.id}/generate/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },body:body})
    
    
    setWaiting("Done!")
  }

  useEffect(()=>{
        const load = async ()=>{
            if(!accessToken){router.replace('/login')}
            const infoUser = await fetchWithAuth("http://localhost:8000/api/auth/me");
            setName(infoUser.username);
            const previous = await fetchWithAuth("http://localhost:8000/api/recommendations/last/");
            console.log(previous)
            setLast(previous)
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
          <main className="flex flex-col w-full h-[80]">
            <h1 className="m-5 mb-8 font-sans text-[18px]">Once you hit the button, you may experience the new recommendations the model could give you!</h1>
            <article className="mt-5 flex w-[80%] h-[650px] self-center">
              <div className="flex flex-wrap shrink-1 grow-1 basis-0">
                <h2 className="mb-4 font-sans font-bold text-3xl text-center">Previous recomendation</h2>
                <div className="w-[90%] h-[100%] flex flex-col">
                  {last_rec.recommendations?
                  last_rec?.recommendations.map((value:any,index:any)=>
                    <div key={index} className="h-1/5" id="previous">
                      <p className="font-bold">{value.category}</p>
                      <figure className="relative w-full h-[70%] flex items-end rounded-xl overflow-hidden">
                      <img className="absolute w-full h-full object-cover " src={value.image} alt="" />
                      <div className="w-full z-50 bg-linear-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,6)]">
                        <h3 className="m-2 font-bold  text-white">{value.title}</h3>
                      </div>
                    </figure>
                    </div>
                    
                  )
                  
                  :"There aren't any recommendations yet"}
                </div>
              </div>
              <div className="flex flex-col shrink-1 grow-1 basis-0">
                <h2 className="font-sans font-bold text-3xl text-center">What would happen if I click the red button?</h2>
                <div className="flex justify-center h-full">
                  <p className="mt-9 font-sans w-[90%]">Once you hit the big red button at your right, you will test how accurate the model behaves with your current ratings. But be careful, if you haven't rated anything, you won't be able to run it!</p>
                </div>
              </div>
              <div className="flex flex-col shrink-1 grow-1 basis-0">
                <h2 className="font-sans font-bold text-3xl text-center w-full">Run the model</h2>
                <div className="flex justify-center">
                  <button onClick={()=>{runModel()}} className="mt-16 bg-[#980606] text-white font-sans h-[300px] w-[300px] rounded-full border-3 border-[#4b0404] border-solid">Run!</button>
                </div>
                <p className="mt-6 self-center text-gray-600 font-bold">{waiting}</p>
              </div>
            </article>
          </main>
          
        </div>
    )
}