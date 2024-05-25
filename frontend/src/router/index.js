import {createRouter, createWebHistory} from 'vue-router'
import Dashboard from "../views/Dashboard.vue"
import Login from "../views/Login.vue"
import RequestPassword from "../views/RequestPassword.vue"
import ResetPassword from "../views/ResetPassword.vue"
import AppLayout from '../components/AppLayout.vue'
import Crentes from "../views/VisitasCrentes/Crentes.vue";
import Incredulos from '../views/VisitasIncredulos/Incredulos.vue';
import Presidios from '../views/VisitasPresidios/Presidios.vue'
import Enfermos from '../views/VisitasEnfermos/Enfermos.vue'
import Hospitais from '../views/VisitasHospitais/Hospitais.vue'
import Escolas from '../views/VisitasEscolas/Escolas.vue'
import Estudos from '../views/Estudos/Estudos.vue'
import Sermoes from '../views/Sermoes/Sermoes.vue'
import EstudosBiblicos from '../views/EstudosBiblicos/EstudosBiblicos.vue'
import Discipulados from '../views/Discipulados/Discipulados.vue'
import BatismosInfantis from '../views/BatismosInfantis/BatismosInfantis.vue'
import BatismosProfissoes from '../views/BatismosProfissoes/BatismosProfissoes.vue'
import Membresias from "../views/Membresias/Membresias.vue"
import NotFound from "../views/NotFound.vue";
import store from "../store";

const routes = [
    {
        path: '/',
        redirect: '/app'
    },
    {
        path: '/app',
        name: 'app',
        redirect: '/app/dashboard',
        component: AppLayout,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: 'dashboard',
                name: 'app.dashboard',
                component: Dashboard
            },
            {
                path: 'visitas-crentes',
                name: 'app.crentes',
                component: Crentes
            },
            {
                path: 'visitas-incredulos',
                name: 'app.incredulos',
                component: Incredulos
            },
            {
                path: 'visitas-presidios',
                name: 'app.presidios',
                component: Presidios
            },
            {
                path: 'visitas-enfermos',
                name: 'app.enfermos',
                component: Enfermos
            },
            {
                path: 'visitas-hospitais',
                name: 'app.hospitais',
                component: Hospitais
            },
            {
                path: 'visitas-escolas',
                name: 'app.escolas',
                component: Escolas
            },
            {
                path: 'estudos',
                name: 'app.estudos',
                component: Estudos
            },
            {
                path: 'sermoes',
                name: 'app.sermoes',
                component: Sermoes
            },
            {
                path: 'estudos-biblicos',
                name: 'app.estudosBiblicos',
                component: EstudosBiblicos
            },
            {
                path: 'discipulados',
                name: 'app.discipulados',
                component: Discipulados
            },
            {
                path: 'batismos-infantis',
                name: 'app.batismosInfantis',
                component: BatismosInfantis
            },
            {
                path: 'batismos-profissoes',
                name: 'app.batismosProfissoes',
                component: BatismosProfissoes
            },
            {
                path: 'membresias',
                name: 'app.membresias',
                component: Membresias
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/request-password',
        name: 'requestPassword',
        component: RequestPassword,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/reset-password/:token',
        name: 'resetPassword',
        component: ResetPassword,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/:pathMatch(.*)',
        name: 'notfound',
        component: NotFound,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({name: 'login'})
  } else if (to.meta.requiresGuest && store.state.user.token) {
    next({name: 'app.dashboard'})
  } else {
    next();
  }

})

export default router;
