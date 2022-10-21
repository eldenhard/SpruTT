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
import Staff from '../views/Staff';
import DislocationTable from '@/components/Table/DislocationTable'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: authorization
    },
    {
      path: '/wagonpark',
      component: wagonpark,
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/presentation',
      component: presentation
    },
    {
      path: '/rates',
      component: rates
    },
    {
      path: '/bookkeeping',
      component: Bookkeeping
    },
    {
      path: '/lk',
      component: lk
    },
    {
      path: '/report',
      component: report
    },
    {
      path: '/personnel-service',
      component: Staff
    },
    {
      path: '*',
      component: errorPage
    }
  ]
})
