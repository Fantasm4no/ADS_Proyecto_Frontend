<template>
  <div class="section">
    <h3>Carrito de Compras</h3>
    <div v-if="carrito.length > 0">
      <div v-for="item in carrito" :key="item.id" class="carrito-item">
        <img :src="item.imagen_url" :alt="item.nombre" class="carrito-imagen" />

        <h4>{{ item.nombre }}</h4>
        <p><strong>Precio unitario:</strong> ${{ item.precio }}</p>

        <!-- Si el item es una membresía, cantidad fija en 1 sin input -->
        <p v-if="esMembresia(item.nombre)">
          <strong>Cantidad:</strong> 1
        </p>

        <!-- Si el item es un producto, permitir modificar cantidad -->
        <p v-else>
          <strong>Cantidad:</strong>
          <input
            type="number"
            min="1"
            v-model.number="item.cantidad"
            @change="actualizarCantidad(item.id, item.cantidad)"
          />
        </p>

        <p><strong>Total:</strong> ${{ (item.precio * item.cantidad).toFixed(2) }}</p>
        <button @click="eliminarProducto(item.id)">Eliminar</button>
      </div>
      <div class="total">
        <h4>Total a pagar: ${{ calcularTotal() }}</h4>
        <button @click="finalizarCompra">Finalizar Compra</button>
      </div>
    </div>
    <p v-else>Tu carrito está vacío.</p>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "../config.js";
import { jwtDecode } from "jwt-decode";

export default {
  name: "CarritoComponent",
  data() {
    return {
      carrito: [],
      clienteId: null,
      nombresMembresias: ["Plan Básico", "Plan Premium", "Plan VIP"], // Nombres de membresías
    };
  },
  async created() {
    this.verificarCliente();
    if (this.clienteId) {
      await this.obtenerCarrito();
    }
  },
  methods: {
    verificarCliente() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Debes iniciar sesión para ver el carrito.");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        if (decoded.role !== "cliente") {
          alert("Solo los clientes pueden acceder al carrito.");
          location.href = "/"; // Redirige a otra página
          return;
        }
        this.clienteId = decoded.id || decoded.cliente_id;
      } catch (error) {
        console.error("Error al verificar el token:", error);
        alert("Sesión inválida. Por favor, inicia sesión nuevamente.");
        localStorage.removeItem("token");
        location.reload();
      }
    },

    async obtenerCarrito() {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/carrito`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log("Datos del carrito:", response.data);
        this.carrito = response.data;
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
        alert("Hubo un problema al cargar el carrito.");
      }
    },

    esMembresia(nombre) {
      return this.nombresMembresias.includes(nombre);
    },

    async actualizarCantidad(id, cantidad) {
      if (cantidad <= 0) {
        alert("La cantidad debe ser mayor a 0.");
        return;
      }
      try {
        await axios.put(
          `${API_BASE_URL}/api/carrito/${id}`,
          { cantidad },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        alert("Cantidad actualizada.");
        await this.obtenerCarrito();
      } catch (error) {
        console.error("Error al actualizar la cantidad:", error);
        alert("Error al actualizar la cantidad.");
      }
    },

    async eliminarProducto(id) {
      try {
        await axios.delete(`${API_BASE_URL}/api/carrito/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.carrito = this.carrito.filter((item) => item.id !== id);
        alert("Producto eliminado del carrito.");
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("Hubo un problema al eliminar el producto.");
      }
    },

    calcularTotal() {
      return this.carrito
        .reduce((total, item) => total + item.precio * item.cantidad, 0)
        .toFixed(2);
    },

    async finalizarCompra() {
      try {
        if (!this.clienteId) {
          alert("No se pudo identificar al cliente. Por favor, inicia sesión nuevamente.");
          return;
        }

        const total = this.calcularTotal();
        if (total <= 0) {
          alert("El carrito está vacío o no hay nada que finalizar.");
          return;
        }

        // Llamar al backend para finalizar la compra
        await axios.post(
          `${API_BASE_URL}/api/carrito/finalizar-compra`,
          { cliente_id: this.clienteId },  // 👈 Enviar cliente_id correctamente
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        alert(`Compra finalizada con éxito. Total pagado: $${total}`);
        this.carrito = []; // Vaciar el carrito localmente
      } catch (error) {
        console.error("Error al finalizar la compra:", error);
        const errorMsg = error.response?.data?.msg || "Hubo un problema al finalizar la compra.";
        alert(errorMsg);
      }
    },
  },
};
</script>

<style scoped>
.section {
  padding: 20px;
}

.carrito-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.carrito-imagen {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.total {
  margin-top: 20px;
  text-align: right;
}

button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

input[type="number"] {
  width: 50px;
  padding: 5px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
