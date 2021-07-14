import Vue from 'vue';
import Router from 'vue-router';
import MainComponent from '@/components/MainComponent';
import Loading from '@/views/Loading';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/reroute',
      name: 'reroute',
      component: Loading,
    },
    {
      path: '/',
      name: 'main',
      component: MainComponent,
    },
    {
      path: '/:phone',
      name: 'main-phone',
      component: MainComponent,
    },
  ],
});
