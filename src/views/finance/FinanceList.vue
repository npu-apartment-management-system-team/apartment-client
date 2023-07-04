<script setup>
    import { onMounted, ref } from 'vue'
    import { handleGetFinanceList } from '@/api/finance'
    import { showNotify } from 'vant'
    import { useRouter } from 'vue-router'
    
    const router = useRouter()
    
    const typeColumns = [
        {
            text: '押金',
            value: 0
        },
        {
            text: '住宿费',
            value: 1
        },
        {
            text: '网费',
            value: 2
        }
    ]
    
    const payStatusColumns = [
        {
            text: '未支付',
            value: 0
        },
        {
            text: '支付中 等待回调',
            value: 1
        },
        {
            text: '支付完成',
            value: 2
        }
    ]
    
    const financeList = ref([])
    
    const queryDto = ref({
        pageNum: 1,
        pageSize: 10,
        beginTime: '',
        type: '',
        status: ''
    })
    
    const total = ref(0)
    const loading = ref(false)
    const finished = ref(false)
    
    let oldQueryDto = {
        pageNum: 1,
        pageSize: 10,
        beginTime: '',
        type: '',
        status: ''
    }
    
    const getFinanceList = async () => {
        loading.value = true
        try {
            if (queryDto.value !== oldQueryDto) {
                queryDto.value.pageNum = 1
                // 强弱拷贝
                oldQueryDto.pageNum = queryDto.value.pageNum
                oldQueryDto.pageSize = queryDto.value.pageSize
                oldQueryDto.beginTime = queryDto.value.beginTime
                oldQueryDto.type = queryDto.value.type
                oldQueryDto.status = queryDto.value.status
            }
            const data = await handleGetFinanceList(queryDto.value)
            if (data !== null && data.code === 2000) {
                financeList.value.push(...data.result.list)
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
    
    const showDatePicker = ref(false)
    
    onMounted(async () => {
        oldQueryDto = {
            pageNum: 1,
            pageSize: 10,
            beginTime: '',
            type: '',
            status: ''
        }
        await getFinanceList()
    })
    
    const onDateConfirm = ({ selectedValues }) => {
        queryDto.value.beginTime = selectedValues.join('-')
        showDatePicker.value = false
    }
    
    const clearDate = () => {
        queryDto.value.beginTime = ''
        showDatePicker.value = false
    }
    
    const type = ref('')
    const status = ref('')
    
    const showTypePicker = ref(false)
    
    const onTypeConfirm = async ({selectedValues}) => {
        showTypePicker.value = false
        queryDto.value.type = selectedValues[0]
        type.value = typeColumns[selectedValues[0]].text
    }
    
    const clearType = () => {
        showTypePicker.value = false
        type.value = ''
        queryDto.value.type = ''
    }
    
    const showStatusPicker = ref(false)
    
    const onStatusConfirm = async ({selectedValues}) => {
        showStatusPicker.value = false
        queryDto.value.status = selectedValues[0]
        status.value = payStatusColumns[selectedValues[0]].text
    }
    
    const clearStatus = () => {
        showStatusPicker.value = false
        status.value = ''
        queryDto.value.status = ''
    }
    
    const showFinanceDetail = async (finance) => {
        await router.push({
            name: 'main-finance-detail',
            query: {
                finance: JSON.stringify(finance)
            }
        })
    }
</script>

<template>
    <!-- 筛选条 -->
    <van-form class="searchForm">
        <van-cell-group inset>
            <!-- 时间选择 -->
            <van-field
                v-model="queryDto.beginTime"
                is-link
                readonly
                name="datePicker"
                label="选择开始时间"
                placeholder="点击选择时间"
                @click="showDatePicker = true"
            />
            <van-popup v-model:show="showDatePicker" position="bottom">
                <van-date-picker
                    :min-date="new Date(2023,5,28)"
                    cancel-button-text="取消/清空"
                    @confirm="onDateConfirm"
                    @cancel="clearDate"
                />
            </van-popup>
            
            <!-- 类型选择 -->
            <van-field
                v-model="type"
                is-link
                readonly
                label="类别"
                placeholder="点击选择缴费类别"
                @click="showTypePicker = true"
            />
            <van-popup v-model:show="showTypePicker" round position="bottom">
                <van-picker
                    :columns="typeColumns"
                    cancel-button-text="取消/清空"
                    @cancel="clearType"
                    @confirm="onTypeConfirm"
                />
            </van-popup>
            
            <!-- 状态选择 -->
            <van-field
                v-model="status"
                is-link
                readonly
                label="状态"
                placeholder="点击选择缴费状态"
                @click="showStatusPicker = true"
            />
            <van-popup v-model:show="showStatusPicker" round position="bottom">
                <van-picker
                    :columns="payStatusColumns"
                    cancel-button-text="取消/清空"
                    @cancel="clearStatus"
                    @confirm="onStatusConfirm"
                />
            </van-popup>
            
            <div class="submit-query-btn">
                <van-button plain size="mini"
                            block type="primary"
                            @click="getFinanceList"
                            icon="search"
                >
                    搜索
                </van-button>
            </div>
        </van-cell-group>
    </van-form>
    
    <!-- 内容部分 始终位于搜索条下方-->
    <div class="finance-card-container">
        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多行程了"
            @load="getFinanceList"
        >
            <van-cell-group inset style="margin-top:2%"
                            v-for="finance in financeList" :key="finance">
                <van-cell class="finance-item"
                          @click="showFinanceDetail(finance)"
                >
                    <van-row>
                        <van-col :span="12">
                            订单号:{{finance.id}}
                        </van-col>
                        <van-col :span="12">
                            订单金额:{{finance.price}}
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col :span="12">
                            订单状态:{{payStatusColumns[finance.status].text}}
                        </van-col>
                        <van-col :span="12">
                            订单类别:{{typeColumns[finance.type].text}}
                        </van-col>
                    </van-row>
                    <van-row>
                        发起时间:{{finance.createTime}}
                    </van-row>
                    <van-row>
                        更新时间:{{finance.updateTime}}
                    </van-row>
                </van-cell>
            </van-cell-group>
        </van-list>
    </div>
</template>

<style scoped lang="less">
    .searchForm{
        // 无论页面如何滑动如何处于页面顶部
        width:100%;
        position: sticky;
        top: 2%;
        z-index: 999;
        text-align: center;
        .submit-query-btn {
            display: flex;
            justify-content: space-around;
            margin: 1% auto 1%;
            
            .van-button {
                width: 40%;
                align-items: center;
            }
        }
    }
    .finance-card-container {
        // 无论加载成什么样都位于searchForm下方
        margin-top: 7%;
        .finance-item {
            .van-cell__value {
                min-width: 80%;
                .van-row{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
            }
        }
    }
</style>
