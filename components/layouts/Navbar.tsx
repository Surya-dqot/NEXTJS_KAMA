import Image from "next/image";

export default function Navbar() {
  return (
    <header className="py-5 sticky top-0 z-50 bg-[#0d0d0d] border-b border-white/5">
      <div className="container flex items-center">
        {/* Logo */}
        <div className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="Kama Logo"
            width={44}
            height={52}
            priority
          />
        </div>

        {/* Center — Health / Legal / Career — truly centered */}
        <div className="flex-1 flex items-center justify-center gap-2 pl-24">
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-5 py-1.5 rounded-full transition-colors">
            Health
          </button>
          <button className="border border-white/25 hover:border-white/50 text-white text-xs font-medium px-5 py-1.5 rounded-full transition-colors">
            Legal
          </button>
          <button className="border border-white/25 hover:border-white/50 text-white text-xs font-medium px-5 py-1.5 rounded-full transition-colors">
            Career
          </button>
        </div>

        {/* Right — short search + diamond + avatar */}
        <div className="shrink-0 flex items-center gap-3">
          {/* Short fixed-width search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by languages or regions"
              className="w-48 bg-transparent border border-white/15 rounded-full pl-3 pr-8 py-1.5 text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
              />
            </svg>
          </div>

          {/* Diamond icon */}
          <button className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition-colors">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 9l10 13L22 9 12 2z" />
            </svg>
          </button>

          {/* User avatar */}
          <button className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/20 hover:border-orange-500/50 transition-colors">
            <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
