import axios from '../index.js'
import { closeToast, showLoadingToast, showNotify } from 'vant'

const beginLoading = (message) => {
    showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: message
    })
}
export const handleGetMessageList = async (queryDto)=>{
    beginLoading('正在加载消息列表')
    try {
        const {data} = await axios.get(
            '/api/message/receiver/inbox',
            {
                params: queryDto
            }
        )
        return data
    } catch (e) {
        showNotify({
            type: 'danger',
            message: '加载消息列表失败'
        })
    } finally {
        closeToast()
    }
    return null
}

export const handleGetMessageDetail = async (id)=>{
    console.log(id)
    beginLoading('正在加载消息详情')
    try {
        const {data} = await axios.get(
            '/api/message/receiver/inbox/detail',
            {
                params: {
                    id: id
                }
            }
        )
        return data
    } catch (e) {
        showNotify({
            type: 'danger',
            message: '加载消息详情失败'
        })
    } finally {
        closeToast()
    }
    return null
}
