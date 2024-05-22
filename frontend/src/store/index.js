import {createStore} from 'vuex';
import * as actions from './actions'
import * as mutations from './mutations'

const store = createStore({
    state: {
        user: {
            token: sessionStorage.getItem('TOKEN'),
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
        membresiaOptions: [
            {key: 'Primeiro Domingo', text: 'Primeiro Domingo'},
            {key: 'Segundo Domingo', text: 'Segundo Domingo'},
            {key: 'Terceiro Domingo', text: 'Terceiro Domingo'},
            {key: 'Quarto Domingo', text: 'Quarto Domingo'},
        ]
    },
    getters: {},
    actions,
    mutations
})

export default store
