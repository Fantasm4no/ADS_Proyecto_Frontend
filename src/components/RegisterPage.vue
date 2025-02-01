<template>
  <div class="register-container">
    <div class="form-box">
      <h2>Registrarse</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" v-model="nombre" required placeholder="Ingresa tu nombre" />
        </div>
        <div class="form-group">
          <label for="email">Correo Electrónico:</label>
          <input type="email" v-model="email" required placeholder="Ingresa tu correo" />
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" v-model="password" required placeholder="Ingresa tu contraseña" />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <!-- Botón para ir al login -->
      <button @click="goToLogin" class="go-login-button">Ya tengo cuenta. Iniciar sesión</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nombre: '',
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          nombre: this.nombre,
          email: this.email,
          password: this.password,
          role: 'cliente'  // Asignamos el rol como 'cliente'
        });

        if (response.status === 201) {
          alert('Usuario registrado exitosamente');
          this.$router.push('/login'); // Redirige a login después de registrarse
        }
      } catch (error) {
        this.errorMessage = error.response.data.message; // Mostrar mensaje de error
      }
    },
    goToLogin() {
      this.$router.push('/login');  // Redirige a la página de login
    }
  }
};
</script>

<style scoped>
/* Estilos generales del formulario */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.form-box {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  color: #333;
  font-family: 'Arial', sans-serif;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
  color: #333;
}

input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #00b4d8;
}

button {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

/* Estilos para el botón "Ya tengo cuenta. Iniciar sesión" */
.go-login-button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #ff6347;  /* Naranja suave */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.go-login-button:hover {
  background-color: #e55347;  /* Tono más oscuro de naranja */
}
</style>
