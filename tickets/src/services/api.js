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

const refreshAuthLogic = async (failedRequest) => {
  try {
    const oldRefresh = localStorage.getItem("refreshToken");

    const response = await axios.post(
      "https://roble-api.openlab.uninorte.edu.co/auth/tickets_d89e3cf948/refresh-token",
      { refreshToken: oldRefresh }
    );

    const { accessToken, refreshToken: newRefresh } = response.data;

    // Guardar nuevos tokens
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefresh);

    // Reintenta la solicitud original con el nuevo token
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
