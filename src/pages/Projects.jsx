import { useMemo, useState } from "react";
import { api } from "../api/client";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import ProjectCard from "../components/ProjectCard";
import { useFetch } from "../utils/hooks";

export default function Projects() {
  const [technology, setTechnology] = useState("");
  const [category, setCategory] = useState("");
  const projects = useFetch(() => api.get(`/api/projects?${new URLSearchParams({ technology, category })}`), [technology, category]);
  const technologies = useFetch(() => api.get("/api/technologies"), []);
  const categories = useFetch(() => api.get("/api/categories"), []);

  const hasFilters = useMemo(() => technology || category, [technology, category]);

  return (
    <main className="container-page py-14 text-white">
      <div className="mb-8">
        <p className="font-bold text-sky-300">Projetos</p>
        <h1 className="mt-2 text-4xl font-black">Trabalhos recentes</h1>
      </div>

      <div className="mb-8 grid gap-3 rounded-lg border border-sky-300/10 bg-white/10 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl md:grid-cols-[1fr_1fr_auto]">
        <select className="field" value={technology} onChange={(e) => setTechnology(e.target.value)}>
          <option value="">Todas as tecnologias</option>
          {(technologies.data || []).map((tech) => <option key={tech.id} value={tech.name}>{tech.name}</option>)}
        </select>
        <select className="field" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Todas as categorias</option>
          {(categories.data || []).map((cat) => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
        </select>
        {hasFilters && <button className="btn-secondary" onClick={() => { setTechnology(""); setCategory(""); }}>Limpar</button>}
      </div>

      {projects.loading && <Loading />}
      {projects.error && <Alert type="error">{projects.error}</Alert>}
      {!projects.loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(projects.data || []).map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      )}
    </main>
  );
}
