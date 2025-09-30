"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as voidStar } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

export default function History() {//get info
  const [name, setName] = useState("Diego");
  const [ratingsPack,setRatingsPack] = useState([{name:"Steak",rating:2.5,date:"15/07/2025",imgURL:"https:"},{name:"Rice and eggs",rating:5,date:"11/07/2024",imgURL:"https:"},{name:"Rice and eggs",rating:5,date:"15/04/2020",imgURL:"https:"},{name:"Rice and eggs",rating:5,date:"11/07/2024",imgURL:"https:"},{name:"Bandeja Paisa",rating:3,date:"11/07/2024",imgURL:"https:"}]);

  const [foodPacks, setPacks] = useState([{pack:
    [{ name: "Fishes", category: 'Salad', ingredients: ["Salt", "Lettuce", "Etc."] },
    { name: "Taco", category: 'Spicy', ingredients: ["Taco", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat"
    , "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat"] },
    { name: "Fish", category: 'Fast food', ingredients: ["Salt", "Lots of lettuce", "Etc."] },
    { name: "Lemon Soup", category: 'Soup', ingredients: ["Salt", "Watta", "Lemon"] }],date:"14/07/2025"},
  {pack:[{ name: "Fishes", category: 'Salad', ingredients: ["Salt", "Lettuce", "Etc."] },
    { name: "Taco", category: 'Spicy', ingredients: ["Taco", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat"
    , "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat"] },
    { name: "Fish", category: 'Fast food', ingredients: ["Salt", "Lots of lettuce", "Etc."] },
    { name: "Lemon Soup", category: 'Soup', ingredients: ["Salt", "Watta", "Lemon"] }],date:"13/07/2025"},
  {pack:[{ name: "Fishes", category: 'Salad', ingredients: ["Salt", "Lettuce", "Etc."] },
    { name: "Taco", category: 'Spicy', ingredients: ["Taco", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat"
    , "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat"] },
    { name: "Fish", category: 'Fast food', ingredients: ["Salt", "Lots of lettuce", "Etc."] },
    { name: "Lemon Soup", category: 'Soup', ingredients: ["Salt", "Watta", "Lemon"] }],date:"12/07/2025"},
  {pack:[{ name: "Fishes", category: 'Salad', ingredients: ["Salt", "Lettuce", "Etc."] },
    { name: "Taco", category: 'Spicy', ingredients: ["Taco", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat"
    , "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat"] },
    { name: "Fish", category: 'Fast food', ingredients: ["Salt", "Lots of lettuce", "Etc."] },
    { name: "Lemon Soup", category: 'Soup', ingredients: ["Salt", "Watta", "Lemon"] }],date:"11/07/2024"},
  ]);

    const starsController = (position:number)=>{
    const follow_up = [0,0,0,0,0].map((_element,index)=>index<=position?1:0);
    return follow_up.map((element,index)=>
    <FontAwesomeIcon key={index} icon={faStar} className={element==1?'text-yellow-500':'text-white'} size='1x'/>
    );
  }



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
                    <a href="/profile" >{name[0]}</a>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main className="flex flex-col items-center">
          <h2 className="mx-5 my-5 text-left text-xl font-bold">Previous recomendations:</h2>
          <article className="bg-amber-100 w-[90%] h-[330px] p-5 border border-solid border-black rounded-md flex gap-10 overflow-x-auto overflow-y-hidden" style={{scrollbarColor:"#8b8b8b #fef3c6"}}>
          {foodPacks.map((value,index)=>
          <div key={index} className="w-[calc((100%-120px)/4)] flex flex-col justify-center shrink-0">
            <figure className="bg-[#0002]  p-4.5 border border-black border-solid w-full h-[70%] flex flex-col justify-between items-start rounded-md overflow-hidden">
                <div>
                  <ul className="list-disc ps-5">
                    {value.pack.map((currentFood,foodIndex)=>
                    <li key={foodIndex}>{currentFood.name}</li>
                    )}
                  </ul>
                </div>
                <div className="w-full">
                  <h3 className="font-bold text-lg">Pack {index+1}</h3>
                </div>
              </figure>
              <p className="ml-1">{value.date}</p>
          </div>
          )}
          </article>
          <h2 className="mx-5 my-5 text-left text-xl font-bold">Your ratings:</h2>
          <article className="bg-amber-100 w-[90%] h-[330px] p-5 border border-solid border-black rounded-md flex gap-10 overflow-x-auto overflow-y-hidden" style={{scrollbarColor:"#8b8b8b #fef3c6"}}>
            {ratingsPack.map((value,index)=>
            <div key={index} className="w-[calc((100%-120px)/4)] flex flex-col justify-center shrink-0">
              <figure className="z-10 relative border border-black border-solid w-full h-[70%] flex flex-col justify-between items-start rounded-md overflow-hidden">
                <img className="-z-10 absolute w-full h-full object-cover" src="./template.jpeg"/>
                <div className="w-full z-50 p-2 bg-linear-to-b from-[rgba(0,0,0,6)] to-[rgba(0,0,0,0)]">
                  <h3 className="text-xl font-bold text-white">{value.name}</h3>
                </div>
                <div className="w-full z-50 p-2 bg-linear-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,6)]">
                  {starsController(value.rating-1)}
                </div>
              </figure>
              <p>{value.date}</p>
            </div>
            )}
          </article>
        </main>
            
      </div>
    )
};