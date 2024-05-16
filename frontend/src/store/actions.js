import axiosClient from "../axios";

export function getCurrentUser({commit}, data) {
  return axiosClient.get('/user', data)
    .then(({data}) => {
      commit('setUser', data);
      return data;
    })
}

export function login({commit}, data) {
  return axiosClient.post('/auth/sign-in', data)
    .then(({data}) => {
      console.log(data.metadata)
      commit('setUser', data.data);
      commit('setToken', data.metadata.token)
      return data;
    })
}

export function logout({commit}) {
  return axiosClient.post('/logout')
    .then((response) => {
      commit('setToken', null)

      return response;
    })
}


// ----------- MARCAS --------
export function getMarcas({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setMarcas', [true])
  url = url || '/marca'
  const params = {
    per_page: state.marcas.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setMarcas', [false, response.data])
    })
    .catch(() => {
      commit('setMarcas', [false])
    })
}

export function createMarca({commit}, marca) {

    const form = new FormData();
    form.append('nome', marca.nome);
    if (marca.arquivo instanceof File) {
      form.append('arquivo', marca.arquivo)
    }
    marca = form;

  return axiosClient.post('/marca', marca)
}

export function getMarca({commit}, id) {
  return axiosClient.get(`/marca/${id}`)
}

export function deleteMarca({commit}, id) {
  return axiosClient.delete(`/marca/${id}`)
}

export function updateMarca({commit}, marca) {
  const id = marca.id
    const form = new FormData();
    form.append('id', marca.id);
    form.append('nome', marca.nome);
    if (marca.arquivo instanceof File) {
      form.append('arquivo', marca.arquivo)
    }
    form.append('_method', 'patch');
    marca = form;
  return axiosClient.post(`/marca/${id}`, marca)
}
