import { api } from "../../api/client";
import Loading from "../../components/Loading";
import { useFetch } from "../../utils/hooks";

export default function Dashboard() {
  const projects = useFetch(() => api.get("/api/admin/projects"), []);
  const techs = useFetch(() => api.get("/api/admin/technologies"), []);
  const contacts = useFetch(() => api.get("/api/admin/contacts"), []);

  if (projects.loading || techs.loading || contacts.loading) return <Loading />;

  const featured = (projects.data || []).filter((item) => item.featured).length;
  const cards = [
    ["Projetos", projects.data?.length || 0],
    ["Tecnologias", techs.data?.length || 0],
    ["Mensagens", contacts.data?.length || 0],
    ["Destaques", featured]
  ];

  return (
    <section>
      <h1 className="text-3xl font-black">Dashboard</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-sky-300/10 bg-white/10 p-6 shadow-sm backdrop-blur">
            <p className="text-sm font-semibold text-slate-400">{label}</p>
            <p className="mt-2 text-4xl font-black text-sky-300">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
