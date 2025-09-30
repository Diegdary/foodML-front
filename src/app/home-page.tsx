"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as voidStar } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";


export default function Home() {
  const [name, setName] = useState("Diego Jose");
  const [Findex, setFindex] = useState(0);
  const [temp_rating, setTempRt] = useState([0,-1]);//[old position, current position]
  const [foodPack, setPack] = useState([
    { name: "Fishes", category: 'Salad', ingredients: ["Salt", "Lettuce", "Etc."] },
    { name: "Taco", category: 'Spicy', ingredients: ["Taco", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat"
    , "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat", "Lettuce", "meat"] },
    { name: "Fish", category: 'Fast food', ingredients: ["Salt", "Lots of lettuce", "Etc."] },
    { name: "Lemon Soup", category: 'Soup', ingredients: ["Salt", "Watta", "Lemon"] },
  { name: "Lemon Soup", category: 'Soup', ingredients: ["Salt", "Watta", "Lemon"] }]);

  const starsController = (position:number)=>{
    const follow_up = [0,0,0,0,0].map((_element,index)=>index<=position?1:0);
    return follow_up.map((element,index)=>
    <FontAwesomeIcon key={index} icon={element==1?faStar:voidStar} className={element==1?'text-yellow-500':'text-black'} size='2x' 
    onMouseEnter={()=>setTempRt(last=>[last[1],index])} onMouseLeave={()=>setTempRt(last=>[index,last[0]])} onClick={()=>starClickController(index)}/>
    );
  }

  const starClickController = (position:number)=>{
    setTempRt([position,position]);
  }

  const getFirstName = (fullName:string)=>{
    return fullName.split(' ')[0];
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
                <a href="/" >{name[0]}</a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-col items-center">
        <h1 className="self-start mx-5 my-7 text-xl">Hello, {getFirstName(name)}. Are any of these of interest to you?</h1>
        <article className="bg-amber-100 border border-black border-solid w-[90%] h-[335px] p-5 rounded-md flex gap-10 overflow-x-auto overflow-y-hidden" style={{scrollbarColor:"#8b8b8b #fef3c6"}}>
          {foodPack.map((value, index) => (
            <div key={index} className="w-[calc((100%-120px)/4)] flex flex-col justify-center shrink-0" onClick={() => { setFindex(index) }}>
              <figure className="relative border border-black border-solid w-full h-[70%] flex items-end rounded-md overflow-hidden">
                <img className="absolute w-full h-full object-cover " src="./template.jpeg" alt="" />
                <div className="w-full z-50 bg-linear-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,6)]">
                  <h3 className="m-2 font-bold  text-white">{value.name}</h3>
                </div>
              </figure>
              <p className="ml-1">{value.category}</p>
            </div>
          ))}
        </article>
        <article className="mt-6 w-[90%] h-[300px] flex justify-center">
          <section className="basis-full flex flex-col">
            <div className="w-[90%] self-center">
              <h2 className="text-2xl font-bold">{foodPack[Findex].name}</h2>
              <figure className="mt-1 border border-black border-solid w-full flex items-end grow">
                <img className="w-full h-full object-cover" src="./template.jpeg" alt="" />
              </figure>
            </div>
          </section>
          <section className="basis-full flex flex-col justify-around">
            <div>
              <h2 className="text-xl font-bold text-center">Possible rating</h2>
              <div className="flex justify-center">
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" size="2x" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" size="2x" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" size="2x" />
                <FontAwesomeIcon icon={voidStar} className="text-black" size="2x" />
                <FontAwesomeIcon icon={voidStar} className="text-black" size="2x" />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold text-center">Rate it!</h2>
              <div className="flex justify-center">
                {starsController(temp_rating[1])}
              </div>
              <button className="mt-10 p-1 border-2 border-solid rounded-xl border-black bg-green-700 text-white font-bold">send rating!</button>
            </div>
          </section>
          <section className="basis-full flex flex-col ">
            <h2 className="text-2xl font-bold">Category: {foodPack[Findex].category}</h2>
            <div className="mt-4 pl-2 overflow-x-hidden overflow-y-auto">
              <h3>Ingredients:</h3>
              <ul className="list-disc ps-5">
                {foodPack[Findex].ingredients.map((value, index) => <li key={index}>{value}</li>)}
              </ul>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
