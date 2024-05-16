import {createStore} from 'vuex';
import * as actions from './actions'
import * as mutations from './mutations'

const store = createStore({
    state: {
        user: {
            token: sessionStorage.getItem('TOKEN'),
            data: {}
        },
        marcas: {
            loading: false,
            data: [],
            links: [],
            from: null,
            to: null,
            page: 1,
            limit: null,
            total: null
        },
        dateOptions: [
            {key: '1d', text: 'Último Dia'},
            {key: '1k', text: 'Última Semana'},
            {key: '2k', text: '2 Últimas Semanas'},
            {key: '1m', text: 'Último Mês'},
            {key: '3m', text: '3 Últimos Meses'},
            {key: '6m', text: '6 Últimos Meses'},
            {key: 'all', text: 'Todo tempo'},
        ]
    },
    getters: {},
    actions,
    mutations
})

export default store
