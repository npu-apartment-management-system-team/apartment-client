<script setup>
    import { onMounted, ref } from 'vue'
    import { handleGetMessageDetail } from '@/api/message'
    import { showNotify } from 'vant'
    import { useRouter } from 'vue-router'
    
    const router = useRouter()
    const navTitle = ref('')
    const messageDetail = ref({})
    
    const senderAdmin = ref({
        departmentId: '',
        email: '',
        id: '',
        isDeleted: 0,
        loginAccountId: '',
        name: ''
    })
    
    onMounted(async () => {
        const messageId = router.currentRoute.value.query.id
        const data = await handleGetMessageDetail(messageId)
        console.log(data)
        if (data !== null && data.code === 2000) {
            messageDetail.value = data.result.messageDetail
            navTitle.value = data.result.senderAdmin.name
            senderAdmin.value = data.result.senderAdmin
        } else {
            showNotify({
                type: 'danger',
                message: '获取信息详情失败'
            })
        }
    })
</script>

<template>
    <van-nav-bar
        :title="navTitle"
        left-text="返回"
        left-arrow
        @click-left="router.go(-1)"
    >
    </van-nav-bar>
    <div class="message-container">
        <van-cell-group inset style="margin-top:2%">
            <van-cell>
                发信管理员: {{ senderAdmin.name }}
            </van-cell>
            <van-field
                v-model="messageDetail.message"
                readonly
                autosize
                label="留言内容"
                type="textarea"
                placeholder="请输入留言"
            />
            <van-cell>
                发信时间: {{ messageDetail.createTime }}
            </van-cell>
        </van-cell-group>
    </div>

</template>

<style scoped lang="less">
    .message-container {
        margin-top: 7%;
        
        #time {
            text-align: center;
            margin: 0 auto;
            backface-visibility: hidden;
            color: darkgray;
        }
        
        .van-cell-group {
            width: 95%;
            margin: 0 auto;
            
            .van-cell {
                /deep/ .van-cell__value {
                    min-width: 80%;
                    text-align: start;
                }
            }
        }
    }
</style>
