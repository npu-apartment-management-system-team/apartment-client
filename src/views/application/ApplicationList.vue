<script setup>
    import { onMounted, ref } from 'vue'
    import { handleGetApplicationList } from '@/api/application'
    import { showNotify } from 'vant'
    import { useRouter } from 'vue-router'
    
    const router = useRouter()
    
    const queryDto = ref({
        pageNum: 1,
        pageSize: 10
    })
    
    const applicationStatusEnum = ref({
        10: '入住申请完成',
        11: '提交入住申请',
        12: '本单位入住审批',
        13: '房寓段入住审批',
        14: '房建段入住分配宿舍',
        15: '入住待缴纳押金',
        16: '入住申请被本单位驳回',
        17: '入住申请被房建段驳回',
        18: '缴纳押金超时',
        19: '班组长确认超时',
        110: '用户撤回入住申请',
        20: '调宿申请完成',
        21: '提交调宿申请',
        22: '本单位通过调宿申请',
        23: '房建段通过调宿申请',
        24: '房建段分配新宿舍',
        25: '原有宿管确认离宿',
        26: '调宿申请被本单位驳回',
        27: '调宿申请被房建段驳回',
        28: '缴纳押金超时',
        29: '班组长确认超时',
        210: '用户撤回调宿申请',
        30: '退宿申请完成',
        31: '提交退宿申请',
        32: '班组长确认退宿超时',
        33: '用户撤回退宿申请'
    })
    
    const applicationTypeEnum = ref({
        0: '入住申请',
        1: '调宿申请',
        2: '退宿申请'
    })
    
    const applicationList = ref([])
    
    const total = ref(0)
    
    const loading = ref(false)
    
    const finished = ref(false)
    
    const getApplicationList = async () => {
        loading.value = true
        try {
            const data = await handleGetApplicationList(queryDto.value)
            if (data !== null && data.code === 2000) {
                applicationList.value.push(...data.result.list)
                total.value = data.total
                queryDto.value.pageNum ++
                if (data.result.list !== queryDto.value.pageSize) {
                    finished.value = true
                }
            } else if (data !== null) {
                showNotify({
                    type: 'danger',
                    message: `获取申请列表失败：${data.msg}`
                })
            } else {
                showNotify({
                    type: 'danger',
                    message: '获取申请列表失败：未知错误'
                })
            }
        } finally {
            loading.value = false
        }
    }
    
    onMounted(async () => {
        await getApplicationList()
    })
    
    const showApplicationItem = async (application) => {
        await router.push({
            name: 'main-application-detail',
            query: {
                id: application.id
            }
        })
    }
</script>

<template>
    <!-- 搜索条 -->
    <div class="apply-btn-container">
        <van-button type="primary" plain block>新增申请</van-button>
    </div>
    <!-- 内容部分 始终位于搜索条下方-->
    <div class="application-card-container">
        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多申请了"
            @load="getApplicationList"
        >
            <van-cell-group inset style="margin-top:2%"
                v-for="application in applicationList" :key="application">
                <van-cell class="application-item"
                          @click="showApplicationItem(application)"
                >
                    <van-row>
                        <van-col span="12">
                            申请序列号: {{application.id}}
                        </van-col>
                        <van-col span="12">
                            申请类型: {{ applicationTypeEnum[application.type] }}
                        </van-col>
                    </van-row>
                    <van-row>
                        申请进度: {{applicationStatusEnum[application.applicationStatus]}}
                    </van-row>
                    <van-row>
                        提交时间: {{application.createTime}}
                    </van-row>
                    <van-row>
                        最后更新时间: {{application.updateTime}}
                    </van-row>
                </van-cell>
            </van-cell-group>
        </van-list>
    </div>
</template>

<style scoped lang="less">
    .apply-btn-container {
        // 无论页面如何滑动如何处于页面顶部
        width: 100%;
        position: sticky;
        top: 2%;
        z-index: 999;
        text-align: center;
        display: flex;
        justify-content: center;
        
        .van-button {
            width: 80%;
        }
    }
    
    .application-card-container{
        // 无论加载成什么样都位于searchForm下方
        margin-top: 7%;
        .application-item {
            text-align: start;
            .van-cell__value {
                text-align: start;
                min-width: 80%;
                .van-row{
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    text-align: start;
                }
            }
        }
    }
</style>
