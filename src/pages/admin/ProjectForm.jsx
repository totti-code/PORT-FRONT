import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/client";
import ImagePreview from "../../components/admin/ImagePreview";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";
import { useFetch } from "../../utils/hooks";

const initial = {
  title: "",
  short_description: "",
  full_description: "",
  cover_image: "",
  gallery_images: [],
  github_url: "",
  live_url: "",
  featured: false,
  status: "draft",
  category_id: "",
  sort_order: 0,
  technology_ids: []
};

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const projects = useFetch(() => api.get("/api/admin/projects"), []);
  const techs = useFetch(() => api.get("/api/admin/technologies"), []);
  const cats = useFetch(() => api.get("/api/admin/categories"), []);
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const editing = useMemo(() => (projects.data || []).find((item) => String(item.id) === String(id)), [projects.data, id]);
  const featuredCount = useMemo(
    () => (projects.data || []).filter((item) => item.featured && String(item.id) !== String(id)).length,
    [projects.data, id]
  );
  const featuredDisabled = !form.featured && featuredCount >= 3;

  useEffect(() => {
    if (editing) {
      setForm({
        ...editing,
        category_id: editing.category?.id || "",
        gallery_images: editing.gallery_images || [],
        technology_ids: editing.technologies?.map((tech) => tech.id) || []
      });
    }
  }, [editing]);

  async function upload(files, field) {
    if (!files?.length) return;
    const data = new FormData();
    [...files].forEach((file) => data.append("images", file));
    const result = await api.upload("/api/admin/upload", data);
    if (field === "cover_image") setForm((prev) => ({ ...prev, cover_image: result.url }));
    if (field === "gallery_images") setForm((prev) => ({ ...prev, gallery_images: [...prev.gallery_images, ...result.urls] }));
  }

  function removeGalleryImage(index) {
    setForm((prev) => ({
      ...prev,
      gallery_images: prev.gallery_images.filter((_, current) => current !== index)
    }));
  }

  function toggleTech(techId) {
    setForm((prev) => ({
      ...prev,
      technology_ids: prev.technology_ids.includes(techId)
        ? prev.technology_ids.filter((id) => id !== techId)
        : [...prev.technology_ids, techId]
    }));
  }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...form, category_id: form.category_id || null };
      if (id) await api.put(`/api/admin/projects/${id}`, payload);
      else await api.post("/api/admin/projects", payload);
      navigate("/admin/projetos");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (projects.loading || techs.loading || cats.loading) return <Loading />;

  return (
    <section>
      <h1 className="text-3xl font-black">{id ? "Editar projeto" : "Criar projeto"}</h1>
      <form onSubmit={submit} className="mt-6 grid gap-5 rounded-lg border border-sky-300/10 bg-white/10 p-6 shadow-sm backdrop-blur-xl">
        <Alert type="error">{error}</Alert>
        <input className="field" placeholder="Titulo" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea className="field" placeholder="Descricao curta" value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} />
        <textarea className="field min-h-40" placeholder="Descricao completa" value={form.full_description} onChange={(e) => setForm({ ...form, full_description: e.target.value })} />
        <div className="grid gap-4 md:grid-cols-2">
          <input className="field" placeholder="GitHub URL" value={form.github_url || ""} onChange={(e) => setForm({ ...form, github_url: e.target.value })} />
          <input className="field" placeholder="Projeto online URL" value={form.live_url || ""} onChange={(e) => setForm({ ...form, live_url: e.target.value })} />
          <select className="field" value={form.category_id || ""} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
            <option value="">Sem categoria</option>
            {(cats.data || []).map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
          <select className="field" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
          </select>
        </div>
        <div>
          <p className="mb-2 font-semibold">Tecnologias</p>
          <div className="flex flex-wrap gap-2">
            {(techs.data || []).map((tech) => (
              <button key={tech.id} type="button" onClick={() => toggleTech(tech.id)} className={`rounded-lg border px-3 py-2 text-sm font-semibold ${form.technology_ids.includes(tech.id) ? "border-sky-400 bg-sky-500 text-white" : "border-sky-300/10 bg-white/10 text-slate-200"}`}>
                {tech.name}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Imagem de capa
            <span className="text-xs font-normal text-slate-400">Recomendado: 1200 x 780 px</span>
            <input className="field" type="file" accept="image/*" onChange={(e) => upload(e.target.files, "cover_image")} />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Galeria
            <span className="text-xs font-normal text-slate-400">Recomendado: 1200 x 780 px por imagem</span>
            <input className="field" type="file" accept="image/*" multiple onChange={(e) => upload(e.target.files, "gallery_images")} />
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-[240px_1fr]">
          <div>
            <p className="mb-2 text-sm font-semibold">Capa atual</p>
            {form.cover_image ? (
              <div className="space-y-2">
                <ImagePreview src={form.cover_image} label="Capa" recommended="1200 x 780 px" />
                <input className="field" placeholder="URL da capa" value={form.cover_image || ""} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} />
              </div>
            ) : (
              <ImagePreview label="Capa" recommended="1200 x 780 px" />
            )}
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold">Imagens da galeria</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(form.gallery_images || []).map((image, index) => (
                <div key={`${image}-${index}`} className="rounded-lg border border-sky-300/10 bg-white/10 p-2">
                  <ImagePreview src={image} label={`Galeria ${index + 1}`} recommended="1200 x 780 px" className="h-28" />
                  <input className="field mt-2" value={image} onChange={(e) => setForm({
                    ...form,
                    gallery_images: form.gallery_images.map((item, current) => current === index ? e.target.value : item)
                  })} />
                  <button type="button" className="btn-secondary mt-2 w-full py-2 text-red-200" onClick={() => removeGalleryImage(index)}>
                    Remover
                  </button>
                </div>
              ))}
              {!form.gallery_images?.length && (
                <ImagePreview label="Galeria" recommended="1200 x 780 px" className="h-28" />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <label className={`flex items-center gap-2 font-semibold ${featuredDisabled ? "text-slate-500" : ""}`}>
            <input type="checkbox" checked={Boolean(form.featured)} disabled={featuredDisabled} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Destaque na home
          </label>
          <span className="text-sm text-slate-400">{form.featured ? `Selecionado. Restantes: ${Math.max(0, 2 - featuredCount)}` : `Disponiveis: ${Math.max(0, 3 - featuredCount)}`}</span>
          <input className="field max-w-40" type="number" value={form.sort_order || 0} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} />
        </div>
        {featuredDisabled && <Alert type="error">Ja existem 3 projetos marcados como destaque. Remova um deles antes de selecionar outro.</Alert>}
        <button className="btn-primary w-fit" disabled={saving}>{saving ? "Salvando..." : "Salvar projeto"}</button>
      </form>
    </section>
  );
}
