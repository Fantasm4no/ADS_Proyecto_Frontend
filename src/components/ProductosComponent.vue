<template>
  <div class="section">
    <h3>Suplementos Disponibles</h3>
    <div class="productos-list">
      <div class="producto" v-for="producto in productos" :key="producto.id">
        <img :src="producto.imagen_url" :alt="producto.nombre" class="producto-imagen" />

        <!-- Si es admin, permite editar; si no, solo muestra el contenido -->
        <div v-if="isAdmin">
          <input v-model="producto.nombre" placeholder="Nombre del producto" />
          <textarea v-model="producto.descripcion" placeholder="Descripción"></textarea>
          <input v-model.number="producto.precio" type="number" placeholder="Precio" />
          <input v-model.number="producto.stock" type="number" placeholder="Stock disponible" />
          <input v-model="producto.imagen_url" placeholder="URL de la imagen" />
        </div>
        <div v-else>
          <h4>{{ producto.nombre }}</h4>
          <p>{{ producto.descripcion }}</p>
          <p><strong>Precio:</strong> ${{ producto.precio }}</p>
          <p><strong>Stock Disponible:</strong> {{ producto.stock }}</p>
        </div>

        <!-- Botón "Comprar" solo si NO es admin -->
        <button v-if="!isAdmin" :disabled="producto.stock === 0" @click="comprarProducto(producto)">
          {{ producto.stock > 0 ? "Comprar" : "Agotado" }}
        </button>

        <!-- Botón "Guardar" solo si es admin -->
        <button v-if="isAdmin" @click="guardarCambios(producto)">Guardar</button>
      </div>
    </div>
  </div>
</template>
<script>
import { API_BASE_URL } from "../config.js";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default {
  name: "ProductosComponent",
  data() {
    return {
      productos: [],
      isAdmin: false,
      clienteId: null,
    };
  },
  async created() {
    this.verificarUsuario(); // Ahora maneja tanto cliente como admin
    await this.fetchProductos();
  },
  methods: {
    verificarUsuario() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Debes iniciar sesión para acceder a esta funcionalidad.");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        this.isAdmin = decoded.role === "admin"; // Verifica si es admin
        this.clienteId = decoded.role === "cliente" ? decoded.id || decoded.cliente_id : null;

        if (!this.isAdmin && !this.clienteId) {
          alert("Token inválido. Por favor, inicia sesión de nuevo.");
          localStorage.removeItem("token");
          location.reload();
        }
      } catch (error) {
        console.error("Error al verificar usuario:", error);
        alert("Error al procesar el token. Por favor, inicia sesión nuevamente.");
        localStorage.removeItem("token");
      }
    },

    async fetchProductos() {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products`);
        console.log("Productos recibidos en el frontend:", response.data); // Log para depuración
        this.productos = response.data;
      } catch (error) {
        console.error("Error al obtener productos:", error);
        alert("Hubo un problema al cargar los productos.");
      }
    },

    async guardarCambios(producto) {
      if (!this.isAdmin) {
        alert("No tienes permiso para realizar esta acción.");
        return;
      }

      if (!producto.nombre || !producto.precio || producto.stock < 0) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
      }

      try {
        await axios.put(`${API_BASE_URL}/api/products/${producto.id}`, {
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          stock: producto.stock,
          imagen_url: producto.imagen_url,
        });
        alert("Producto actualizado con éxito.");
      } catch (error) {
        console.error("Error al actualizar producto:", error);
        alert("Error al actualizar el producto.");
      }
    },

    async comprarProducto(producto) {
      if (this.isAdmin) {
        alert("Los administradores no pueden realizar esta acción.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Debes iniciar sesión para añadir productos al carrito.");
        return;
      }
      if (producto.stock <= 0) {
        alert("Producto agotado.");
        return;
      }

      console.log("Intentando añadir al carrito:", {
        cliente_id: this.clienteId,
        producto_id: producto.id,
        cantidad: 1,
      });

      try {
        await axios.post(
          `${API_BASE_URL}/api/carrito`,
          { cliente_id: this.clienteId, producto_id: producto.id, cantidad: 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Producto añadido al carrito con éxito.");
      } catch (error) {
        console.error("Error al añadir producto al carrito:", error);
        alert("No se pudo añadir el producto al carrito.");
      }
    },
  },
};
</script>

<style scoped>
/* Flexbox Grid para distribución horizontal */
.productos-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Espaciado entre los productos */
  justify-content: center; /* Centrar los productos */
}

.producto {
  flex: 1 1 calc(25% - 20px); /* Ajusta para mostrar 4 productos por fila */
  max-width: calc(25% - 20px); /* Asegura que cada producto ocupe un 25% */
  margin: 10px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  background: #fff;
}

.producto h4 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.producto p {
  font-size: 1rem;
}

.producto-imagen {
  width: 100%;
  height: 200px; /* Altura fija para todas las imágenes */
  object-fit: contain; /* Muestra la imagen completa dentro del contenedor */
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9; /* Fondo para imágenes transparentes */
}

/* Estilos para inputs y botones */
input, textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
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
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:nth-child(2) {
  background-color: #007bff;
}
</style>
