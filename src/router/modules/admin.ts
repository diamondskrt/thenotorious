import { RouteConfig } from 'vue-router';
import Notify from '@/views/admin/Notify.vue';

const routes: RouteConfig[] = [
  {
    path: 'notify',
    name: 'Notify',
    meta: {
      auth: true,
    },
    component: Notify,
  },
];

export default routes;
