import axios from 'axios'

const options = {
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
}

export const upload = axios.create(options)

export default axios.create({
  ...options,
  baseURL: '/api/v1',
})
