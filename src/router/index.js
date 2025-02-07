import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';
import HomePage from '../components/HomePage.vue';  // Asegúrate de tener este componente
import InformacionLegal from '../components/InformacionLegal.vue';
import HistorialComponent from '../components/HistorialComponent.vue'

// Función para verificar si el usuario está autenticado
function isAuthenticated() {
  const token = localStorage.getItem('token');
  return token ? true : false;
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();  // Permite el acceso a la ruta
      } else {
        next('/login');  // Redirige al login si no está autenticado
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: "/informacion-legal",
    name: "InformacionLegal",
    component: InformacionLegal,
  },  
  {
    path: "/historial-component",
    name: "HistorialComponent",
    component: HistorialComponent,
  }, 
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
