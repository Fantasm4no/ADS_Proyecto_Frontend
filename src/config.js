// Detectar si la app está en local o en la red
const isLocal = window.location.hostname === "localhost";

export const API_BASE_URL = isLocal
  ? "http://localhost:5000"  // En local
  : "http://192.168.1.72:5000"; // En la red
