import axios from "axios";
import store from "./store";
import router from "./router/index.js";
import Swal from 'sweetalert2'

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`
})

axiosClient.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer_${store.state.user.token}`
  if(config.url != "/auth/login" && config.url != "/auth/cadastrar" && config.url != "/auth/refresh"){
    config.params = config.params || {};
    config.params.userId = store.state.user.data.id;
  }
  return config;
})

axiosClient.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    store.dispatch('refresh', store.state.user.refreshToken)
      .then(() => {
        //console.log('refresh token atualizado')
      })
      .catch(({response}) => {
        store.commit('setToken', null)
        router.push({name: 'login'})
        Swal.fire({icon: 'error', title: 'Erro!', text: 'Sessão Expirada! Realize o login novamente.', showConfirmButton: true})
      })
  }
  throw error;
})

export default axiosClient;