import { Bell, CircleUserRound, Search } from "lucide-react";

export default function Navbar({ title, description }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 px-8 py-5 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 shadow-sm lg:flex lg:w-80">
            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search across the finance workspace"
              className="ml-3 w-full bg-transparent outline-none placeholder:text-slate-400"
            />
          </div>

          <button className="relative rounded-full border border-slate-200 bg-white p-3 text-slate-600 shadow-sm transition hover:text-slate-900">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <CircleUserRound size={36} className="text-violet-700" />

            <div className="hidden sm:block">
              <h4 className="font-semibold text-slate-900">
                Pratik Kumar
              </h4>

              <p className="text-xs text-slate-500">
                Backend Developer
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}