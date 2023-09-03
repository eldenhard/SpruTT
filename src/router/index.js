import Vue from 'vue';
import Router from 'vue-router';
import home from '../views/Home'
import wagonpark from '../views/WagonPark'
import errorPage from '@/404folder/errorPage';
import authorization from '../views/Authorization';
import lk from '../views/lk';
import report from '../views/report';
import Staff from '../views/Staff';
import editBDR from '../views/editBDR';
import keyFact from '../views/KeyFacts';
import managementReporting from '../views/ManagementReporting'
import Fin_Operation from '../components/Table/Directory/Fin_Operation'
import fines from '../views/Fines.vue'
// C:\Users\Asus\Desktop\VueTTRe\project\src\views\Fines.vue
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
      path: '/directory',
      component: home
    },

    {
      path: '/lk',
      component: lk
    },
    {
      path: '/report',
      component: report,
    },
    {
      path: '/edit-bdr/:id',
      component: editBDR
    },
    {
      path: '/fin_operation/:id',
      component: Fin_Operation
    },
    {
      path: '/personnel-service',
      component: Staff
    },
    {
      path: '/key-facts',
      component: keyFact
    },
    {
      path: '/management-reporting',
      component: managementReporting
    },
    {
      path: '/fines',
      component: fines
    },
    {
      path: '*',
      component: errorPage
    }
  ]
})
