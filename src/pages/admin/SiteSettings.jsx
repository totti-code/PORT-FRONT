import { useEffect, useState } from "react";
import { api } from "../../api/client";
import ImagePreview from "../../components/admin/ImagePreview";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";
import { useFetch } from "../../utils/hooks";

export default function SiteSettings() {
  const settings = useFetch(() => api.get("/api/admin/site-settings"), []);
  const [form, setForm] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (settings.data) {
      setForm({
        ...settings.data,
        hero_highlights: toLines(settings.data.hero_highlights),
        profile_side_notes: toLines(settings.data.profile_side_notes)
      });
    }
  }, [settings.data]);

  async function upload(files, field = "avatar_url") {
    const data = new FormData();
    [...files].forEach((file) => data.append("images", file));
    const result = await api.upload("/api/admin/upload", data);
    setForm((prev) => ({ ...prev, [field]: result.url }));
  }

  async function submit(e) {
    e.preventDefault();
    setFeedback("");
    setError("");
    try {
      const saved = await api.put("/api/admin/site-settings", {
        ...form,
        hero_highlights: fromLines(form.hero_highlights),
        profile_side_notes: fromLines(form.profile_side_notes)
      });
      setForm({
        ...saved,
        hero_highlights: toLines(saved.hero_highlights),
        profile_side_notes: toLines(saved.profile_side_notes)
      });
      setFeedback("Configuracoes salvas.");
    } catch (err) {
      setError(err.message);
    }
  }

  if (settings.loading || !form) return <Loading />;

  return (
    <section>
      <h1 className="text-3xl font-black">Configuracoes do site</h1>
      <form onSubmit={submit} className="mt-6 grid gap-6 rounded-lg border border-sky-300/10 bg-white/10 p-6 shadow-sm backdrop-blur-xl">
        <Alert>{feedback}</Alert>
        <Alert type="error">{error}</Alert>

        <div className="grid gap-4">
          <h2 className="text-xl font-black">Dados gerais</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <input className="field" placeholder="Nome" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="field" placeholder="Subtitulo" value={form.subtitle || ""} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
          </div>
          <textarea className="field min-h-32" placeholder="Descricao" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="grid gap-4 md:grid-cols-2">
            <input className="field" placeholder="Email" value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="field" placeholder="WhatsApp" value={form.whatsapp || ""} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
            <input className="field" placeholder="GitHub" value={form.github_url || ""} onChange={(e) => setForm({ ...form, github_url: e.target.value })} />
            <input className="field" placeholder="LinkedIn" value={form.linkedin_url || ""} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} />
          </div>
        <label className="grid gap-2 text-sm font-semibold">
            Foto ou avatar
            <span className="text-xs font-normal text-slate-400">Recomendado: 800 x 800 px</span>
            <input className="field" type="file" accept="image/*" onChange={(e) => upload(e.target.files, "avatar_url")} />
          </label>
          {form.avatar_url && (
            <ImagePreview src={form.avatar_url} label="Avatar atual" recommended="800 x 800 px" className="h-48 max-w-sm" />
          )}
        </div>

        <div className="grid gap-4 border-t border-sky-300/10 pt-6">
          <div>
            <h2 className="text-xl font-black">Hero da home</h2>
            <p className="mt-1 text-sm text-slate-400">Todos os campos abaixo alimentam a primeira secao da pagina inicial.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input className="field" placeholder="Badge acima do titulo" value={form.hero_badge || ""} onChange={(e) => setForm({ ...form, hero_badge: e.target.value })} />
            <input className="field" placeholder="Titulo principal" value={form.hero_title || ""} onChange={(e) => setForm({ ...form, hero_title: e.target.value })} />
          </div>

          <input className="field" placeholder="Subtitulo de impacto" value={form.hero_subtitle || ""} onChange={(e) => setForm({ ...form, hero_subtitle: e.target.value })} />
          <textarea className="field min-h-28" placeholder="Descricao curta da hero" value={form.hero_description || ""} onChange={(e) => setForm({ ...form, hero_description: e.target.value })} />

          <div className="grid gap-4 md:grid-cols-2">
            <input className="field" placeholder="Texto do botao principal" value={form.hero_primary_button_text || ""} onChange={(e) => setForm({ ...form, hero_primary_button_text: e.target.value })} />
            <input className="field" placeholder="Link do botao principal" value={form.hero_primary_button_url || ""} onChange={(e) => setForm({ ...form, hero_primary_button_url: e.target.value })} />
            <input className="field" placeholder="Texto do botao secundario" value={form.hero_secondary_button_text || ""} onChange={(e) => setForm({ ...form, hero_secondary_button_text: e.target.value })} />
            <input className="field" placeholder="Link do botao secundario" value={form.hero_secondary_button_url || ""} onChange={(e) => setForm({ ...form, hero_secondary_button_url: e.target.value })} />
          </div>

          <label className="grid gap-2 text-sm font-semibold">
            Imagem principal da hero
            <span className="text-xs font-normal text-slate-400">Recomendado: 1200 x 900 px ou 1200 x 1000 px</span>
            <input className="field" type="file" accept="image/*" onChange={(e) => upload(e.target.files, "hero_image_url")} />
          </label>

          {form.hero_image_url && (
            <ImagePreview src={form.hero_image_url} label="Imagem da hero atual" recommended="1200 x 900 px" className="h-48 max-w-sm" />
          )}

          <textarea
            className="field min-h-28"
            placeholder="Tecnologias ou destaques, um por linha"
            value={form.hero_highlights || ""}
            onChange={(e) => setForm({ ...form, hero_highlights: e.target.value })}
          />

          <textarea
            className="field min-h-32"
            placeholder="Bloco abaixo da foto, um item por linha"
            value={form.profile_side_notes || ""}
            onChange={(e) => setForm({ ...form, profile_side_notes: e.target.value })}
          />
        </div>

        <div className="grid gap-4 border-t border-sky-300/10 pt-6">
          <div>
            <h2 className="text-xl font-black">Resumo profissional</h2>
            <p className="mt-1 text-sm text-slate-400">Conteudo exibido abaixo do bloco principal da home.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input className="field" placeholder="Etiqueta da secao" value={form.home_summary_kicker || ""} onChange={(e) => setForm({ ...form, home_summary_kicker: e.target.value })} />
            <input className="field" placeholder="Titulo da secao" value={form.home_summary_title || ""} onChange={(e) => setForm({ ...form, home_summary_title: e.target.value })} />
          </div>
          <textarea className="field min-h-32" placeholder="Texto do resumo profissional" value={form.home_summary_description || ""} onChange={(e) => setForm({ ...form, home_summary_description: e.target.value })} />
        </div>

        <div className="grid gap-4 border-t border-sky-300/10 pt-6">
          <div>
            <h2 className="text-xl font-black">CTA de contato</h2>
            <p className="mt-1 text-sm text-slate-400">Conteudo exibido no bloco final da home.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input className="field" placeholder="Etiqueta do CTA" value={form.contact_cta_kicker || ""} onChange={(e) => setForm({ ...form, contact_cta_kicker: e.target.value })} />
            <input className="field" placeholder="Titulo do CTA" value={form.contact_cta_title || ""} onChange={(e) => setForm({ ...form, contact_cta_title: e.target.value })} />
          </div>
          <textarea className="field min-h-32" placeholder="Descricao do CTA de contato" value={form.contact_cta_description || ""} onChange={(e) => setForm({ ...form, contact_cta_description: e.target.value })} />
        </div>

        <button className="btn-primary w-fit">Salvar configuracoes</button>
      </form>
    </section>
  );
}

function toLines(value) {
  if (Array.isArray(value)) return value.join("\n");
  if (!value) return "";

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.join("\n") : String(value);
  } catch {
    return String(value);
  }
}

function fromLines(value) {
  return String(value || "")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}
