"use client";


import {useState} from "react";

export default function Home() {
  const [name,setName] = useState("Diego");
  const [foodPack, setPack] = useState([{name:"Fish",category:'Salad',ingredients:["Salt","Lettuce","Etc."]},{name:"Fish",category:'Spicy',ingredients:["Salt","Lettuce","Etc."]},
                                        {name:"Fish",category:'Fast food',ingredients:["Salt","Lettuce","Etc."]},{name:"Fish",category:'Soup',ingredients:["Salt","Lettuce","Etc."]}]);
  return (
    <div>
      <header className="h-14 w-full border border-black border-solid">
        <nav className="flex justify-between items-center h-full">
          <a href="/" className="font-bold">
            Recomendations
          </a>
          <div className="flex justify-around items-center w-[600px] h-full">
            <a href="/" className="font-bold basis-full text-center">History</a>
            <a href="/" className="font-bold basis-full text-center">All foods</a>
            <a href="/" className="font-bold basis-full text-center">Run</a>
            <div  className="font-bold basis-full text-center h-full flex justify-center items-center">
              <div className="bg-amber-100 border-2 border-black border-solid rounded-full h-10 w-10 flex justify-center items-center">
                <a href="/" >{name[0]}</a>
              </div>
              
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-col items-center">
        <h1 className="self-start">Hello {name}. Are any of these of interest to you?</h1>
        <article className="bg-amber-100 border border-black border-solid w-[90%] h-[37vh] p-5 rounded-md flex gap-10">
          {foodPack.map((value,index)=>(
            <div key={index} className="basis-full flex flex-col justify-center">
              <figure className="border border-black border-solid w-full h-[70%] flex items-end">
                <h3 className="m-2 font-bold">{value.name}</h3>
              </figure>
              <p className="ml-1">{value.category}</p>
            </div>
            ))}
        </article>
        <article>
            
        </article>
      </main>
      
    </div>
  );
}
