
import axios from 'axios';

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.common = {'Authorization': `${token}`}
    }
    return config;
  },
  error => Promise.reject(error)
)

export default axios
