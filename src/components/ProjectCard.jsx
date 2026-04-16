import { ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import ImageBox from "./ImageBox";

export default function ProjectCard({ project }) {
  return (
    <article className="card group overflow-hidden">
      <div className="overflow-hidden border-b border-sky-200/10">
        <ImageBox src={project.cover_image} alt={project.title} className="h-52 transition duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="space-y-5 p-5 sm:p-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-300/90">{project.category?.name || "Projeto"}</p>
          <h3 className="mt-2 text-xl font-black tracking-tight text-white transition group-hover:text-sky-100">{project.title}</h3>
          <p className="mt-3 min-h-16 text-sm leading-6 text-slate-300">{project.short_description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech) => (
            <span key={tech.id} className="rounded-full border border-sky-200/10 bg-sky-400/[0.08] px-3 py-1.5 text-xs font-semibold text-sky-100">
              {tech.name}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 border-t border-sky-200/10 pt-4">
          <Link className="btn-secondary py-2" to={`/projetos/${project.slug}`}>
            Detalhes
          </Link>
          {project.live_url && (
            <a className="btn-secondary py-2" href={project.live_url} target="_blank" rel="noreferrer">
              <ExternalLink size={16} /> Site
            </a>
          )}
          {project.github_url && (
            <a className="btn-secondary py-2" href={project.github_url} target="_blank" rel="noreferrer">
              <Github size={16} /> GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
