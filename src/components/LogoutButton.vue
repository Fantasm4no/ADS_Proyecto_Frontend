<template>
  <button @click="logout" class="logout-button">Cerrar Sesión  ↩</button>
</template>

<script>
export default {
  name: 'LogoutButton',
  methods: {
    logout() {
      // Eliminar el token y redirigir al login
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
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
</style>
