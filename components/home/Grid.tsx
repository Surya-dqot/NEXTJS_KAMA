"use client";

import { useEffect, useState } from "react";
import { HOSTS } from "@/data/hostsMockData";
import Card from "./Card";
import { useSelector } from "react-redux";
import {RootState} from "@/redux/store"
import { fetchHostsListHandler } from "@/hooks/useAuth";

export default function DoctorGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const {hosts,loading,error} = useSelector((state:RootState)=>state.hosts)
  const country="global"
  const token = localStorage.getItem("token")
  const secret_key = localStorage.getItem("secret_key") || "PmW7VrejoLnoR3x}L}tBRUsEQ,|?z";
  const { handleFetchHostsList } = fetchHostsListHandler(token,secret_key,undefined,country);
  
  useEffect(()=>{
    if(!hosts.length){
      handleFetchHostsList()
    }
  },[])

  if(loading) return <p>Loading...</p>
  if(error) return <p>{error}</p>
  
  const filtered = HOSTS.filter((d) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Online") return d.status === "online";
    return d.specialty.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <section className="px-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[24px]">
        {filtered.map((doctor) => (
          <Card key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-600">
          <p className="text-lg">No HOSTS found</p>
          <p className="text-sm mt-1">Try a different filter</p>
        </div>
      )}
    </section>
  );
}
