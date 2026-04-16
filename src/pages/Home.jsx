import { ArrowRight, Mail, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { api, mediaUrl } from "../api/client";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import ProjectCard from "../components/ProjectCard";
import { useFetch } from "../utils/hooks";

export default function Home() {
  const settings = useFetch(() => api.get("/api/site-settings"), []);
  const featured = useFetch(() => api.get("/api/projects/featured/list"), []);
  const technologies = useFetch(() => api.get("/api/technologies"), []);

  if (settings.loading) return <Loading />;
  if (settings.error) return <Alert type="error">{settings.error}</Alert>;

  const hero = buildHero(settings.data, technologies.data);
  const about = buildAbout(settings.data, technologies.data, hero);
  const sections = buildSections(settings.data, about);

  return (
    <main>
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(73,149,255,0.18),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(56,189,248,0.12),transparent_24%),linear-gradient(180deg,rgba(8,18,34,0.72)_0%,rgba(5,11,22,0)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/40 to-transparent" />

        <div className="container-page relative grid items-start gap-4 py-6 md:items-stretch md:grid-cols-[minmax(0,1.25fr)_380px] lg:gap-5 lg:py-8">
          <div className="space-y-4">
            <div className="glass-panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/40 to-transparent" />

              <div className="space-y-6">
                {hero.badge && (
                  <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-sky-300/15 bg-sky-400/[0.08] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-sky-100">
                    <Sparkles size={15} className="shrink-0 text-sky-300" />
                    <span className="truncate">{hero.badge}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {hero.title && (
                    <h1 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-6xl">
                      <HighlightedTitle text={hero.title} />
                    </h1>
                  )}
                  {hero.subtitle && (
                    <p className="max-w-2xl text-lg font-semibold leading-8 text-sky-100/95 sm:text-xl">
                      {hero.subtitle}
                    </p>
                  )}
                </div>

                {hero.description && (
                  <p className="max-w-2xl text-base leading-8 text-slate-300">
                    {hero.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-3 pt-2">
                  <HeroLink action={hero.primaryAction} variant="primary" icon={<ArrowRight size={18} />} />
                  <HeroLink action={hero.secondaryAction} variant="secondary" icon={<Mail size={18} />} />
                </div>

                {hero.highlights.length > 0 && (
                  <div className="flex max-w-3xl flex-wrap gap-2 pt-1">
                    {hero.highlights.map((item, index) => (
                      <span key={`${item}-${index}`} className="rounded-full border border-sky-200/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-200 sm:text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-7">
              <p className="section-kicker">{sections.summary.kicker}</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">{sections.summary.title}</h2>
              {sections.summary.description && <p className="section-copy mt-4">{sections.summary.description}</p>}
            </div>
          </div>

          <HeroVisual hero={hero} skills={about.skills} notes={settings.data?.profile_side_notes} />
        </div>
      </section>

      <section className="py-6 text-white lg:py-8">
        <div className="container-page">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Destaques</p>
              <h2 className="section-title mt-3">Projetos selecionados</h2>
            </div>
            <Link className="btn-secondary" to="/projetos">Todos</Link>
          </div>

          {featured.loading ? (
            <Loading />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {(featured.data || []).map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
          )}
        </div>
      </section>

      <section className="container-page py-6 text-white lg:py-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Stack</p>
            <h2 className="section-title mt-3">Tecnologias</h2>
          </div>
          <Link className="btn-secondary" to="/contato">Contato</Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {(technologies.data || []).map((tech) => (
            <div key={tech.id} className="glass-panel flex min-h-24 items-center gap-3 p-5 transition duration-300 hover:-translate-y-1 hover:border-sky-300/20">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-100 sm:text-base">{tech.name}</span>
                  <TechIconBadge icon={tech.icon} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-8 pt-0 text-white">
        <div className="glass-panel relative overflow-hidden p-6 md:p-8 lg:p-10">
          <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_65%)] lg:block" />
          <p className="section-kicker">{sections.contact.kicker}</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">{sections.contact.title}</h2>
          <p className="section-copy mt-4 max-w-2xl">{sections.contact.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="btn-primary" to="/contato">Enviar mensagem</Link>
            {settings.data?.whatsapp && (
              <a className="btn-secondary" href={buildWhatsAppUrl(settings.data.whatsapp)} target="_blank" rel="noreferrer">
                <MessageCircle size={18} /> WhatsApp
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function buildHero(settings, technologies) {
  const highlights = normalizeList(settings?.hero_highlights);
  const fallbackHighlights = (technologies || []).map((tech) => tech.name).filter(Boolean).slice(0, 4);

  return {
    badge: settings?.hero_badge || settings?.subtitle || "",
    title: settings?.hero_title || settings?.name || "",
    subtitle: settings?.hero_subtitle || settings?.subtitle || "",
    description: settings?.hero_description || settings?.description || "",
    image: settings?.hero_image_url || settings?.avatar_url || "",
    highlights: highlights.length ? highlights : fallbackHighlights,
    primaryAction: {
      text: settings?.hero_primary_button_text || "",
      url: settings?.hero_primary_button_url || ""
    },
    secondaryAction: {
      text: settings?.hero_secondary_button_text || "",
      url: settings?.hero_secondary_button_url || ""
    }
  };
}

function buildAbout(settings, technologies, hero) {
  const summary = settings?.description && settings.description !== hero.description
    ? settings.description
    : "";

  return {
    summary,
    trajectory: summary
      ? ""
      : "Atuo na criacao de produtos digitais com foco em clareza, performance e manutencao. Este portfolio centraliza projetos reais, tecnologias dominadas e canais de contato.",
    skills: [
      "Interfaces responsivas",
      "APIs REST",
      "Bancos relacionais",
      "Arquitetura limpa"
    ].filter((item) => !(technologies || []).some((tech) => tech?.name === item))
  };
}

function buildSections(settings, about) {
  return {
    summary: {
      kicker: settings?.home_summary_kicker || "Inicio",
      title: settings?.home_summary_title || "Resumo profissional",
      description: settings?.home_summary_description || about.summary || about.trajectory
    },
    contact: {
      kicker: settings?.contact_cta_kicker || "Contato rapido",
      title: settings?.contact_cta_title || "Vamos conversar sobre seu proximo projeto.",
      description: settings?.contact_cta_description || "Se voce precisa de uma interface moderna, produto digital bem estruturado ou evolucao no seu portfolio, posso ajudar no processo do conceito ate a entrega."
    }
  };
}

function normalizeList(value) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map((item) => String(item).trim()).filter(Boolean) : [];
  } catch {
    return String(value)
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

function HeroLink({ action, variant, icon }) {
  if (!action?.text || !action?.url) return null;

  const className = variant === "primary" ? "btn-primary" : "btn-secondary";
  const content = (
    <>
      {action.text} {icon}
    </>
  );

  if (/^https?:\/\//i.test(action.url)) {
    return (
      <a className={className} href={action.url} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link className={className} to={action.url}>
      {content}
    </Link>
  );
}

function HighlightedTitle({ text }) {
  const words = text.trim().split(/\s+/);
  if (words.length < 2) return text;

  const accent = words.slice(-2).join(" ");
  const base = words.slice(0, -2).join(" ");

  return (
    <>
      {base} <span className="bg-[linear-gradient(135deg,#93c5fd_0%,#60a5fa_35%,#38bdf8_100%)] bg-clip-text text-transparent">{accent}</span>
    </>
  );
}

function TechIconBadge({ icon }) {
  const label = normalizeTechIcon(icon);
  if (!label) return null;

  return (
    <span className="inline-flex max-w-full items-center rounded-full border border-sky-300/15 bg-sky-400/[0.08] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-sky-200">
      <span className="truncate">{label}</span>
    </span>
  );
}

function normalizeTechIcon(icon) {
  if (!icon) return "";

  const value = String(icon).trim();
  if (!value || value === "#") return "";

  if (value.length <= 3) return value;

  const compactMap = {
    "Network": "API",
    "Route": "REST",
    "Express": "EXP",
    "Shield": "JWT",
    "Server": "NODE",
    "Node.js": "NODE",
    "Code2": "REACT",
    "Database": "SQL",
    "Palette": "UI",
    "Tailwind CSS": "TW",
    "Zap": "VITE"
  };

  return compactMap[value] || value.slice(0, 3).toUpperCase();
}

function buildWhatsAppUrl(value) {
  const phone = String(value || "").replace(/\D/g, "");
  return `https://wa.me/${phone}`;
}

function HeroVisual({ hero, skills, notes }) {
  const image = mediaUrl(hero.image);
  const initials = hero.title
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const visibleSkills = (skills || []).slice(0, 4);
  const profileNotes = (notes || []).length ? notes : [
    "Formacao em Desenvolvimento de Sistemas",
    "Interesse em tecnologia e seguranca",
    "Experiencia com banco de dados (Supabase / PostgreSQL)",
    "Foco em projetos reais e aprendizado continuo",
    "Construindo portfolio solido",
    "Atualmente aprendendo"
  ];

  return (
    <aside className="glass-panel relative mx-auto flex h-full w-full max-w-[380px] flex-col overflow-hidden p-4 sm:p-4.5">
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="relative flex h-full flex-col space-y-5">
        <div className="overflow-hidden rounded-2xl border border-sky-200/10 bg-[#07162a] shadow-[0_18px_40px_rgba(2,12,27,0.32)]">
          {image ? (
            <img src={image} alt={hero.title} className="aspect-[4/3] h-full min-h-[210px] w-full object-cover transition duration-500 hover:scale-[1.02] md:min-h-[238px]" />
          ) : (
            <div className="flex aspect-[4/3] min-h-[210px] items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.28),transparent_34%),linear-gradient(135deg,#0f2747,#07162a)] md:min-h-[238px]">
              <span className="rounded-2xl border border-sky-300/20 bg-white/10 px-5 py-4 text-4xl font-black text-white">
                {initials}
              </span>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-sky-200/10 bg-white/[0.04] p-3.5">
          <div className="space-y-2.5 text-[13px] font-medium leading-5 text-slate-200">
            {profileNotes.map((item, index) => (
              <div key={`${item}-${index}`} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {visibleSkills.length > 0 && (
          <div className="mt-auto rounded-2xl border border-sky-200/10 bg-white/[0.04] p-3.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300/90">Habilidades</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {visibleSkills.map((item, index) => (
                <span key={`${item}-${index}`} className="rounded-full border border-sky-200/10 bg-sky-400/[0.09] px-3 py-2 text-xs font-semibold text-sky-100 transition duration-300 hover:scale-[1.02] hover:bg-sky-400/[0.14]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
