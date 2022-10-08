import Vue from 'vue';
import Router from 'vue-router';
import home from '../views/Home'
import wagonpark from '../views/WagonPark'
import errorPage from '@/404folder/errorPage';
import presentation from '../views/Presentation';
import rates from '../views/Rates';
import authorization from '../views/Authorization';
import Bookkeeping from '../views/Bookkeeping';
import lk from '../views/lk';
import report from '../views/report';


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'authorization',
      component: authorization
    },
    {
      path: '/wagonpark',
      name: 'wagonpark',
      component: wagonpark
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/presentation',
      name: 'presentation',
      component: presentation
    },
    {
      path: '/rates',
      name: 'rates',
      component: rates
    },
    {
      path: '/bookkeeping',
      name: 'bookkeeping',
      component: Bookkeeping
    },
    {
      path: '/lk',
      name: 'lk',
      component: lk
    },
    {
      path: '/report',
      name: 'report',
      component: report
    },
    {
      path: '*',
      name: 'errorPage',
      component: errorPage
    }
  ]
})
