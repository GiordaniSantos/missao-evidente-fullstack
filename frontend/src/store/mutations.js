
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
      limit: data.meta.per_page,
      from: data.meta.from,
      to: data.meta.to,
      total: data.meta.total,
    }
  }
  state.visitasCrentes.loading = loading;
}

export function setMarcas(state, [loading, data = null]) {

  if (data) {
    state.marcas = {
      ...state.marcas,
      data: data.data,
      links: data.meta?.links,
      page: data.meta.current_page,
      limit: data.meta.per_page,
      from: data.meta.from,
      to: data.meta.to,
      total: data.meta.total,
    }
  }
  state.marcas.loading = loading;
}