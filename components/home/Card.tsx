"use client";

import { useState } from "react";
import { Profile } from "@/types/profile.types";

function StatusBadge({ status }: { status: Profile["status"] }) {
  const config = {
    online:  { label: "Online",  dot: "bg-emerald-400" },
    offline: { label: "Offline", dot: "bg-gray-400"    },
    away:    { label: "Away",    dot: "bg-amber-400"   },
  };
  const { label, dot } = config[status];
  return (
    <div className="flex items-center gap-1 bg-black/50 rounded-tl-2xl rounded-br-xl px-2.5 py-1">
      <span className={`w-1.5 h-1.5 rounded-full ${dot} shrink-0`} />
      <span className="text-white text-[11px] font-medium">{label}</span>
    </div>
  );
}

export default function DoctorCard({ doctor }: { doctor: Profile }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 aspect-[4/5] bg-[#1a1a1a] ${
        hovered ? "ring-2 ring-orange-500 scale-[1.02]" : "ring-1 ring-white/10"
      }`}
    >
      {/* Full bleed image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={doctor.image}
        alt={doctor.name}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

      {/* Status badge — flush top-left */}
      <div className="absolute top-0 left-0 z-10">
        <StatusBadge status={doctor.status} />
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-3 pb-3">
        {/* Name */}
        <p className="text-white text-base font-bold truncate mb-1.5 leading-tight">{doctor.name}</p>

        {/* Rating + Specialty — left, video button — right */}
        <div className="flex items-center justify-between">

          {/* Left: star + rating + specialty pill */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white text-[11px] font-semibold">{doctor.rating.toFixed(1)}</span>
            </div>
            <span className="bg-white/15 text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full border border-white/20">
              {doctor.specialty}
            </span>
          </div>

          {/* Right: orange video button */}
          <div className="bg-orange-500 hover:bg-orange-600 rounded-xl p-2 transition-colors shrink-0">
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            </svg>
          </div>

        </div>
      </div>
    </div>
  );
}