import axiosClient from "../axios";

export function getCurrentUser({commit}, data) {
  return axiosClient.get('/user', data)
    .then(({data}) => {
      commit('setUser', data);
      return data;
    })
}

export function login({commit}, data) {
  return axiosClient.post('/auth/login', data)
    .then(({data}) => {
      commit('setUser', data.data);
      commit('setToken', data.metadata.token)
      return data;
    })
}

export function logout({commit}) {
 
      commit('setToken', null)

   
}

// ----------- Visitas Crentes --------
export function getVisitasCrentes({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setVisitaCrente', [true])
  url = url || '/crente'
  const params = {
    per_page: state.visitasCrentes.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setVisitaCrente', [false, response.data])
    })
    .catch(() => {
      commit('setVisitaCrente', [false])
    })
}

export function createVisitaCrente({commit}, visitaCrente) {

    const form = new FormData();
    form.append('nome', visitaCrente.nome);
    visitaCrente = form;

  return axiosClient.post('/crente', crente)
}

export function getVisitaCrente({commit}, id) {
  return axiosClient.get(`/crente/${id}`)
}

export function deleteVisitaCrente({commit}, id) {
  return axiosClient.delete(`/crente/${id}`)
}

export function updateVisitaCrente({commit}, visitaCrente) {
  const id = visitaCrente.id
    const form = new FormData();
    form.append('id', visitaCrente.id);
    form.append('nome', visitaCrente.nome);
    form.append('_method', 'patch');
    visitaCrente = form;
  return axiosClient.post(`/crente/${id}`, visitaCrente)
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
