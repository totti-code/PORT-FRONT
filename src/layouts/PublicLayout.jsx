import { Code2, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const links = [
  ["Inicio", "/"],
  ["Projetos", "/projetos"],
  ["Contato", "/contato"]
];

export default function PublicLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020817] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(37,99,235,0.22),transparent_30%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.12),transparent_28%),linear-gradient(135deg,#020817_0%,#06111f_50%,#020817_100%)]" />
      <header className="sticky top-0 z-40 border-b border-sky-300/10 bg-[#06111f]/88 backdrop-blur-xl">
        <nav className="container-page flex h-16 items-center justify-between">
          <Link to="/" className="group flex items-center gap-3 text-white">
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-sky-300/15 bg-[linear-gradient(135deg,rgba(125,211,252,0.14),rgba(59,130,246,0.08)_48%,rgba(15,23,42,0.5))] shadow-[0_12px_30px_rgba(8,47,116,0.18)] transition duration-300 group-hover:-translate-y-0.5 group-hover:border-sky-300/30 group-hover:shadow-[0_16px_36px_rgba(8,47,116,0.22)]">
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_45%)]" />
              <Code2 size={18} className="relative z-10 text-sky-100" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.26em] text-sky-300/80">
                <Sparkles size={11} />
                Build
              </span>
              <span className="mt-1 text-base font-black tracking-[0.22em] text-white sm:text-lg">
                TOTTI CODE
              </span>
            </span>
          </Link>
          <button className="rounded-lg border border-sky-300/15 bg-white/5 p-2 text-sky-100 md:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="hidden items-center gap-6 md:flex">
            {links.map(([label, to]) => (
              <NavLink key={to} to={to} className={({ isActive }) => `text-sm font-semibold ${isActive ? "text-sky-300" : "text-slate-400 hover:text-white"}`}>
                {label}
              </NavLink>
            ))}
            <Link to="/admin" className="btn-secondary py-2">
              Admin
            </Link>
          </div>
        </nav>
        {open && (
          <div className="container-page grid gap-3 pb-4 md:hidden">
            {links.map(([label, to]) => (
              <NavLink key={to} onClick={() => setOpen(false)} to={to} className="rounded-lg border border-sky-300/10 bg-white/10 px-4 py-3 text-sm font-semibold text-sky-100">
                {label}
              </NavLink>
            ))}
            <Link onClick={() => setOpen(false)} to="/admin" className="rounded-lg border border-sky-300/10 bg-white/10 px-4 py-3 text-sm font-semibold text-sky-100">
              Admin
            </Link>
          </div>
        )}
      </header>
      <div className="relative z-10">
        <Outlet />
      </div>
      <footer className="relative z-10 mt-16 border-t border-sky-300/10 bg-[#06111f]/90 py-8 backdrop-blur-xl">
        <div className="container-page flex flex-col justify-between gap-4 text-sm text-slate-400 md:flex-row">
          <p>Portfolio profissional.</p>
          <p>React, Express e SQLite.</p>
        </div>
      </footer>
    </div>
  );
}
