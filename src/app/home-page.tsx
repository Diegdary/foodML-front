"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as voidStar } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';

 

export default function Home() {
  const router = useRouter()
  const { fetchWithAuth, accessToken } = useAuth();
  const [name, setName] = useState("?");
  const [Findex, setFindex] = useState(0);
  const [temp_rating, setTempRt] = useState([0,-1]);//[old position, current position]
  const [foodPack, setPack] = useState([
    {id:1, title: "None", category: '...', ingredients: ["...", "...", "..."], predicted_rating:2, image:"https://res.cloudinary.com/dqlrqzo1a/image/upload/v1760283792/Pizza_frgss0.jpg" },]);

  useEffect(()=>{
    
    const load = async ()=>{
      try{
        if(!accessToken){
          router.push('/login');
          return;
        }
        const res = await fetchWithAuth("http://localhost:8000/api/auth/me");
        setName(res.username);
        const temp_pack = await fetchWithAuth("http://localhost:8000/api/recommendations/last/");
        console.log(temp_pack)
        setPack(temp_pack.recommendations)
      }
      catch(error){
        
        router.push('/login');
      }
    }
    load();
  },[])

  const staticStarsCont = (position:number)=>{
    const follow_up = [0,0,0,0,0].map((_element,index)=>index<=position?1:0);
    return follow_up.map((element,index)=>
      <FontAwesomeIcon key={index} icon={faStar} className={element==1?'text-yellow-500':'text-amber-200'} size='2x'/>
    );
  }

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

  const getFirstName = (fullName:string) => fullName.split(' ')[0];

  const postRating = async(id:number, rating:number)=>{
    if(rating == 0){
      alert("mark a valid rating");
      return;
    }
    const body = await JSON.stringify({id:id,rating:rating})
    const res = await fetchWithAuth("http://127.0.0.1:8000/api/ratings/rate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },body:body})

    console.log(res)
    alert(`Rating "${rating}" posted!`)
  }
  
  
  return (
    <div className="h-dvh w-full bg-[#FFFFF0]">
      <header className="bg-[#fffaab] h-14 w-full ">
        <nav className="flex justify-between items-center h-full">
          <a href="/" className=" font-bold text-2xl ml-3">Recomendations</a>
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
      <main className="bg-[#FFFFF0] flex flex-col items-center">
        <div className="w-[90%]">
          <h1 className="ml-0 self-start mx-5 my-7 text-2xl">Hello, {getFirstName(name)}. Are any of these of interest to you?</h1>
        </div>
        
        <article className="bg-amber-100  w-[90%] h-[335px] p-5 rounded-xl flex gap-10 overflow-x-auto overflow-y-hidden" style={{scrollbarColor:"#8b8b8b #fef3c6"}}>
          {foodPack.map((value, index) => (
            <div key={index} className="w-[calc((100%-120px)/4)] flex flex-col justify-center shrink-0" onClick={() => { setFindex(index) }}>
              <p className="ml-1 font-bold mb-1.5">{value.category}</p>
              <figure className="relative w-full h-[70%] flex items-end rounded-xl overflow-hidden">
                <img className="absolute w-full h-full object-cover " src={value.image} alt="" />
                <div className="w-full z-50 bg-linear-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,6)]">
                  <h3 className="m-2 font-bold  text-white">{value.title}</h3>
                </div>
              </figure>

            </div>
          ))}
        </article>
        <article className="mt-6 w-[90%] h-[300px] flex justify-center">
          <section className="basis-full flex flex-col">
            <div className="w-[90%] self-center">
              <h2 className="text-2xl font-bold">{foodPack[Findex].title}</h2>
              <figure className="mt-1  w-full flex items-end grow">
                <img className="w-full h-full object-cover" src={foodPack[Findex].image} alt="" />
              </figure>
            </div>
          </section>
          <section className="basis-full flex flex-col justify-around">
            <div>
              <h2 className="text-xl font-bold text-center">Possible rating</h2>
              <div className="flex justify-center">
                {staticStarsCont(foodPack[Findex].predicted_rating-1)}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold text-center">Rate it!</h2>
              <div className="flex justify-center">
                {starsController(temp_rating[1])}
              </div>
              <button onClick={()=>{postRating(foodPack[Findex].id, temp_rating[1]+1)}} className="w-[140px] mt-10 p-1 rounded-xl bg-[#47914b] text-white font-bold">Rate!</button>
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
