<template>
  <div class="section">
    <h3>Rutinas Semanales</h3>

    <table class="rutinas-table">
      <thead>
        <tr>
          <th>Día</th>
          <th>Ejercicio</th>
          <th>Repeticiones</th>
          <th>Descripción</th>
          <th>Nivel</th>
          <th>Recomendaciones</th>
          <th v-if="role === 'admin'">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rutina, index) in rutinas" :key="index">
          <td :class="rutina.dia.toLowerCase()">{{ rutina.dia }}</td>
          <td>
            <input v-if="role === 'admin'" v-model="rutina.ejercicio" />
            <span v-else>{{ rutina.ejercicio }}</span>
          </td>
          <td>
            <input v-if="role === 'admin'" v-model="rutina.repeticiones" />
            <span v-else>{{ rutina.repeticiones }}</span>
          </td>
          <td>
            <input v-if="role === 'admin'" v-model="rutina.descripcion" />
            <span v-else>{{ rutina.descripcion }}</span>
          </td>
          <td>
            <input v-if="role === 'admin'" v-model="rutina.nivel" />
            <span v-else>{{ rutina.nivel }}</span>
          </td>
          <td>
            <input v-if="role === 'admin'" v-model="rutina.recomendaciones" />
            <span v-else>{{ rutina.recomendaciones }}</span>
          </td>
          <td v-if="role === 'admin'">
            <button @click="saveChanges(index)">Guardar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from "../config.js";

export default {
  data() {
    return {
      role: localStorage.getItem('role') || 'cliente', // Obtenemos el rol del localStorage
      rutinas: [], // Array para almacenar las rutinas
    };
  },
  created() {
    this.fetchRutinas(); // Cargar las rutinas desde la API al montar el componente
  },
  methods: {
    // Método para obtener las rutinas de la API
    async fetchRutinas() {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/rutinas/hoy`);
        this.rutinas = response.data.map(rutina => ({
          ...rutina,
          id: rutina.id || null, // Asegurar que cada rutina tenga su ID
        }));
      } catch (error) {
        console.error('Error al cargar las rutinas:', error);
      }
    },
    // Método para guardar cambios en una rutina
    async saveChanges(index) {
      const rutina = this.rutinas[index];
      try {
        await axios.put(`${API_BASE_URL}/api/rutinas/${rutina.id}`, {
          dia: rutina.dia,
          ejercicio: rutina.ejercicio,
          repeticiones: rutina.repeticiones,
          descripcion: rutina.descripcion,
          nivel: rutina.nivel,
          recomendaciones: rutina.recomendaciones,
        });
        alert(`Cambios guardados para ${rutina.dia}: ${rutina.ejercicio} (${rutina.repeticiones} repeticiones)`);
      } catch (error) {
        console.error('Error al guardar cambios:', error);
        alert('No se pudieron guardar los cambios.');
      }
    },
  },
};
</script>

<style scoped>
/* Estilos para la tabla de rutinas */
.rutinas-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.rutinas-table th,
.rutinas-table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

.rutinas-table th {
  background-color:rgb(84, 160, 173);
}

.rutinas-table td.lunes {
  background-color: #f8d7da; /* Color para lunes */
}
.rutinas-table td.martes {
  background-color: #fff3cd; /* Color para martes */
}
.rutinas-table td.miercoles {
  background-color:rgb(92, 147, 104); /* Color para miércoles */
}
.rutinas-table td.jueves {
  background-color: #c3e6cb; /* Color para jueves */
}
.rutinas-table td.viernes {
  background-color: #bee5eb; /* Color para viernes */
}


/* Efecto hover en las filas */
.rutinas-table tbody tr:hover {
  background-color: #f1f1f1; /* Color de fondo al pasar el cursor */
}

/* Botones */
button {
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
