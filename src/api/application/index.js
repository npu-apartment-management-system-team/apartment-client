import axios from '../index.js'
import { closeToast, showLoadingToast, showNotify } from 'vant'

const beginLoading = (message) => {
    showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: message
    })
}

export const handleGetApplicationList = async (queryDto) => {
    beginLoading('获取申请列表中')
    try {
        const {data} = await axios.get(
            '/api/application/apply/status',
            {
                params: queryDto
            })
        return data
    } catch (e) {
        showNotify({
            type: 'danger',
            message: '获取申请列表失败'
        })
    } finally {
        closeToast()
    }
    return null
}

export const handleGetSpecificApplication = async (id) => {
    beginLoading('获取申请详情中')
    try {
        const {data} = await axios.get(`/api/application/apply/status/${id}`)
        return data
    } catch (e) {
        showNotify({
            type: 'danger',
            message: '获取申请详情失败'
        })
    } finally {
        closeToast()
    }
    return null
}

export const handleWithdrawApplication = async (id) => {
    beginLoading('撤回申请中')
    try {
        const {data} = await axios.put(`/api/application/apply/${id}`)
        return data
    } catch (e) {
        showNotify({
            type: 'danger',
            message: '撤回申请失败'
        })
    } finally {
        closeToast()
    }
    return null
}

export const handleSubmitApplication = async (applicationDto) => {
    beginLoading('提交申请中')
    try {
        const {data} = await axios.post('/api/application/apply', applicationDto)
        return data
    } catch (e) {
        showNotify({
            type: 'danger',
            message: '提交申请失败'
        })
    } finally {
        closeToast()
    }
    return null
}
