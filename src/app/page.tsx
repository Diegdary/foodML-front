"use client";


import {useState} from "react";

export default function Home() {
  const [name,setName] = useState("Diego");
  const [foodPack, setPack] = useState([{name:"Fish",category:'salad',ingredients:["Salt","Lettuce","Etc."]},{name:"Fish",category:'Spicy',ingredients:["Salt","Lettuce","Etc."]},
                                        {name:"Fish",category:'Fast food',ingredients:["Salt","Lettuce","Etc."]},{name:"Fish",category:'Soup',ingredients:["Salt","Lettuce","Etc."]}]);
  return (
    <div>
      <header>
        <nav className="">
          <div>
            recomendations
          </div>
          <ul className="flex justify-around">
            <li>History</li>
            <li>All foods</li>
            <li>Run</li>
            <li>
              <div className="bg-amber-100 border border-black border-solid rounded-4xl">{name[0]}</div>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex flex-col items-center">
        <h1 className="self-start">Hello {name}. Are any of these of interest to you?</h1>
        <article className="bg-amber-100 border border-black border-solid w-4/5 rounded-md flex justify-around">
          {foodPack.map((value,index)=>(
            <div key={index} className="">
              <figure>
                <h3 className="">{value.name}</h3>
              </figure>
              <p>{value.category}</p>
            </div>
            ))}
        </article>
        <article>
            
        </article>
      </main>
      
    </div>
  );
}
