import axios from 'axios'

const options = {
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
}

export const upload = axios.create(options)


const api = axios.create({
  ...options,
  baseURL: '/api/v1/',
})

export function update(path, data, options={}) {
  const method = options.method || (data.id ? 'put' : 'post')
  return api[method](path, data).then(response => {
    const created = method === 'post'
    return [response.data, created]
  })
}

export function remove(path) {
  return api.delete(path).then(response => ({}))
}


export const fetcher = (path) => {
  return api.get(path).then(response => response.data)
}

export default api
