<template>
  <div class="historial-container">
    <h3>Historial de Compras</h3>
    <table class="historial-table">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Producto/Membresía</th>
          <th>Imagen</th>
          <th>Cantidad</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="compra in historial" :key="compra.id">
          <td>{{ formatFecha(compra.fecha) }}</td>
          <td>{{ compra.nombre }}</td>
          <td>
            <img v-if="compra.imagen" :src="compra.imagen" alt="Imagen del producto" class="producto-imagen" />
            <span v-else>No disponible</span>
          </td>
          <td>{{ compra.cantidad }}</td>
          <td>${{ compra.total.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "../config";

export default {
  data() {
    return {
      historial: [],
    };
  },
  async created() {
    this.fetchHistorial();
  },
  methods: {
    async fetchHistorial() {
        try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/api/historial`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        this.historial = response.data.map((compra) => ({
            ...compra,
            total: parseFloat(compra.total), // Asegúrate de que sea un número
        }));
        } catch (error) {
        console.error("Error al obtener el historial:", error);
        alert("No se pudo cargar el historial de compras.");
        }
    },
    formatFecha(fecha) {
      const date = new Date(fecha);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    },
  },
};
</script>

<style scoped>
.historial-container {
  padding: 20px;
}

.historial-table {
  width: 100%;
  border-collapse: collapse;
}

.historial-table th,
.historial-table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

.historial-table th {
  background-color: #bee5eb;
}

.producto-imagen {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
