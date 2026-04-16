import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@portfolio.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  async function submit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#020817] p-4 text-white">
      <form onSubmit={submit} className="w-full max-w-md space-y-5 rounded-lg border border-sky-300/10 bg-white/10 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <div>
          <p className="font-bold text-sky-300">Painel administrativo</p>
          <h1 className="mt-2 text-3xl font-black">Entrar</h1>
        </div>
        <Alert type="error">{error}</Alert>
        <input className="field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={submitting} />
        <input className="field" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} disabled={submitting} />
        <button className="btn-primary w-full" type="submit" disabled={submitting}>
          {submitting ? "Entrando..." : "Acessar painel"}
        </button>
        <p className="text-xs text-slate-400">Padrao local: admin@portfolio.com / admin123</p>
      </form>
    </main>
  );
}
