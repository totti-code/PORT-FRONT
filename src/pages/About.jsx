import { api, mediaUrl } from "../api/client";
import Loading from "../components/Loading";
import { useFetch } from "../utils/hooks";

export default function About() {
  const settings = useFetch(() => api.get("/api/site-settings"), []);
  const technologies = useFetch(() => api.get("/api/technologies"), []);

  if (settings.loading) return <Loading />;

  return (
    <main className="container-page py-14 text-white">
      <section className="grid gap-10 md:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-5">
          {settings.data?.avatar_url ? (
            <img src={mediaUrl(settings.data.avatar_url)} alt={settings.data.name} className="aspect-square w-full rounded-lg border border-sky-300/10 object-cover shadow-[0_24px_80px_rgba(0,0,0,0.28)]" />
          ) : (
            <div className="aspect-square rounded-lg border border-sky-300/10 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.24),transparent_34%),linear-gradient(135deg,#0f2747,#07162a)] shadow-[0_24px_80px_rgba(0,0,0,0.28)]" />
          )}
          <div className="rounded-lg border border-sky-300/10 bg-white/10 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl">
            <p className="text-sm font-bold text-sky-300">Disponivel para contato</p>
            <p className="mt-2 text-slate-300">{settings.data?.email}</p>
            <p className="text-slate-300">{settings.data?.whatsapp}</p>
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <p className="font-bold text-sky-300">Sobre</p>
            <h1 className="mt-2 text-4xl font-black">{settings.data?.name}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">{settings.data?.description}</p>
          </div>
          <div>
            <h2 className="text-2xl font-black">Habilidades</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {["Interfaces responsivas", "APIs REST", "Bancos relacionais", "Arquitetura limpa"].map((item) => (
                <div key={item} className="rounded-lg border border-sky-300/10 bg-white/10 p-4 font-semibold text-slate-100 backdrop-blur">{item}</div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black">Tecnologias que uso</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {(technologies.data || []).map((tech) => <span key={tech.id} className="rounded-lg border border-sky-300/10 bg-white/10 px-4 py-2 font-semibold text-sky-100 shadow-sm">{tech.name}</span>)}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black">Trajetoria</h2>
            <p className="mt-4 leading-8 text-slate-300">
              Atuo na criacao de produtos digitais com foco em clareza, performance e manutencao. Este portfólio centraliza projetos reais,
              tecnologias dominadas e canais de contato, com conteúdo gerenciado pelo painel administrativo.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
