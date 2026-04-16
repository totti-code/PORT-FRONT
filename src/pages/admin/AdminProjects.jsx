import { Edit, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../../api/client";
import AdminTable from "../../components/admin/AdminTable";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";
import { useFetch } from "../../utils/hooks";

export default function AdminProjects() {
  const projects = useFetch(() => api.get("/api/admin/projects"), []);
  const featuredCount = (projects.data || []).filter((item) => item.featured).length;

  async function remove(id) {
    if (!confirm("Excluir este projeto?")) return;
    await api.delete(`/api/admin/projects/${id}`);
    projects.setData(projects.data.filter((item) => item.id !== id));
  }

  if (projects.loading) return <Loading />;

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-3xl font-black">Projetos</h1>
          <p className="text-sm text-slate-400">Destaques na home: {featuredCount}/3</p>
        </div>
        <Link className="btn-primary" to="/admin/projetos/novo"><Plus size={18} /> Novo projeto</Link>
      </div>
      <Alert type="error">{projects.error}</Alert>
      <AdminTable
        rows={projects.data || []}
        columns={[
          { key: "title", label: "Titulo" },
          { key: "category", label: "Categoria", render: (row) => row.category?.name || "-" },
          { key: "status", label: "Status" },
          { key: "featured", label: "Destaque", render: (row) => row.featured ? "Sim" : "Nao" },
          { key: "actions", label: "Acoes", render: (row) => (
            <div className="flex gap-2">
              <Link className="btn-secondary py-2" to={`/admin/projetos/${row.id}`}><Edit size={16} /> Editar</Link>
              <button className="btn-secondary py-2 text-red-200" onClick={() => remove(row.id)}><Trash2 size={16} /> Excluir</button>
            </div>
          ) }
        ]}
      />
    </section>
  );
}
