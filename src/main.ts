import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import '@/plugins/vue-carousel';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { FBConfig } from './firebase';
import { VueMaskDirective } from 'v-mask'
import scrollTo from '@/directives/scroll';
import numflip from '@/directives/numflip';

firebase.initializeApp(FBConfig);
firebase.firestore();
firebase.auth();

Vue.config.productionTip = false;

Vue.directive('scrollTo', scrollTo);

Vue.directive('mask', VueMaskDirective);

Vue.directive('numflip', numflip);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
