<template>
  <div class="legal-container">
    <header class="legal-header">
      <h1>Información Legal de EG Fitness Gym</h1>
      <p>Conoce tus derechos y nuestras responsabilidades.</p>
      <!-- Botón para regresar a la página principal -->
      <button class="back-button" @click="$router.push('/')">Regresar a la Página Principal</button>
    </header>

    <section class="legal-section">
      <h2>Términos y Condiciones</h2>
      <p>
        Al usar nuestra plataforma, aceptas cumplir con los siguientes términos y condiciones:
      </p>
      <ul>
        <li>El acceso a nuestros servicios es exclusivo para usuarios registrados.</li>
        <li>Queda prohibido el uso indebido de los contenidos o servicios ofrecidos.</li>
        <li>Nos reservamos el derecho de modificar estas condiciones en cualquier momento.</li>
      </ul>
    </section>

    <section class="legal-section">
      <h2>Política de Privacidad</h2>
      <p>
        En EG Fitness Gym, valoramos tu privacidad. Nos comprometemos a proteger tu información personal:
      </p>
      <ul>
        <li>No compartimos tus datos personales con terceros sin tu consentimiento.</li>
        <li>Utilizamos encriptación para mantener tus datos seguros.</li>
        <li>Puedes solicitar la eliminación de tu cuenta y datos en cualquier momento.</li>
      </ul>
    </section>

    <section class="legal-section">
      <h2>Derechos de Propiedad Intelectual</h2>
      <p>
        Todo el contenido de esta plataforma, incluyendo texto, imágenes, logotipos y código fuente, es propiedad de EG Fitness Gym y está protegido por derechos de autor.
      </p>
      <p>
        Está prohibido reproducir, distribuir o modificar cualquier contenido sin autorización previa.
      </p>
    </section>

    <section class="legal-section">
      <h2>Contacto</h2>
      <p>
        Para cualquier duda o consulta legal, puedes comunicarte con nosotros a través del correo: 
        <a href="mailto:legal@egfitness.com">legal@egfitness.com</a>.
      </p>
    </section>

    <footer class="legal-footer">
      <p>© 2025 EG Fitness Gym. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "InformacionLegal",
};
</script>

<style scoped>
.legal-container {
  padding: 20px;
  max-width: 900px;
  margin: auto;
  font-family: "Arial", sans-serif;
  line-height: 1.6;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.legal-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 10px;
  border-bottom: 2px solid #4caf50;
}

.legal-header h1 {
  font-size: 2rem;
  color: #333;
}

.legal-header p {
  font-size: 1.2rem;
  color: #555;
}

.back-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #45a049;
}

.legal-section {
  margin-bottom: 30px;
}

.legal-section h2 {
  font-size: 1.8rem;
  color: #4caf50;
  border-left: 4px solid #4caf50;
  padding-left: 10px;
  margin-bottom: 15px;
}

.legal-section p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
}

.legal-section ul {
  padding-left: 20px;
}

.legal-section ul li {
  font-size: 1rem;
  color: #333;
  margin-bottom: 8px;
  list-style: disc;
}

.legal-footer {
  text-align: center;
  margin-top: 30px;
  font-size: 0.9rem;
  color: #777;
}
</style>
