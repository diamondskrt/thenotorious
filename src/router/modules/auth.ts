import { RouteConfig } from 'vue-router';
import Auth from '@/views/auth/Auth.vue';

const routes: RouteConfig[] = [
  {
    path: 'sign-in',
    name: 'SignIn',
    component: Auth,
  },
];

export default routes;
