export default function Loading({ label = "Carregando..." }) {
  return (
    <div className="container-page py-16 text-center text-slate-400">
      <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-sky-300/15 border-t-sky-400" />
      <p>{label}</p>
    </div>
  );
}
