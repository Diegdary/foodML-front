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
                <a href="/profile" >{name[0].toUpperCase()}</a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main >
        <div>
          <div className="font-bold basis-full text-center h-full flex justify-center items-center">
              <div className="bg-amber-100 border-2 border-black border-solid rounded-full h-10 w-10 flex justify-center items-center">
                <a href="/profile" >{name[0].toUpperCase()}</a>
              </div>
            </div>
        </div>
        <h2>Email: </h2>
        <h2>Account created at: {}</h2>
        <h2>Total foods you have rated: </h2>
        <h2>Average rating: </h2>
        <div className="h-[330px]">
          <figure className=" w-[275px]">
            <h3>Favorite food</h3>
            <img className="-z-10 absolute w-full h-full object-cover" src={data &&  `${data.favorite_meal.url_photo}`}/>
            <div className="w-full z-50 p-2 bg-linear-to-b from-[rgba(0,0,0,6)] to-[rgba(0,0,0,0)]">
              <h3 className="text-xl font-bold text-white">{data && data.favorite_meal.title}</h3>
            </div>
            <div className="w-full z-50 p-2 bg-linear-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,6)]">
              {data && starsController(data.favorite_meal.rating-1)}
            </div>
          </figure>
          <figure className="w-[330px] p-5">
            <h3>Less favorite food</h3>
            <img className="-z-10 absolute w-full h-full object-cover" src={data && `${data.least_favorite_meal.url_photo}`}/>
            <div className="w-full z-50 p-2 bg-linear-to-b from-[rgba(0,0,0,6)] to-[rgba(0,0,0,0)]">
              <h3 className="text-xl font-bold text-white">{data && data.least_favorite_meal.title}</h3>
            </div>
            <div className="w-full z-50 p-2 bg-linear-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,6)]">
              {data && starsController(data.least_favorite_meal.rating-1)}
            </div>
          </figure>
        </div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <button className="bg-red-500 text-white rounded-xl w-[140px]" onClick={signOut}>Sign out</button>
      </main>
    </div>
  );
}