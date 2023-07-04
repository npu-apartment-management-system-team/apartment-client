import axios from '../index.js'
import { closeToast, showLoadingToast, showNotify } from 'vant'

const beginLoading = (message) => {
    showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: message
    })
}

export const handleGetFinanceList = async (queryDto) => {
    beginLoading('开始加载缴费信息列表')
    try {
        const {data} = await axios.get(
            '/api/finance/user/pay/list',
            {
                params: queryDto
            }
        )
        return data
    } catch (e) {
        showNotify({
            type: 'danger',
            message: '获取缴费信息列表失败'
        })
    } finally {
        closeToast()
    }
    return null
}
