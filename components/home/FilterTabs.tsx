"use client";

const FILTERS = ["All", "Online", "Mental Health", "Therapist", "Psychiatrist", "Counselor"];

interface FilterTabsProps {
  active: string;
  onChange: (filter: string) => void;
}

export default function FilterTabs({ active, onChange }: FilterTabsProps) {
  return (
    <div className="flex gap-2 flex-wrap mb-6">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`text-xs font-medium px-4 py-1.5 rounded-full border transition-all ${
            active === f
              ? "bg-orange-500 border-orange-500 text-white"
              : "bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}