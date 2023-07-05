<script setup>
    import { useRouter } from 'vue-router'
    import { onMounted, ref } from 'vue'
    import { showNotify } from 'vant'
    import { handleStartPayment } from "@/api/finance";
    
    const router = useRouter()
    
    const finance = ref({
        id: 0,
        price: 0,
        status: '',
        type: '',
        createTime: '',
        updateTime: ''
    })
    
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
    
    const type = ref('')
    const status = ref('')
    
    onMounted(() => {
        finance.value = JSON.parse(router.currentRoute.value.query.finance)
        type.value = typeColumns[finance.value.type].text
        status.value = payStatusColumns[finance.value.status].text
    })
    
    const showPayBar = ref(false)
    
    const actions = [
        {
            name: '支付宝支付'
        }
    ]
    
    const handlePaymentSelect = async (index) => {
        if (index.name === '支付宝支付'){
            try {
                const data = await handleStartPayment(finance.value.id)
                if (data !== null && data.code === 2000) {
                    showPayBar.value = false
                    // 执行data.payUrl中的<script>代码
                    document.write(data.payUrl)
                } else if (data !== null){
                    showNotify({
                        type: 'danger',
                        message: `支付失败,${data.msg}`
                    })
                } else {
                    showNotify({
                        type: 'danger',
                        message: '支付失败,请检查网络连接'
                    })
                }
            } catch (e) {
                console.log(e)
            } finally {
                showPayBar.value = false
                await router.push('/main/finance/finance-list')
            }
        } else {
            showNotify({
                type: 'danger',
                message: '暂不支持该支付方式'
            })
        }
    }
</script>

<template>
    <div class="finance-detail-form">
        <van-nav-bar
            title="查看账单信息"
            left-text="返回"
            left-arrow
            @click-left="router.go(-1)"
        />
        <van-cell-group inset style="margin-top:5%;">
            <van-field
                v-model="finance.id"
                readonly
                label="账单编号"
            />
            <van-field
                v-model="finance.price"
                readonly
                label="账单价格"
            />
            <van-field
                v-model="type"
                readonly
                label="账单类型"
            />
            <van-field
                v-model="status"
                readonly
                label="账单状态"
            />
            <van-field
                v-model="finance.createTime"
                readonly
                label="创建时间"
            />
            <van-field
                v-model="finance.updateTime"
                readonly
                label="更新时间"
            />
        </van-cell-group>
        
        <div class="start-pay-btn" v-if="finance.status === 0">
            <van-button plain block type="primary" @click="showPayBar=true">
                开始支付
            </van-button>
        </div>
        
        <!--  底部弹窗  -->
        <van-action-sheet
            v-model:show="showPayBar"
            :actions="actions"
            cancel-text="取消"
            close-on-click-action
            @cancel="showPayBar=false"
            description="请选择支付方式"
            @select="handlePaymentSelect"
        />
    </div>
</template>

<style scoped lang="less">
    .finance-detail-form {
        width: 100%;
        height: 100%;
        text-align: center;
        
        .start-pay-btn {
            margin-top: 5%;
            display: flex;
            justify-content: space-around;
            
            .van-button {
                width: 40%;
                border-radius: 10px;
            }
        }
    }
</style>
