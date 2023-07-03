import axios from '../index.js'
import { closeToast, showLoadingToast } from 'vant'

const clearSession = () => {
    // window.sessionStorage.removeItem('carpoolingCache')
    window.sessionStorage.removeItem('currentUser')
}

const beginLoading = (message) => {
    showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: message
    })
}

export const handleLogoutReq = async () => {
    // 开始退出
    beginLoading("正在退出登录")
    try {
        clearSession()
        await axios.post('/api/auth/loginuser/logout')
    } catch (e) {
        // 不用管异常
    } finally {
        closeToast()
    }
}
