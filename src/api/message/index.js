import axios from '../index.js'
import {closeToast, showLoadingToast, showNotify} from 'vant'
import 'vant/es/notify/style'
import 'vant/es/toast/style'

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
            '/api/message/sender/outbox',
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