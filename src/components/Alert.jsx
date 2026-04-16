export default function Alert({ type = "info", children }) {
  if (!children) return null;
  const styles = type === "error" ? "border-red-400/30 bg-red-500/10 text-red-200" : "border-sky-300/30 bg-sky-500/10 text-sky-100";
  return <div className={`rounded-lg border px-4 py-3 text-sm ${styles}`}>{children}</div>;
}
