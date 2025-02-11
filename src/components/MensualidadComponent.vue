<template>
  <div class="section">
    <h3>Planes de Mensualidad</h3>
    <p class="descuento">10% de descuento para membresía Vip y Premium</p>
    <div class="mensualidades">
      <div class="mensualidad" v-for="membresia in membresias" :key="membresia.id">
        <img :src="membresia.imagen_url" :alt="membresia.nombre" class="mensualidad-imagen" />
        
        <!-- Si es admin, permite editar los campos, si no, solo muestra la información -->
        <div v-if="isAdmin">
          <h4>{{ membresia.nombre }}</h4>
          <input v-model.number="membresia.precio" placeholder="Precio" />
          <textarea v-model="membresia.descripcion" placeholder="Descripción"></textarea>
          <button @click="guardarCambios(membresia)">Guardar</button>
        </div>
        <div v-else>
          <h4>{{ membresia.nombre }}</h4>
          <p>${{ membresia.precio }}/mes</p>
          <p>{{ membresia.descripcion }}</p>

          <!-- Mostrar botón de compra si el usuario NO tiene una membresía activa o si la membresía actual es diferente -->
          <button v-if="!membresiaActiva || membresiaActiva !== membresia.id" @click="comprarMembresia(membresia.id)">
            Comprar
          </button>

          <!-- Mostrar botón de cancelar SOLO en la membresía activa -->
          <button v-if="membresiaActiva && membresiaActiva === membresia.id" @click="cancelarMembresia" class="btn-cancelar">
            Cancelar Membresía
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { API_BASE_URL } from "../config.js";

export default {
  name: "MensualidadComponent",
  data() {
    return {
      membresias: [],
      isAdmin: false,
      tieneMembresiaActiva: false,
      membresiaActiva: null,
    };
  },
  async created() {
    this.verificarUsuario(); // Verificar si el usuario es admin
    await this.obtenerMembresias();
    await this.verificarMembresiaActiva();
  },
  methods: {
    async cancelarMembresia() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Debes iniciar sesión para cancelar tu membresía.");
        return;
      }

      let clienteId;
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); 
        clienteId = decodedToken.id || decodedToken.cliente_id;
      } catch (error) {
        console.error("Error al procesar el token:", error);
        alert("Error al procesar el token. Por favor, inicia sesión nuevamente.");
        localStorage.removeItem("token");
        return;
      }

      if (!clienteId) {
        alert("No se pudo identificar al cliente. Por favor, inicia sesión nuevamente.");
        return;
      }

      try {
        const response = await axios.post(`${API_BASE_URL}/api/membresias/cancelar`, { clienteId }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        alert(response.data.msg || "Membresía cancelada correctamente.");
        
        // 🔄 Actualizar el estado de la membresía activa
        await this.verificarMembresiaActiva(); 

      } catch (error) {
        console.error("Error al cancelar membresía:", error);
        alert(error.response?.data?.msg || "No se pudo cancelar la membresía.");
      }
    },

    async verificarMembresiaActiva() {
      const token = localStorage.getItem("token");
      if (!token) return;

      let clienteId;
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); 
        clienteId = decodedToken.id || decodedToken.cliente_id;
      } catch (error) {
        console.error("Error al procesar el token:", error);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/membresias/verificar/${clienteId}`);
        console.log("Respuesta de membresía activa:", response.data); 
        this.membresiaActiva = response.data.membresia_id; // Guardar el ID de la membresía activa
      } catch (error) {
        console.error("Error al verificar membresía activa:", error);
      }
    },

    verificarUsuario() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Debes iniciar sesión para acceder a esta funcionalidad.");
        return;
      }

      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificar JWT sin librería
        this.isAdmin = decodedToken.role === "admin"; // Verificar rol
      } catch (error) {
        console.error("Error al procesar el token:", error);
        alert("Error al procesar el token. Por favor, inicia sesión nuevamente.");
        localStorage.removeItem("token");
      }
    },

    async obtenerMembresias() {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/membresias`);
        this.membresias = response.data;
      } catch (error) {
        console.error("Error al obtener membresías:", error);
        alert("Hubo un problema al cargar las membresías.");
      }
    },

    async guardarCambios(membresia) {
      if (!this.isAdmin) {
        alert("No tienes permiso para realizar esta acción.");
        return;
      }

      try {
        const { id, precio, descripcion } = membresia;
        const response = await axios.put(`${API_BASE_URL}/api/membresias/${id}`, { precio, descripcion });
        alert(response.data.msg || "Membresía actualizada con éxito.");
      } catch (error) {
        console.error("Error al actualizar membresía:", error);
        alert("Hubo un problema al actualizar la membresía.");
      }
    },

    async comprarMembresia(membresiaId) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Debes iniciar sesión para comprar una membresía.");
        return;
      }

      let clienteId;
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificar token sin librería externa
        clienteId = decodedToken.id || decodedToken.cliente_id; // Verifica si tiene un cliente_id
      } catch (error) {
        console.error("Error al procesar el token:", error);
        alert("Error al procesar el token. Por favor, inicia sesión nuevamente.");
        localStorage.removeItem("token");
        return;
      }

      if (!clienteId) {
        alert("No se pudo identificar al cliente. Por favor, inicia sesión nuevamente.");
        return;
      }

      console.log("Verificando membresía activa para el cliente:", clienteId);

      try {
        // Verificar si el usuario ya tiene una membresía activa
        const checkResponse = await axios.get(`${API_BASE_URL}/api/membresias/activa/${clienteId}`);
        
        if (checkResponse.data.activa) {
          alert("Ya tienes una membresía activa. No puedes comprar otra hasta que expire.");
          return;
        }

        // Si no tiene una membresía activa, proceder con la compra
        console.log("Enviando datos al backend:", { cliente_id: clienteId, membresia_id: membresiaId });

        const response = await axios.post(
          `${API_BASE_URL}/api/carrito`,
          { cliente_id: clienteId, membresia_id: membresiaId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert(response.data.msg || "Membresía añadida al carrito con éxito.");
      } catch (error) {
        console.error("Error al añadir membresía al carrito:", error);
        alert(error.response?.data?.msg || "No se pudo añadir la membresía al carrito.");
      }
    },
  },
};
</script>


<style scoped>
.mensualidades {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
}

.mensualidad {
  width: 250px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: #fff;
}

.mensualidad-imagen {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: contain;
  margin-bottom: 10px;
  background-color: #f9f9f9;
}

.mensualidad h4 {
  font-size: 1.2rem;
  margin: 10px 0;
}

.mensualidad p {
  font-size: 1rem;
  margin: 5px 0;
}
.descuento {
    color: red;
}


input, textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #218838;
}

.btn-cancelar {
  background-color: #dc3545; /* Rojo */
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.btn-cancelar:hover {
  background-color: #c82333; /* Rojo más oscuro */
}


</style>
