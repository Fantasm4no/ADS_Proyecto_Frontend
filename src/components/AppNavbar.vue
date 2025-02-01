<template>
  <div class="navbar">
    <div class="logo">
      <h2>ZeroForce Gym</h2> <!-- Aquí el nombre de tu gimnasio -->
    </div>
    <div class="navbar-items">
      <span class="username">{{ username }}</span>
      <button @click="logout" class="logout-btn">Cerrar Sesión</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppNavbar',  // Cambié de "Navbar" a "AppNavbar"
  data() {
    return {
      username: localStorage.getItem('nombre') || 'Usuario',
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('nombre'); // Remover el nombre del usuario
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
/* Estilos de la barra de navegación */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333;
  color: white;
}

.logo h2 {
  margin: 0;
}

.navbar-items {
  display: flex;
  align-items: center;
}

.username {
  margin-right: 20px;
  font-size: 1.2rem;
}

.logout-btn {
  padding: 10px 15px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #d32f2f;
}
</style>
