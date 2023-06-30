import axios from 'axios'

const _axios = axios.create({
	baseURL: 'https://apartment-server.wangminan.me'
})

_axios.interceptors.request.use(
	(req) => {
		// 比如在这里添加统一的 headers
		if (window.localStorage.getItem('token') !== undefined) {
			req.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token')
		}
		return req
	},
	(err) => {
		return Promise.reject(err)
	}
)

_axios.interceptors.response.use(
	// eslint-disable-next-line consistent-return
	(res) => {
		if (res !== null && res.data !== null && res.data.code !== null){
			if (res.data.code === 4012 || res.data.code === 4010 || res.data.code === 4030) {//权限不足
				window.localStorage.removeItem('token')
				
				// 倒计时
				setTimeout(() => {
					window.location.href = '/login'
				}, 3000)
			}
		}
		return res
	},
	(err) => {
		return Promise.reject(err)
	}
)

export default _axios