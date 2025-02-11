<template>
  <div class="home-container">
    <!-- Cabecera fija -->
    <header class="header">
      <div class="logo-container">
        <img src="@/assets/logogym.jpg" alt="Logo EG FITNESS" class="logo-img" />
        <h2 class="logo-text">EG FITNESS</h2>
      </div>
      <div class="top-buttons">
        <LogoutButton />
        <button class="carrito-button" @click="goToSection('carrito')">🛒 Ver Carrito</button>
      </div>
    </header>

    <!-- Mensaje de bienvenida (solo en la página principal) -->
    <div v-if="activeSection === ''" class="welcome-container">
      <h1>¡Bienvenido a EG Fitness Gym!</h1>
      <p>Transforma tu cuerpo, fortalece tu mente y alcanza tus metas con nosotros. Aquí comienza tu camino hacia una vida más saludable y activa.</p>

      <p>¡Comienza tu transformación hoy mismo!</p>
    </div>

    <!-- Contenido principal -->
    <div class="content">
      <div class="buttons-container">
        <button @click="goToSection('')">Inicio</button>
        <button @click="goToSection('rutinas')">Ver Rutinas</button>
        <button @click="goToSection('productos')">Ver Productos</button>
        <button @click="goToSection('mensualidad')">Ver Mensualidad</button>
        <button @click="goToSection('historial')">Ver Historial de Compras</button>
      </div>

      <!-- Sección Rutinas -->
      <RutinasComponent v-if="activeSection === 'rutinas'" />

      <!-- Sección Productos -->
      <ProductosComponent v-if="activeSection === 'productos'" />

      <!-- Sección Mensualidad -->
      <MensualidadComponent v-if="activeSection === 'mensualidad'" />

      <!-- Sección Carrito -->
      <CarritoComponent v-if="activeSection === 'carrito'" />

      <HistorialComponent v-if="activeSection === 'historial'" />
    </div>

    <footer class="footer">
      <nav class="footer-nav">
        <a href="#" @click.prevent="$router.push('/informacion-legal')">Información Legal</a>
      </nav>
      <p class="footer-text">© 2025 EG Fitness Gym. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script>
import RutinasComponent from './RutinasComponent.vue';
import ProductosComponent from './ProductosComponent.vue';
import MensualidadComponent from './MensualidadComponent.vue';
import CarritoComponent from './CarritoComponent.vue';
import LogoutButton from './LogoutButton.vue';
import HistorialComponent from './HistorialComponent.vue';

export default {
  components: {
    RutinasComponent,
    ProductosComponent,
    MensualidadComponent,
    CarritoComponent,
    LogoutButton,
    HistorialComponent,
  },
  data() {
    return {
      activeSection: '', // Sección activa, por defecto vacío para mostrar la bienvenida
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.$router.push('/login');
    },
    goToSection(section) {
      this.activeSection = section; // Cambiar la sección activa
    },
  },
};
</script>

<style scoped>
/* Contenedor del logo */
.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Imagen del logo */
.logo-img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 50%;
  border: 2px solid white;
}

/* Texto del logo */
.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

/* Cabecera fija */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: #333333;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  z-index: 1000;
}

.top-buttons {
  display: flex;
  gap: 10px;
}

.carrito-button {
  padding: 10px 20px;
  min-width: 140px;
  height: 40px;
  font-size: 1rem;
  border-radius: 5px;
  text-align: center;
  background-color:rgb(36, 79, 111);
}

/* Sección de bienvenida */
.welcome-container {
  text-align: center;
  padding: 30px;
  background-color: #e9f7ef;
  margin: 20px 0;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.welcome-container h1 {
  font-size: 2rem;
  color: #4caf50;
}

.welcome-container p {
  font-size: 1.2rem;
  margin: 10px 0 20px;
}

.welcome-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.explore-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.explore-button:hover {
  background-color: #45a049;
}

.explore-button.blue {
  background-color: #007bff;
}

.explore-button.blue:hover {
  background-color: #0056b3;
}

/* Contenedor principal */
.content {
  padding: 20px;
}

.buttons-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

button {
  padding: 12px 25px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 15px;
  margin-top: 20px;
}

.footer-nav a {
  color: #4caf50;
  text-decoration: none;
  margin: 0 10px;
}

.footer-nav a:hover {
  text-decoration: underline;
}
</style>
