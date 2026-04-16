import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { api } from "../api/client";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import { useFetch } from "../utils/hooks";

export default function Contact() {
  const settings = useFetch(() => api.get("/api/site-settings"), []);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setFeedback("");
    setError("");
    try {
      await api.post("/api/contact", form);
      setFeedback("Mensagem enviada com sucesso.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message);
    }
  }

  if (settings.loading) return <Loading />;

  const contacts = [
    [Mail, "Email", settings.data?.email, `mailto:${settings.data?.email}`],
    [MessageCircle, "WhatsApp", settings.data?.whatsapp, `https://wa.me/${String(settings.data?.whatsapp || "").replace(/\D/g, "")}`],
    [Github, "GitHub", settings.data?.github_url, settings.data?.github_url],
    [Linkedin, "LinkedIn", settings.data?.linkedin_url, settings.data?.linkedin_url]
  ].filter(([, , value]) => Boolean(value));

  return (
    <main className="container-page py-12 text-white lg:py-16">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-stretch">
        <section className="glass-panel p-6 sm:p-8">
          <p className="section-kicker">Contato</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">Envie sua mensagem</h1>
          <p className="section-copy mt-4 max-w-2xl">
            Compartilhe contexto, objetivo e prazo. Respondo com mais clareza quando a mensagem ja vem com o problema bem definido.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <Alert>{feedback}</Alert>
            <Alert type="error">{error}</Alert>

            <div className="grid gap-4 md:grid-cols-2">
              <input className="field" placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className="field" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>

            <textarea className="field min-h-48" placeholder="Mensagem" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button className="btn-primary" type="submit">Enviar mensagem</button>
              {settings.data?.email && <span className="text-sm text-slate-400">ou envie direto para {settings.data.email}</span>}
            </div>
          </form>
        </section>

        <aside className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {contacts.map(([Icon, label, value, href]) => (
            <a
              key={label}
              href={href}
              target={String(href || "").startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="glass-panel group flex min-h-[132px] items-start gap-4 p-5 transition duration-300 hover:-translate-y-1 hover:border-sky-300/25"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-sky-300/15 bg-sky-400/[0.08] text-sky-300 transition duration-300 group-hover:bg-sky-400/[0.12]">
                <Icon size={18} />
              </span>
              <span className="min-w-0">
                <strong className="block text-base font-black tracking-tight text-white">{label}</strong>
                <span className="mt-2 block break-words text-sm leading-6 text-slate-300">{value}</span>
              </span>
            </a>
          ))}
        </aside>
      </div>
    </main>
  );
}
