"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect} from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Foods(){
    const { fetchWithAuth, accessToken } = useAuth();
    const router = useRouter();
    const [name, setName] = useState("?");
    const [data, setData] = useState([{
        id: 1,
        title: "Arroz con Pollo",
        imgUrl: "https://res.cloudinary.com/dqlrqzo1a/image/upload/v1760035288/arroz-pollo_g4szsd.jpg",
        rating: 5,
        date: "17/10/2025"
    },
    {
        id: 2,
        title: "Sancocho de gallina",
        imgUrl: "https://res.cloudinary.com/dqlrqzo1a/image/upload/v1760283792/Sancocho_de_gallina_jmglhg.jpg",
        rating: 0,
        date: ""
    }])

    const starsController = (position:number)=>{
    const follow_up = [0,0,0,0,0].map((_element,index)=>index<=position?1:0);
    return follow_up.map((element,index)=>
      <FontAwesomeIcon key={index} icon={faStar} className={element==1?'text-yellow-500':'text-white'} size='1x'/>
    );
  }

  useEffect(()=>{
      const load = async ()=>{
          if(!accessToken){router.replace('/login')}
          const res = await fetchWithAuth('http://localhost:8000/api/foods/ratings');
          const infoUser = await fetchWithAuth("http://localhost:8000/api/auth/me");
          setName(infoUser.username);
          setData(res);
      }
      load();
  },[])

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
      <main className="flex justify-center">
        <article className="mt-7 bg-amber-100 w-[90%] h-[84vh] p-5 rounded-xl flex gap-10 flex-wrap overflow-x-hidden overflow-y-auto" style={{scrollbarColor:"#8b8b8b #fef3c6"}}>
            {data && data.map((value,index)=>
            <div key={index} className="w-[calc((100%-120px)/4)] flex flex-col justify-center shrink-0">
              <figure className="z-10 relative w-full h-[200px] flex flex-col justify-between items-start rounded-xl overflow-hidden">
                <img className="-z-10 absolute w-full h-full object-cover" src={`${value.imgUrl}`}/>
                <div className="w-full z-50 p-2 bg-linear-to-b from-[rgba(0,0,0,6)] to-[rgba(0,0,0,0)]">
                  <h3 className="text-xl font-bold text-white">{value.title}</h3>
                </div>
                <div className="w-full z-50 p-2 bg-linear-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,6)]">
                  {starsController(value.rating-1)}
                </div>
              </figure>
              <p>{value.date?value.date:"Not rated yet"}</p>
            </div>
            )}
          </article>
        
      </main>

    </div>
    );
}