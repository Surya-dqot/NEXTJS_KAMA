export default function Sidebar() {
  return (
    <aside className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
      <button className="w-10 h-10 bg-[#1e1e2e] border border-white/10 rounded-xl flex flex-col items-center justify-center gap-0.5 hover:border-orange-500/50 transition-colors group">
        <svg className="w-4 h-4 text-gray-400 group-hover:text-orange-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
        </svg>
        <span className="text-[8px] text-gray-500 group-hover:text-gray-300">Download App</span>
      </button>

      <button className="w-10 h-10 bg-[#1e1e2e] border border-white/10 rounded-xl flex flex-col items-center justify-center gap-0.5 hover:border-orange-500/50 transition-colors group">
        <svg className="w-4 h-4 text-gray-400 group-hover:text-orange-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 12l18-9-9 18-2-8-7-1z" />
        </svg>
        <span className="text-[8px] text-gray-500 group-hover:text-gray-300">Web App</span>
      </button>
    </aside>
  );
}