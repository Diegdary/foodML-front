"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function MePage() {
  const router = useRouter();
  const { user, fetchWithAuth, logout } = useAuth();
  const [name, setName] = useState("?");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetchWithAuth("http://localhost:8000/api/auth/profile");
      setData(res);
      console.log(res);
      setName(res.username)
    };
    load();
  }, [fetchWithAuth]);

  const starsController = (position:number)=>{
    const follow_up = [0,0,0,0,0].map((_element,index)=>index<=position?1:0);
    return follow_up.map((element,index)=>
      <FontAwesomeIcon key={index} icon={faStar} className={element==1?'text-yellow-500':'text-white'} size='1x'/>
    );
  }

  const signOut = ()=>{
    logout();
    router.replace('/login');
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
                <a href="/profile" >{name && name[0].toUpperCase()}</a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-col ">
        <div>
          <div className="m-3 relative basis-full text-center  flex flex-col items-center">
              <h1 className="m-4 absolute font-bold top-0 left-0 text-4xl">Profile</h1>
              <div className="mb-3 bg-amber-100 border-2 border-black border-solid rounded-full h-40 w-40 flex justify-center items-center">
                <p className="text-8xl font-sans">{name[0].toUpperCase()}</p>
              </div>
              <h2 className="text-3xl font-sans">{name}</h2>
          </div>
        </div>
        <div className="w-[70%] p-11 pt-0 pb-0 pl-[9] flex flex-col self-center" id="content">
          <h2 className="font-bold font-sans text-[18px]">Email:</h2>
          <p>{data?.email}</p>
          <h2 className="font-bold font-sans text-[18px]">Account created at:</h2>
          <p>{data?.created_at}</p>
          <h2 className="font-bold font-sans text-[18px]">Total foods you have rated: </h2>
          <p>{data?.total_rated_foods}</p>
          <h2 className="font-bold font-sans text-[18px]">Average rating: </h2>
          <p>{data?.rating_average}</p>
          <article className="h-[330px] p-3 flex gap-7 justify-center">
            <div className="h-full flex flex-col justify-center shrink-0">
              <h3 className="ml-1 font-bold mb-1.5">Favorite food</h3>
              <figure className="w-[320px] h-[70%] relative flex flex-col justify-between rounded-xl overflow-hidden">
                <img className="z-15 absolute w-full h-full object-cover" src={`${data?.favorite_meal.url_photo}`}/>
                <div className="w-full z-50 p-2 bg-linear-to-b from-[rgba(0,0,0,6)] to-[rgba(0,0,0,0)]">
                  <h3 className="text-xl font-bold text-white">{data && data?.favorite_meal.title}</h3>
                </div>
                <div className="w-full z-50 p-2 bg-linear-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,6)]">
                  {data && starsController(data?.favorite_meal.rating-1)}
                </div>
              </figure>
            </div>
            
            <div className="h-full flex flex-col justify-center shrink-0">
              <h3 className="ml-1 font-bold mb-1.5">Least favorite food</h3>
              <figure className="w-[320px] h-[70%] relative flex flex-col justify-between rounded-xl overflow-hidden">
                <img className="z-15 absolute w-full h-full object-cover" src={`${data?.least_favorite_meal.url_photo}`}/>
                <div className="w-full z-50 p-2 bg-linear-to-b from-[rgba(0,0,0,6)] to-[rgba(0,0,0,0)]">
                  <h3 className="text-xl font-bold text-white">{data?.least_favorite_meal.title}</h3>
                </div>
                <div className="w-full z-50 p-2 bg-linear-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,6)]">
                  {data && starsController(data?.least_favorite_meal.rating-1)}
                </div>
              </figure>
            </div>
          </article>
          <button className="bg-red-500 text-white rounded-xl w-[140px] h-[30px] self-center" onClick={signOut}>Sign out</button>
        </div>
        
        
      </main>
    </div>
  );
}