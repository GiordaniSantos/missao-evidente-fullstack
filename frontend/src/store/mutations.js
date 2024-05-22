
export function setUser(state, user) {
  state.user.data = user;
  if (user) {
    sessionStorage.setItem('USER_DATA', JSON.stringify(user));
  } else {
    sessionStorage.removeItem('USER_DATA')
  }
}

export function setToken(state, token) {
  state.user.token = token;
  if (token) {
    sessionStorage.setItem('TOKEN', token);
  } else {
    sessionStorage.removeItem('TOKEN')
  }
}

export function setVisitaCrente(state, [loading, data = null]) {

  if (data) {
    state.visitasCrentes = {
      ...state.visitasCrentes,
      data: data.data,
      links: data.meta?.links,
      page: data.meta.current_page,
      totalPage: data.meta.last_page,
      limit: data.meta.per_page,
      from: data.meta.from,
      to: data.meta.to,
      total: data.meta.total,
    }
  }
  state.visitasCrentes.loading = loading;
}

export function setVisitaIncredulo(state, [loading, data = null]) {

  if (data) {
    state.visitasIncredulos = {
      ...state.visitasIncredulos,
      data: data.data,
      links: data.meta?.links,
      page: data.meta.current_page,
      totalPage: data.meta.last_page,
      limit: data.meta.per_page,
      from: data.meta.from,
      to: data.meta.to,
      total: data.meta.total,
    }
  }
  state.visitasIncredulos.loading = loading;
}

export function setVisitaPresidio(state, [loading, data = null]) {

  if (data) {
    state.visitasPresidios = {
      ...state.visitasPresidios,
      data: data.data,
      links: data.meta?.links,
      page: data.meta.current_page,
      totalPage: data.meta.last_page,
      limit: data.meta.per_page,
      from: data.meta.from,
      to: data.meta.to,
      total: data.meta.total,
    }
  }
  state.visitasPresidios.loading = loading;
}

export function setMembresia(state, [loading, data = null]) {

  if (data) {
    state.membresias = {
      ...state.membresias,
      data: data.data,
      links: data.meta?.links,
      page: data.meta.current_page,
      totalPage: data.meta.last_page,
      limit: data.meta.per_page,
      from: data.meta.from,
      to: data.meta.to,
      total: data.meta.total,
    }
  }
  state.membresias.loading = loading;
}