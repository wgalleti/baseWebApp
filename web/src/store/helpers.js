import http from '../plugins/axios'

const defaultMutation = (state, key, payload = []) => {
  state[key] = payload
}

const parseHttpError = error => {
  if (error.response) {
    if (error.response.status === 400) {
      const data = error.response.data
      Object.keys(data).map(m => {
        if (Array.isArray(data[m])) {
          data[m].forEach(k => {
            throw new Error(`${m}: ${k}`)
          })
        } else {
          throw new Error(`${m}: ${data[m]}`)
        }
      })
    }
  } else if (error.request) {
    throw new Error(error.request)
  } else {
    throw new Error(error.message)
  }
}

const load = (url, commit, context, filter = null) => http.get(url, filter)
  .then(res => context.commit(commit, res.data))

const save = (url, context, form) => {
  if (form.id) {
    return http.patch(`${url}${form.id}/`, form).catch(err => parseHttpError(err))
  }
  return http.post(url, form).catch(err => parseHttpError(err))
}

const remove = (url, context, id) => http.delete(`${url}${id}/`)

export {
  defaultMutation,
  load,
  save,
  remove,
  parseHttpError
}
