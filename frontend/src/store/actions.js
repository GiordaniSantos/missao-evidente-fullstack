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
  return axiosClient.post('/crente', visitaCrente)
}

export function getVisitaCrente({commit}, id) {
  return axiosClient.get(`/crente/${id}`)
}

export function deleteVisitaCrente({commit}, id) {
  return axiosClient.delete(`/crente/${id}`)
}

export function updateVisitaCrente({commit}, visitaCrente) {
  const id = visitaCrente.id
  return axiosClient.put(`/crente/${id}`, visitaCrente)
}


// ----------- Visitas Crentes --------
export function getMembresias({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setMembresia', [true])
  url = url || '/membresia'
  const params = {
    per_page: state.membresias.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setMembresia', [false, response.data])
    })
    .catch(() => {
      commit('setMembresia', [false])
    })
}

export function createMembresia({commit}, membresia) {
  return axiosClient.post('/membresia', membresia)
}

export function getMembresia({commit}, id) {
  return axiosClient.get(`/membresia/${id}`)
}

export function deleteMembresia({commit}, id) {
  return axiosClient.delete(`/membresia/${id}`)
}

export function updateMembresia({commit}, membresia) {
  const id = membresia.id
  return axiosClient.put(`/membresia/${id}`, membresia)
}
