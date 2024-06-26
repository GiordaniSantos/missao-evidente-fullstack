import {createStore} from 'vuex';
import * as actions from './actions'
import * as mutations from './mutations'

const store = createStore({
    state: {
        user: {
            token: sessionStorage.getItem('TOKEN'),
            refreshToken: sessionStorage.getItem('REFRESH_TOKEN'),
            data: sessionStorage.getItem('USER_DATA') ? JSON.parse(sessionStorage.getItem('USER_DATA')) : {}
        },
        visitasCrentes: {
            loading: false,
            data: [],
            links: [],
            from: null,
            to: null,
            totalPage: null,
            page: 1,
            limit: null,
            total: null
        },
        visitasIncredulos: {
            loading: false,
            data: [],
            links: [],
            from: null,
            to: null,
            totalPage: null,
            page: 1,
            limit: null,
            total: null
        },
        visitasPresidios: {
            loading: false,
            data: [],
            links: [],
            from: null,
            to: null,
            totalPage: null,
            page: 1,
            limit: null,
            total: null
        },
        visitasEnfermos: {
            loading: false,
            data: [],
            links: [],
            from: null,
            to: null,
            totalPage: null,
            page: 1,
            limit: null,
            total: null
        },
        visitasHospitais: {
            loading: false,
            data: [],
            links: [],
            from: null,
            to: null,
            totalPage: null,
            page: 1,
            limit: null,
            total: null
        },
        visitasEscolas: {
            loading: false,
            data: [],
            links: [],
            from: null,
            to: null,
            totalPage: null,
            page: 1,
            limit: null,
            total: null
        },
        estudos: {
            loading: false,
            data: [],
            links: [],
            from: null,
            to: null,
            totalPage: null,
            page: 1,
            limit: null,
            total: null
        },
        sermoes: {
            loading: false,
            data: [],
            links: [],
            from: null,
            to: null,
            totalPage: null,
            page: 1,
            limit: null,
            total: null
        },
        estudosBiblicos: {
            loading: false,
            data: [],
            links: [],
            from: null,
            to: null,
            totalPage: null,
            page: 1,
            limit: null,
            total: null
        },
        discipulados: {
            loading: false,
            data: [],
            links: [],
            from: null,
            to: null,
            totalPage: null,
            page: 1,
            limit: null,
            total: null
        },
        batismosInfantis: {
            loading: false,
            data: [],
            links: [],
            from: null,
            to: null,
            totalPage: null,
            page: 1,
            limit: null,
            total: null
        },
        batismosProfissoes: {
            loading: false,
            data: [],
            links: [],
            from: null,
            to: null,
            totalPage: null,
            page: 1,
            limit: null,
            total: null
        },
        bencoesNupciais: {
            loading: false,
            data: [],
            links: [],
            from: null,
            to: null,
            totalPage: null,
            page: 1,
            limit: null,
            total: null
        },
        santasCeias: {
            loading: false,
            data: [],
            links: [],
            from: null,
            to: null,
            totalPage: null,
            page: 1,
            limit: null,
            total: null
        },
        membresias: {
            loading: false,
            data: [],
            links: [],
            from: null,
            to: null,
            totalPage: null,
            page: 1,
            limit: null,
            total: null
        },
    },
    getters: {},
    actions,
    mutations
})

export default store
