import Vue from 'vue';
import
  VueRouter,
  {
    NavigationGuardNext,
    Route,
    RouteConfig,
    RouteRecord
  } from 'vue-router';
import store from '@/store';
import Auth from './modules/auth';
import Admin from './modules/admin';
import AuthIndex from '@/views/auth/Index.vue';
import AdminIndex from '@/views/admin/Index.vue';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    component: AuthIndex,
    children: Auth,
  },
  {
    path: '/admin',
    component: AdminIndex,
    children: Admin,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
  if (to.matched.some((record: RouteRecord) => record.meta?.auth)) {
    if (!store.getters['firebase/user']) {
      next({
        path: '/auth/sign-in',
      });
    }
  }
  next();
});

export default router;
