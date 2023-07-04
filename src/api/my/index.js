import axios from '../index.js'
import { closeToast, showLoadingToast, showNotify } from 'vant'

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

export const handleRevisePassword = async (revisePasswordDto) => {
    beginLoading("正在修改密码")
    try {
        const {data} = await axios.put('/api/user/password', revisePasswordDto)
        return data
    } catch (e) {
        showNotify({type: 'danger', message: `首页初始化失败,${e.message}`})
    } finally {
        closeToast()
    }
    return null
}

export const handleGetBasicData = async () => {
    beginLoading('正在获取您的信息')
    try {
        const {data} = await axios.get('/api/management/user/living/message')
        return data
    } catch (e) {
        showNotify({type: 'danger', message: `详情初始化失败,${e.message}`})
    } finally {
        closeToast()
    }
    return null
}
