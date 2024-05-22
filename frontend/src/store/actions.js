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


// ----------- Visitas Incredulos --------
export function getVisitasIncredulos({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setVisitaIncredulo', [true])
  url = url || '/incredulo'
  const params = {
    per_page: state.visitasIncredulos.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setVisitaIncredulo', [false, response.data])
    })
    .catch(() => {
      commit('setVisitaIncredulo', [false])
    })
}

export function createVisitaIncredulo({commit}, visitaIncredulo) {
  return axiosClient.post('/incredulo', visitaIncredulo)
}

export function getVisitaIncredulo({commit}, id) {
  return axiosClient.get(`/Incredulo/${id}`)
}

export function deleteVisitaIncredulo({commit}, id) {
  return axiosClient.delete(`/incredulo/${id}`)
}

export function updateVisitaIncredulo({commit}, visitaIncredulo) {
  const id = visitaIncredulo.id
  return axiosClient.put(`/incredulo/${id}`, visitaIncredulo)
}

// ----------- Visitas Presidios --------
export function getVisitasPresidios({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setVisitaPresidio', [true])
  url = url || '/presidio'
  const params = {
    per_page: state.visitasPresidios.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setVisitaPresidio', [false, response.data])
    })
    .catch(() => {
      commit('setVisitaPresidio', [false])
    })
}

export function createVisitaPresidio({commit}, visitaPresidio) {
  return axiosClient.post('/presidio', visitaPresidio)
}

export function getVisitaPresidio({commit}, id) {
  return axiosClient.get(`/presidio/${id}`)
}

export function deleteVisitaPresidio({commit}, id) {
  return axiosClient.delete(`/presidio/${id}`)
}

export function updateVisitaPresidio({commit}, visitaPresidio) {
  const id = visitaPresidio.id
  return axiosClient.put(`/presidio/${id}`, visitaPresidio)
}

// ----------- Membresia --------
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
