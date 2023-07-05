<script setup>
    import { onMounted, ref } from 'vue'
    import { handleGetMessageList } from '@/api/message'
    import { showNotify } from 'vant'
    import { useRouter } from 'vue-router'
    
    const router = useRouter()
    const finished = ref(false)
    const loading = ref(false)
    const queryDto = ref({
        pageNum: 1,
        pageSize: 10,
        query: ''
    })
    
    const messageList = ref([])
    
    let oldQueryDto = {
        query: ''
    }
    
    let isFirstLoading = true
    const getMessageList = async () => {
        try {
            if (!isFirstLoading) {
                queryDto.value.pageNum++
            } else {
                isFirstLoading = !isFirstLoading
            }
            if (oldQueryDto.query !== queryDto.value.query) {
                isFirstLoading = true
                queryDto.value.pageNum = 1
                finished.value = false
            }
            
            loading.value = true
            const data = await handleGetMessageList(queryDto.value)
            if (data === null) {
                showNotify({
                    type: 'danger',
                    message: '获取消息列表失败: 服务器错误'
                })
            }
            
            if (data.code === 2000) {
                if (oldQueryDto.query !== queryDto.value.query) {
                    messageList.value = []
                    messageList.value.push(...data.result.list)
                    
                    oldQueryDto = {
                        query: queryDto.value.query
                    }
                } else {
                    // console.log(data.result)
                    messageList.value.push(...data.result.list)
                }
                if (data.total !== queryDto.value.pageSize) {
                    finished.value = true
                }
                // console.log(messageList.value)
            } else {
                showNotify({
                    type: 'danger',
                    message: `获取消息列表失败：${data.msg}`
                })
            }
        } finally {
            loading.value = false
        }
    }
    
    onMounted(async () => {
        await getMessageList(true)
    })
    
    const showMessageDetail = async (message) => {
        await router.push(`/main/message/message-detail?id=${message.id}`)
    }
</script>

<template>
    <van-form class="searchForm">
        <van-cell-group inset>
            <van-search
                label="搜索"
                v-model="queryDto.query"
                show-action
                placeholder="请输入搜索关键词"
                @clear="getMessageList()"
            >
                <template #action>
                    <van-button plain block type="primary"
                                size="mini" @click="getMessageList()"
                    >
                        搜索
                    </van-button>
                </template>
            </van-search>
        </van-cell-group>
    </van-form>
    <div class="message-card-container">
        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多消息了"
            @load="getMessageList"
        >
            <van-cell-group inset style="margin-top:2%" v-for="message in messageList" :key="message">
                <van-cell class="carpoolingItem" @click="showMessageDetail(message)">
                    {{ message.isDeleted }}
                    <van-row id="time">
                        
                        <van-col span="24">
                            {{ message.createTime }}
                        </van-col>
                    </van-row>
                    <van-row id="NameAndMessage">
                        <van-col span="6">
                            {{ message.senderAdminName }}
                        </van-col>
                        <van-col span="18">
                            {{ message.message.slice(0, 20) }}...
                        </van-col>
                    </van-row>
                </van-cell>
            </van-cell-group>
        </van-list>
    </div>
</template>

<style scoped lang="less">
    .searchForm {
        // 无论页面如何滑动如何处于页面顶部
        width: 100%;
        position: sticky;
        top: 2%;
        z-index: 999;
        text-align: center;
        
        .v-search {
            display: block;
            float: left;
        }
    }
    
    .message-card-container {
        // 无论加载成什么样都位于searchForm下方
        margin-top: 7%;
        
        .carpoolingItem {
            .van-cell__value {
                min-width: 80%;
                
                .van-row {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                #time {
                    text-align: left;
                }
                
                #NameAndMessage {
                    text-align: left;
                }
            }
        }
    }
</style>
