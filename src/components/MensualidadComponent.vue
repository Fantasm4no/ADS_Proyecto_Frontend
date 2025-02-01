<template>
  <div class="section">
    <h3>Planes de Mensualidad</h3>
    <div class="mensualidades">
      <div class="mensualidad">
        <h4>Plan Básico</h4>
        <p>$30/mes</p>
        <p>Acceso limitado a las instalaciones.</p>
        <button>Comprar</button>
      </div>
      <div class="mensualidad">
        <h4>Plan Premium</h4>
        <p>$50/mes</p>
        <p>Acceso completo a todas las instalaciones y clases grupales.</p>
        <button>Comprar</button>
      </div>
      <div class="mensualidad">
        <h4>Plan VIP</h4>
        <p>$80/mes</p>
        <p>Acceso completo más asesoría personal en entrenamientos.</p>
        <button>Comprar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MensualidadComponent'
};
</script>

<style scoped>
.mensualidades {
  display: flex;
  justify-content: space-between;
}

.mensualidad {
  width: 30%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.mensualidad h4 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.mensualidad p {
  font-size: 1rem;
}

button {
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
