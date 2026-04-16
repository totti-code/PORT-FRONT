import { useState } from "react";
import { api } from "../../api/client";
import AdminTable from "../../components/admin/AdminTable";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";
import { useFetch } from "../../utils/hooks";

export default function AdminTechnologies() {
  const list = useFetch(() => api.get("/api/admin/technologies"), []);
  const [form, setForm] = useState({ id: null, name: "", icon: "" });
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      const saved = form.id
        ? await api.put(`/api/admin/technologies/${form.id}`, form)
        : await api.post("/api/admin/technologies", form);
      list.setData(form.id ? list.data.map((item) => item.id === saved.id ? saved : item) : [...list.data, saved]);
      setForm({ id: null, name: "", icon: "" });
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    if (!confirm("Excluir tecnologia?")) return;
    await api.delete(`/api/admin/technologies/${id}`);
    list.setData(list.data.filter((item) => item.id !== id));
  }

  if (list.loading) return <Loading />;

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-black">Tecnologias</h1>
      <form onSubmit={submit} className="grid gap-3 rounded-lg border border-sky-300/10 bg-white/10 p-5 backdrop-blur-xl md:grid-cols-[1fr_1fr_auto]">
        <Alert type="error">{error}</Alert>
        <input className="field" placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="field" placeholder="Icone ou texto" value={form.icon || ""} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
        <button className="btn-primary">{form.id ? "Atualizar" : "Adicionar"}</button>
      </form>
      <AdminTable rows={list.data || []} columns={[
        { key: "name", label: "Nome" },
        { key: "icon", label: "Icone" },
        { key: "actions", label: "Acoes", render: (row) => (
          <div className="flex gap-2">
            <button className="btn-secondary py-2" onClick={() => setForm(row)}>Editar</button>
            <button className="btn-secondary py-2 text-red-200" onClick={() => remove(row.id)}>Excluir</button>
          </div>
        ) }
      ]} />
    </section>
  );
}
