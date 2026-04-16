import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import ProjectForm from "./pages/admin/ProjectForm";
import AdminTechnologies from "./pages/admin/AdminTechnologies";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminContacts from "./pages/admin/AdminContacts";
import SiteSettings from "./pages/admin/SiteSettings";

function Protected({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Navigate to="/" replace />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/projetos/:slug" element={<ProjectDetail />} />
        <Route path="/contato" element={<Contact />} />
      </Route>

      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <Protected>
            <AdminLayout />
          </Protected>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="projetos" element={<AdminProjects />} />
        <Route path="projetos/novo" element={<ProjectForm />} />
        <Route path="projetos/:id" element={<ProjectForm />} />
        <Route path="tecnologias" element={<AdminTechnologies />} />
        <Route path="categorias" element={<AdminCategories />} />
        <Route path="mensagens" element={<AdminContacts />} />
        <Route path="configuracoes" element={<SiteSettings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
