function resolveApiUrl() {
  const envApiUrl = import.meta.env.VITE_API_URL?.trim();

  if (envApiUrl) {
    return envApiUrl.replace(/\/+$/, "");
  }

  if (typeof window === "undefined") {
    return "http://localhost:4000";
  }

  const { hostname, origin } = window.location;
  const isLocalhost = ["localhost", "127.0.0.1", "::1"].includes(hostname);

  return isLocalhost ? "http://localhost:4000" : origin;
}

const API_URL = resolveApiUrl();

function clearAuthStorage() {
  localStorage.removeItem("portfolio_token");
  localStorage.removeItem("portfolio_user");
}

function authHeaders() {
  const token = localStorage.getItem("portfolio_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const isForm = options.body instanceof FormData;
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(isForm ? {} : { "Content-Type": "application/json" }),
      ...authHeaders(),
      ...(options.headers || {})
    }
  });

  if (response.status === 204) return null;
  const data = await response.json().catch(() => ({}));

  if (response.status === 401) {
    clearAuthStorage();

    if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
      window.location.replace("/admin/login");
    }
  }

  if (!response.ok) {
    throw new Error(data.message || "Nao foi possivel concluir a acao.");
  }

  return data;
}

export const apiUrl = API_URL;

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" }),
  upload: (path, formData) => request(path, { method: "POST", body: formData })
};

export function mediaUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
}
