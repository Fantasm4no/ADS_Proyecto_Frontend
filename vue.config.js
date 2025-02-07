const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    allowedHosts: "all", // Permite acceder desde cualquier dispositivo en la red
  },
})
