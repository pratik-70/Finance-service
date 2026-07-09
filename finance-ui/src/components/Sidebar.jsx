import {
  LayoutDashboard,
  FileText,
  Receipt,
  FileSpreadsheet,
  CreditCard,
  BarChart3,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  {
    icon: LayoutDashboard,
    name: "Dashboard",
    path: "/",
    disabled: false,
  },
  {
    icon: FileText,
    name: "Contracts",
    path: "/contracts",
    disabled: false,
  },
  {
    icon: Receipt,
    name: "Billing Rules",
    path: "/billing-rules",
    disabled: false,
  },
  {
    icon: FileSpreadsheet,
    name: "Invoices",
    path: "/invoices",
    disabled: false,
  },
  {
    icon: CreditCard,
    name: "Payments",
    path: "#",
    disabled: true,
  },
  {
    icon: BarChart3,
    name: "Reports",
    path: "#",
    disabled: true,
  },
  {
    icon: Settings,
    name: "Settings",
    path: "#",
    disabled: true,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex min-h-screen w-72 flex-col border-r border-slate-800/50 bg-slate-950 text-white shadow-2xl shadow-slate-950/30">

      <div className="border-b border-white/10 bg-gradient-to-b from-violet-700 to-slate-950 p-6">

        <div className="inline-flex rounded-2xl bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-violet-100">
          Xebia
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight">
          Finance Service
        </h1>

        <p className="mt-2 text-sm text-slate-300">
          Demo frontend for contract and billing rule management.
        </p>

      </div>

      <nav className="flex-1 p-4">

        {menu.map((item) => {

          const Icon = item.icon;

          if (item.disabled) {
            return (
              <div
                key={item.name}
                className="mb-2 flex cursor-not-allowed items-center gap-3 rounded-2xl px-4 py-3 text-slate-400/70 opacity-50"
              >
                <Icon size={20} />

                <span>{item.name}</span>
              </div>
            );
          }

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-white text-slate-950 font-semibold shadow-lg shadow-violet-950/20"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-5">

        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
          Developed by
        </p>

        <h4 className="mt-2 font-semibold text-white">
          Pratik Kumar
        </h4>

        <p className="mt-2 text-xs text-slate-400">
          Xebia Virtual Internship
        </p>

      </div>

    </aside>
  );
}