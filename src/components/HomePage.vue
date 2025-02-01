<template>
  <div class="home-container">
    <h2>Bienvenido al gimnasio</h2>
    <LogoutButton />

    <div class="buttons-container">
      <button @click="goToSection('rutinas')">Ver Rutinas</button>
      <button @click="goToSection('productos')">Ver Productos</button>
      <button @click="goToSection('mensualidad')">Ver Mensualidad</button>
    </div>

    <!-- Sección Rutinas -->
    <RutinasComponent v-if="activeSection === 'rutinas'" />

    <!-- Sección Productos -->
    <ProductosComponent v-if="activeSection === 'productos'" />

    <!-- Sección Mensualidad -->
    <MensualidadComponent v-if="activeSection === 'mensualidad'" />
  </div>
</template>

<script>
import RutinasComponent from './RutinasComponent.vue';
import ProductosComponent from './ProductosComponent.vue';
import MensualidadComponent from './MensualidadComponent.vue';
import LogoutButton from './LogoutButton.vue';

export default {
  components: {
    RutinasComponent,
    ProductosComponent,
    MensualidadComponent,
    LogoutButton
  },
  data() {
    return {
      activeSection: '', // Mantener la sección activa
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
    }
  }
};
</script>

<style scoped>
.home-container {
  padding: 20px;
}

h2 {
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin-bottom: 20px;
}

.logout-button {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 30px;
}

.logout-button:hover {
  background-color: #d32f2f;
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

button:focus {
  outline: none;
}

.section {
  margin-bottom: 40px;
}

h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
}
</style>
