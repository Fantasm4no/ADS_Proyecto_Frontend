<template>
  <div class="section">
    <h3>Suplementos Disponibles</h3>
    <div class="productos-list">
      <div class="producto" v-for="producto in productos" :key="producto.id">
        <h4>{{ producto.nombre }}</h4>
        <p>{{ producto.descripcion }}</p>
        <p><strong>Precio:</strong> ${{ producto.precio }}</p>
        <button @click="comprarProducto(producto)">Comprar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductosComponent',
  data() {
    return {
      productos: [
        { id: 1, nombre: 'Proteína Whey', descripcion: 'Suplemento proteico', precio: 25 },
        { id: 2, nombre: 'Creatina', descripcion: 'Suplemento para energía y fuerza', precio: 15 },
        { id: 3, nombre: 'BCAA', descripcion: 'Suplemento para recuperación muscular', precio: 20 }
      ]
    };
  },
  methods: {
    comprarProducto(producto) {
      alert(`Compraste ${producto.nombre}`);
    }
  }
};
</script>

<style scoped>
.productos-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.producto {
  width: 30%;
  margin: 10px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.producto h4 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.producto p {
  font-size: 1rem;
}
</style>
