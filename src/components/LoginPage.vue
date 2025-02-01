<template>
  <div class="login-container">
    <div class="login-form">
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
    // En el componente de Login (por ejemplo, LoginPage.vue)
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: this.email,
          password: this.password
        });

        // Almacenar el token JWT y el rol en localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);  // Almacena el rol (admin, user)

        // Redirigir al usuario a la página de inicio
        this.$router.push('/');
      } catch (error) {
        this.errorMessage = 'Credenciales incorrectas. Intenta de nuevo.';
      }
    }
  }
};
</script>

<style scoped>
/* Estilo para el contenedor principal */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9; /* Fondo gris claro */
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
