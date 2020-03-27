import axios from 'axios'

export default axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
})
