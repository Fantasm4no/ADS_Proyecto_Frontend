<template>
  <div class="legal-info">
    <h2>Términos y Condiciones</h2>
    <p>
      Bienvenido a EG Fitness Gym. Al acceder a nuestra plataforma, aceptas cumplir con los siguientes términos
      y condiciones. Nos reservamos el derecho de modificar estos términos en cualquier momento sin previo aviso.
    </p>

    <h2>Política de Privacidad</h2>
    <p>
      La privacidad de nuestros clientes es fundamental. Recopilamos información personal con el propósito de brindar
      un mejor servicio y no compartimos ni vendemos estos datos a terceros sin consentimiento previo.
    </p>

    <h2>Derechos de Autor</h2>
    <p>
      Todo el contenido disponible en esta plataforma, incluyendo imágenes, textos y logotipos, es propiedad de EG Fitness Gym
      y está protegido por las leyes de derechos de autor. No está permitido el uso, reproducción o distribución sin permiso.
    </p>

    <h2>Condiciones de Uso</h2>
    <p>
      Para utilizar nuestros servicios, debes tener al menos 18 años o contar con el consentimiento de un tutor legal.
      El uso indebido de la plataforma puede resultar en la suspensión o eliminación de la cuenta.
    </p>
  </div>
</template>

<script>
export default {
  name: "LegalInfoComponent"
};
</script>

<style scoped>
.legal-info {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

h2 {
  color: #2c3e50;
  margin-bottom: 10px;
}

p {
  color: #333;
  margin-bottom: 15px;
}
</style>
