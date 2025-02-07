<template>
  <div class="login-container">
    <div class="login-form">
      <div class="logo-container">
        <img src="@/assets/logogym.jpg" alt="Logo EG FITNESS" class="logo-img" />
      </div>
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Correo Electrónico:</label>
          <input type="email" v-model="email" required placeholder="Ingresa tu correo" />
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" v-model="password" required placeholder="Ingresa tu contraseña" />
        </div>
        <button type="submit">Iniciar Sesión</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
      <p>¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link></p>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from "../config.js";
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      console.log("Intentando iniciar sesión..."); // Depuración
      try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
          email: this.email, // Asegúrate de enviar "email"
          password: this.password,
        });
        console.log("Respuesta del backend:", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('role', response.data.role); 
        this.$router.push("/"); // Redirigir al inicio
      } catch (error) {
        console.error("Error al iniciar sesión:", error.response?.data || error.message);
        this.errorMessage = error.response?.data?.msg || "Error al iniciar sesión.";
      }
    }
  }
};
</script>

<style scoped>
/* Contenedor del logo */
.logo-container {
  display: flex;
  align-items: center; /* Alinear logo y texto verticalmente */
  justify-content: center; /* Alinear horizontalmente */
  gap: 10px; /* Espacio entre la imagen y el texto */
}

/* Imagen del logo en forma redonda */
.logo-img {
  width: 175px; /* Ajusta el tamaño del logo */
  height: 175px;
  object-fit: cover; /* Asegura que la imagen cubra todo el espacio sin deformarse */
  border-radius: 50%; /* Hace que la imagen sea completamente redonda */
  border: 2px solid black; /* (Opcional) Agregar un borde blanco para mejor visualización */
}


/* Estilo para el contenedor principal */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('@/assets/fondo3.jpg'), url('@/assets/fondo3.jpg'); /* Misma imagen para ambas mitades */
  background-size: 50% 100%; /* Cada imagen ocupa la mitad horizontal */
  background-position: left, right; /* Una imagen a la izquierda y otra a la derecha */
  background-repeat: no-repeat;
}

.login-form {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}

button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #4caf50; /* Color verde */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  font-size: 14px;
  text-align: center;
}
</style>
