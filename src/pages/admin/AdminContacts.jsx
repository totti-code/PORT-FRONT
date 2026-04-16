import { api } from "../../api/client";
import AdminTable from "../../components/admin/AdminTable";
import Loading from "../../components/Loading";
import { useFetch } from "../../utils/hooks";

export default function AdminContacts() {
  const contacts = useFetch(() => api.get("/api/admin/contacts"), []);
  if (contacts.loading) return <Loading />;

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-black">Mensagens</h1>
      <AdminTable rows={contacts.data || []} columns={[
        { key: "name", label: "Nome" },
        { key: "email", label: "Email" },
        { key: "message", label: "Mensagem" },
        { key: "created_at", label: "Recebida em" }
      ]} />
    </section>
  );
}
