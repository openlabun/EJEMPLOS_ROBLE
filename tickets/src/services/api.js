import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

// Instancia de Axios
const API = axios.create({
  baseURL: "https://roble-api.openlab.uninorte.edu.co",
});

// Añade el token de acceso automáticamente
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Añade el token de acceso automáticamente
const refreshAuthLogic = async (failedRequest) => {
  const { config } = failedRequest.response;

  const isAuthRequest =
    config.url.includes("/login") ||
    config.url.includes("/signup-direct") ||
    config.url.includes("/forgot-password");

  if (isAuthRequest) {
    return Promise.reject(failedRequest);
  }

  try {
    const oldRefresh = localStorage.getItem("refreshToken");

    const response = await axios.post(
      `https://roble-api.openlab.uninorte.edu.co/auth/${import.meta.env.VITE_PROJECT_ID}/refresh-token`,
      { refreshToken: oldRefresh }
    );

    const { accessToken, refreshToken: newRefresh } = response.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefresh);

    failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`;

    return Promise.resolve();
  } catch (err) {
    console.error("Error al renovar token:", err);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
    return Promise.reject(err);
  }
};



// Añadir interceptor de refresh
createAuthRefreshInterceptor(API, refreshAuthLogic);

export default API;
