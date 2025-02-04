<template>
  <div class="section">
    <h3>Rutinas Semanales</h3>

    <!-- Verificación del rol -->
    <table class="rutinas-table">
      <thead>
        <tr>
          <th>Día</th>
          <th>Ejercicio</th>
          <th>Repeticiones</th>
          <th>Descripcion</th>
          <th>Nivel</th>
          <th>Duracion</th>
          <th>Recomendaciones</th>
          <th v-if="role === 'admin'">Acciones</th> <!-- Solo visible para admin -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rutina, index) in rutinas" :key="index">
          <td>{{ rutina.dia }}</td>
          <td>
            <input v-if="role === 'admin'" v-model="rutina.ejercicio" /> <!-- Editable solo para admin -->
            <span v-else>{{ rutina.ejercicio }}</span>
          </td>
          <td>
            <input v-if="role === 'admin'" v-model="rutina.repeticiones" /> <!-- Editable solo para admin -->
            <span v-else>{{ rutina.repeticiones }}</span>
          </td>
          <td>
            <input v-if="role === 'admin'" v-model="rutina.descripcion" /> <!-- Editable solo para admin -->
            <span v-else>{{ rutina.descripcion }}</span>
          </td>
          <td>
            <input v-if="role === 'admin'" v-model="rutina.nivel" /> <!-- Editable solo para admin -->
            <span v-else>{{ rutina.nivel }}</span>
          </td>
          <td>
            <input v-if="role === 'admin'" v-model="rutina.duracion" /> <!-- Editable solo para admin -->
            <span v-else>{{ rutina.duracion }}</span>
          </td>
          <td>
            <input v-if="role === 'admin'" v-model="rutina.recomendaciones" /> <!-- Editable solo para admin -->
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

export default {
  data() {
    return {
      role: localStorage.getItem('role') || 'cliente', // Obtenemos el rol del localStorage
      rutinas: [],
    };
  },
  created() {
    this.fetchRutinas();  // Cargar las rutinas desde la API al montar el componente
  },
  methods: {
    // Método para obtener las rutinas de la API
    async fetchRutinas() {
      try {
        const response = await axios.get('http://localhost:5000/api/rutinas/hoy');
        this.rutinas = response.data.map(rutina => ({
          ...rutina,
          id: rutina.id || null // Asegurar que cada rutina tenga su ID
        }));
      } catch (error) {
        console.error('Error al cargar las rutinas:', error);
      }
    },
    // Método para guardar cambios de rutina
    async saveChanges(index) {
      const rutina = this.rutinas[index];
      try {
        await axios.put(`http://localhost:5000/api/rutinas/${rutina.id}`, {
          dia: rutina.dia,
          ejercicio: rutina.ejercicio,
          repeticiones: rutina.repeticiones,
          descripcion: rutina.descripcion,
          nivel: rutina.nivel,
          duracion: rutina.duracion,
          recomendaciones: rutina.recomendaciones,
        });
        alert(`Cambios guardados para ${rutina.dia}: ${rutina.ejercicio} (${rutina.repeticiones} repeticiones)`);
      } catch (error) {
        console.error('Error al guardar cambios:', error);
      }
    },
  },
};
</script>

<style scoped>
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
  background-color: #f4f4f4;
}

.rutinas-table td.lunes {
  background-color: #f8d7da; /* Color suave para lunes */
}

.rutinas-table td.martes {
  background-color: #fff3cd; /* Color suave para martes */
}

.rutinas-table td.miercoles {
  background-color: #d1ecf1; /* Color suave para miércoles */
}

.rutinas-table td.jueves {
  background-color: #d4edda; /* Color suave para jueves */
}

.rutinas-table td.viernes {
  background-color: #e2e3e5; /* Color suave para viernes */
}


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
