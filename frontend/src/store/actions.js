import axiosClient from "../axios";

export function getCurrentUser({commit}, id) {
  return axiosClient.get(`/user/${id}`)
}

export function updateUser({commit}, user) {
  const id = user.id
  return axiosClient.put(`/user/${id}`, user)
      .then(({data}) => {
        commit('setUser', data.data);             
      })
}

export function deleteUser({commit}, id) {
  return axiosClient.delete(`/user/${id}`)
    .then(() => {
      commit('setToken', null)            
    })
}

export function login({commit}, data) {
  return axiosClient.post('/auth/login', data)
    .then(({data}) => {
      commit('setUser', data.data);
      commit('setToken', data.metadata.token)
      commit('setRefreshToken', data.metadata.refreshToken)
      return data;
    })
}

export function registrar({commit}, data) {
  return axiosClient.post('/auth/cadastrar', data)
    .then(({data}) => {
      commit('setUser', data.data);
      commit('setToken', data.metadata.token)
      commit('setRefreshToken', data.metadata.refreshToken)
      return data;
    })
}

export function refresh({commit}, data) {
  return axiosClient.post('/auth/refresh', {token: data})
    .then(({data}) => {
      commit('setToken', data.metadata.token)
      commit('setRefreshToken', data.metadata.refreshToken)
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


// ----------- Visitas Enfermos --------
export function getVisitasEnfermos({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setVisitaEnfermo', [true])
  url = url || '/enfermo'
  const params = {
    per_page: state.visitasEnfermos.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setVisitaEnfermo', [false, response.data])
    })
    .catch(() => {
      commit('setVisitaEnfermo', [false])
    })
}

export function createVisitaEnfermo({commit}, visitaEnfermo) {
  return axiosClient.post('/enfermo', visitaEnfermo)
}

export function getVisitaEnfermo({commit}, id) {
  return axiosClient.get(`/enfermo/${id}`)
}

export function deleteVisitaEnfermo({commit}, id) {
  return axiosClient.delete(`/enfermo/${id}`)
}

export function updateVisitaEnfermo({commit}, visitaEnfermo) {
  const id = visitaEnfermo.id
  return axiosClient.put(`/enfermo/${id}`, visitaEnfermo)
}

// ----------- Visitas Hospitais --------
export function getVisitasHospitais({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setVisitaHospitais', [true])
  url = url || '/hospital'
  const params = {
    per_page: state.visitasHospitais.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setVisitaHospital', [false, response.data])
    })
    .catch(() => {
      commit('setVisitaHospital', [false])
    })
}

export function createVisitaHospital({commit}, visitaHospital) {
  return axiosClient.post('/hospital', visitaHospital)
}

export function getVisitaHospital({commit}, id) {
  return axiosClient.get(`/hospital/${id}`)
}

export function deleteVisitaHospital({commit}, id) {
  return axiosClient.delete(`/hospital/${id}`)
}

export function updateVisitaHospital({commit}, visitaHospital) {
  const id = visitaHospital.id
  return axiosClient.put(`/hospital/${id}`, visitaHospital)
}


// ----------- Visitas Escolas --------
export function getVisitasEscolas({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setVisitaEscolas', [true])
  url = url || '/escola'
  const params = {
    per_page: state.visitasEscolas.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setVisitaEscola', [false, response.data])
    })
    .catch(() => {
      commit('setVisitaEscola', [false])
    })
}

export function createVisitaEscola({commit}, visitaEscola) {
  return axiosClient.post('/escola', visitaEscola)
}

export function getVisitaEscola({commit}, id) {
  return axiosClient.get(`/escola/${id}`)
}

export function deleteVisitaEscola({commit}, id) {
  return axiosClient.delete(`/escola/${id}`)
}

export function updateVisitaEscola({commit}, visitaEscola) {
  const id = visitaEscola.id
  return axiosClient.put(`/escola/${id}`, visitaEscola)
}


// ----------- Estudos --------
export function getEstudos({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setEstudo', [true])
  url = url || '/estudo'
  const params = {
    per_page: state.estudos.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setEstudo', [false, response.data])
    })
    .catch(() => {
      commit('setEstudo', [false])
    })
}

export function createEstudo({commit}, estudo) {
  return axiosClient.post('/estudo', estudo)
}

export function getEstudo({commit}, id) {
  return axiosClient.get(`/estudo/${id}`)
}

export function deleteEstudo({commit}, id) {
  return axiosClient.delete(`/estudo/${id}`)
}

export function updateEstudo({commit}, estudo) {
  const id = estudo.id
  return axiosClient.put(`/estudo/${id}`, estudo)
}


// ----------- Sermões --------
export function getSermoes({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setSermao', [true])
  url = url || '/sermao'
  const params = {
    per_page: state.sermoes.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setSermao', [false, response.data])
    })
    .catch(() => {
      commit('setSermao', [false])
    })
}

export function createSermao({commit}, sermao) {
  return axiosClient.post('/sermao', sermao)
}

export function getSermao({commit}, id) {
  return axiosClient.get(`/sermao/${id}`)
}

export function deleteSermao({commit}, id) {
  return axiosClient.delete(`/sermao/${id}`)
}

export function updateSermao({commit}, sermao) {
  const id = sermao.id
  return axiosClient.put(`/sermao/${id}`, sermao)
}


// ----------- Estudos Biblicos --------
export function getEstudosBiblicos({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setEstudoBiblico', [true])
  url = url || '/estudo-biblico'
  const params = {
    per_page: state.estudosBiblicos.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setEstudoBiblico', [false, response.data])
    })
    .catch(() => {
      commit('setEstudoBiblico', [false])
    })
}

export function createEstudoBiblico({commit}, estudoBiblico) {
  return axiosClient.post('/estudo-biblico', estudoBiblico)
}

export function getEstudoBiblico({commit}, id) {
  return axiosClient.get(`/estudo-biblico/${id}`)
}

export function deleteEstudoBiblico({commit}, id) {
  return axiosClient.delete(`/estudo-biblico/${id}`)
}

export function updateEstudoBiblico({commit}, estudoBiblico) {
  const id = estudoBiblico.id
  return axiosClient.put(`/estudo-biblico/${id}`, estudoBiblico)
}


// ----------- Discipulados --------
export function getDiscipulados({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setDiscipulado', [true])
  url = url || '/discipulado'
  const params = {
    per_page: state.discipulados.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setDiscipulado', [false, response.data])
    })
    .catch(() => {
      commit('setDiscipulado', [false])
    })
}

export function createDiscipulado({commit}, discipulado) {
  return axiosClient.post('/discipulado', discipulado)
}

export function getDiscipulado({commit}, id) {
  return axiosClient.get(`/discipulado/${id}`)
}

export function deleteDiscipulado({commit}, id) {
  return axiosClient.delete(`/discipulado/${id}`)
}

export function updateDiscipulado({commit}, discipulado) {
  const id = discipulado.id
  return axiosClient.put(`/discipulado/${id}`, discipulado)
}


// ----------- Batismos Infantis --------
export function getBatismosInfantis({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setBatismoInfantil', [true])
  url = url || '/batismo-infantil'
  const params = {
    per_page: state.batismosInfantis.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setBatismoInfantil', [false, response.data])
    })
    .catch(() => {
      commit('setBatismoInfantil', [false])
    })
}

export function createBatismoInfantil({commit}, batismoInfantil) {
  return axiosClient.post('/batismo-infantil', batismoInfantil)
}

export function getBatismoInfantil({commit}, id) {
  return axiosClient.get(`/batismo-infantil/${id}`)
}

export function deleteBatismoInfantil({commit}, id) {
  return axiosClient.delete(`/batismo-infantil/${id}`)
}

export function updateBatismoInfantil({commit}, batismoInfantil) {
  const id = batismoInfantil.id
  return axiosClient.put(`/batismo-infantil/${id}`, batismoInfantil)
}


// ----------- Batismos e Profissões de Fé --------
export function getBatismosProfissoes({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setBatismoProfissao', [true])
  url = url || '/batismo-profissao'
  const params = {
    per_page: state.batismosProfissoes.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setBatismoProfissao', [false, response.data])
    })
    .catch(() => {
      commit('setBatismoProfissao', [false])
    })
}

export function createBatismoProfissao({commit}, batismoProfissao) {
  return axiosClient.post('/batismo-profissao', batismoProfissao)
}

export function getBatismoProfissao({commit}, id) {
  return axiosClient.get(`/batismo-profissao/${id}`)
}

export function deleteBatismoProfissao({commit}, id) {
  return axiosClient.delete(`/batismo-profissao/${id}`)
}

export function updateBatismoProfissao({commit}, batismoProfissao) {
  const id = batismoProfissao.id
  return axiosClient.put(`/batismo-profissao/${id}`, batismoProfissao)
}


// ----------- Benções Nupciais --------
export function getBencoesNupciais({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setBencaoNupcial', [true])
  url = url || '/bencao-nupcial'
  const params = {
    per_page: state.bencoesNupciais.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setBencaoNupcial', [false, response.data])
    })
    .catch(() => {
      commit('setBencaoNupcial', [false])
    })
}

export function createBencaoNupcial({commit}, bencaoNupcial) {
  return axiosClient.post('/bencao-nupcial', bencaoNupcial)
}

export function getBencaoNupcial({commit}, id) {
  return axiosClient.get(`/bencao-nupcial/${id}`)
}

export function deleteBencaoNupcial({commit}, id) {
  return axiosClient.delete(`/bencao-nupcial/${id}`)
}

export function updateBencaoNupcial({commit}, bencaoNupcial) {
  const id = bencaoNupcial.id
  return axiosClient.put(`/bencao-nupcial/${id}`, bencaoNupcial)
}


// ----------- Santas Ceias --------
export function getSantasCeias({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setSantaCeia', [true])
  url = url || '/santa-ceia'
  const params = {
    per_page: state.santasCeias.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setSantaCeia', [false, response.data])
    })
    .catch(() => {
      commit('setSantaCeia', [false])
    })
}

export function createSantaCeia({commit}, santaCeia) {
  return axiosClient.post('/santa-ceia', santaCeia)
}

export function getSantaCeia({commit}, id) {
  return axiosClient.get(`/santa-ceia/${id}`)
}

export function deleteSantaCeia({commit}, id) {
  return axiosClient.delete(`/santa-ceia/${id}`)
}

export function updateSantaCeia({commit}, santaCeia) {
  const id = santaCeia.id
  return axiosClient.put(`/santa-ceia/${id}`, santaCeia)
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
  return axiosClient.get(`/membresia/${id}?tipo=Frequência`)
}

export function deleteMembresia({commit}, id) {
  return axiosClient.delete(`/membresia/${id}`)
}

export function updateMembresia({commit}, membresia) {
  const id = membresia.id
  return axiosClient.put(`/membresia/${id}`, membresia)
}

export function getComungante({commit}) {
  return axiosClient.get(`/frequencia?tipo=Comungante`)
}

export function getNaoComungante({commit}) {
  return axiosClient.get(`/frequencia?tipo=Não Comungante`)
}