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

export const handleStartPayment = async (orderId) => {
    beginLoading('正在发起支付')
    try {
        const {data} = await axios.post(`/api/finance/user/pay/${orderId}`)
        return data
    } catch (e) {
        showNotify({
            type: 'danger',
            message: '发起支付失败,服务器异常,请重试'
        })
    } finally {
        closeToast()
    }
    return null
}

export const handlePutPaymentStatus = async (orderId) => {
    beginLoading('正在更新支付状态')
    try {
        const {data} = await axios.put(`/api/finance/user/pay/${orderId}`)
        return data
    } catch (e) {
        showNotify({
            type: 'danger',
            message: '更新支付状态失败,服务器异常,请重试'
        })
    } finally {
        closeToast()
    }
    return null
}
