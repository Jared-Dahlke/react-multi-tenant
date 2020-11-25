import axios from 'axios'
import configureStore from './redux/store/index'
import { setAuthToken } from './redux/actions/auth'

axios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.common = { Authorization: `${token}` }
		}
		return config
	},
	(error) => {
		Promise.reject(error)
	}
)

axios.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		if (axios.isCancel(error)) {
			console.log('cancelled duplicate request, OK')
		} else if (error.response.status === 401) {
			const store = configureStore()
			localStorage.removeItem('token')
			localStorage.removeItem('userId')
			store.dispatch(setAuthToken(null))
			window.location.href = '/login'
			console.log('error in interceptor:' + error)
		}
		return error
	}
)

export default axios
