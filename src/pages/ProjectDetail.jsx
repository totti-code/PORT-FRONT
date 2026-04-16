import { ExternalLink, Github } from "lucide-react";
import { useParams } from "react-router-dom";
import { api } from "../api/client";
import Alert from "../components/Alert";
import ImageBox from "../components/ImageBox";
import Loading from "../components/Loading";
import { useFetch } from "../utils/hooks";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = useFetch(() => api.get(`/api/projects/${slug}`), [slug]);

  if (project.loading) return <Loading />;
  if (project.error) return <main className="container-page py-14 text-white"><Alert type="error">{project.error}</Alert></main>;

  const item = project.data;
  const gallery = [item.cover_image, ...(item.gallery_images || [])].filter(Boolean);

  return (
    <main className="container-page py-14 text-white">
      <div className="mb-8">
        <p className="font-bold text-sky-300">{item.category?.name || "Projeto"} - {item.status}</p>
        <h1 className="mt-2 text-4xl font-black">{item.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{item.short_description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {gallery.length ? gallery.map((image, index) => <ImageBox key={`${image}-${index}`} src={image} alt={item.title} className="h-72" />) : <ImageBox alt={item.title} className="h-72 md:col-span-2" />}
      </div>

      <section className="mt-10 grid gap-8 md:grid-cols-[1fr_320px]">
        <div className="rounded-lg border border-sky-300/10 bg-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl">
          <h2 className="text-2xl font-black">Descricao completa</h2>
          <p className="mt-4 whitespace-pre-line leading-8 text-slate-300">{item.full_description}</p>
        </div>
        <aside className="space-y-4 rounded-lg border border-sky-300/10 bg-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl">
          <h2 className="text-xl font-black">Tecnologias</h2>
          <div className="flex flex-wrap gap-2">
            {item.technologies?.map((tech) => <span key={tech.id} className="rounded-lg border border-sky-300/10 bg-white/10 px-3 py-2 text-sm font-semibold text-sky-100">{tech.name}</span>)}
          </div>
          {item.github_url && <a className="btn-secondary w-full" href={item.github_url} target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>}
          {item.live_url && <a className="btn-primary w-full" href={item.live_url} target="_blank" rel="noreferrer"><ExternalLink size={18} /> Projeto online</a>}
        </aside>
      </section>
    </main>
  );
}
