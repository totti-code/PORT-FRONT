import { LayoutDashboard, LogOut, Mail, Settings, Tags, FolderKanban, Wrench } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const nav = [
  ["Dashboard", "/admin", LayoutDashboard],
  ["Projetos", "/admin/projetos", FolderKanban],
  ["Tecnologias", "/admin/tecnologias", Wrench],
  ["Categorias", "/admin/categorias", Tags],
  ["Mensagens", "/admin/mensagens", Mail],
  ["Configuracoes", "/admin/configuracoes", Settings]
];

export default function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function exit() {
    logout();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white md:grid md:grid-cols-[260px_1fr]">
      <aside className="border-r border-sky-300/10 bg-[#06111f] p-5">
        <div className="mb-8">
          <p className="text-lg font-black">Admin</p>
          <p className="text-sm text-slate-400">{user?.email}</p>
        </div>
        <nav className="grid gap-2">
          {nav.map(([label, to, Icon]) => (
            <NavLink key={to} to={to} end={to === "/admin"} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold ${isActive ? "bg-sky-500 text-white" : "text-slate-400 hover:bg-white/10 hover:text-white"}`}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
          <button onClick={exit} className="mt-4 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-sky-300 hover:bg-sky-300/10">
            <LogOut size={18} /> Sair
          </button>
        </nav>
      </aside>
      <main className="p-5 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
