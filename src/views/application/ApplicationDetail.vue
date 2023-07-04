<script setup>
    import { useRouter } from 'vue-router'
    import { onMounted, ref } from 'vue'
    import { handleGetSpecificApplication, handleWithdrawApplication } from '@/api/application'
    import { showConfirmDialog, showNotify } from 'vant'
    
    const router = useRouter()
    
    let id = 0
    
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
    
    const depositStatusEnum = ref({
        0: '未缴纳',
        1: '已缴纳',
        2: '已退回'
    })
    
    const application = ref({})
    
    const getSpecificApplication = async (id) => {
        try {
            const data = await handleGetSpecificApplication(id)
            if (data !== null && data.code === 2000) {
                application.value = data.result
            } else if (data !== null) {
                showNotify({
                    type: 'danger',
                    message: `获取申请失败：${data.msg}`
                })
            } else {
                showNotify({
                    type: 'danger',
                    message: '获取申请失败：未知错误'
                })
            }
        } catch (e) {
            showNotify({
                type: 'danger',
                message: '获取申请失败：未知错误'
            })
        }
    }
    
    const withdrawStatusList = [
        10, 110, 20, 210, 30, 33
    ]
    
    const withdrawApplication = async () => {
        if (withdrawStatusList.indexOf(application.value.applicationStatus) !== -1) {
            showNotify({
                type: 'warning',
                message: '该申请已经无法撤回'
            })
            return
        }
        try {
            showConfirmDialog({
                title: '提示',
                message: `您确定要撤回该申请吗?`,
                confirmButtonText: '确认撤回',
                cancelButtonText: '取消',
                confirmButtonColor: '#f00',
                showCancelButton: true
            }).then(async () => {
                const data = await handleWithdrawApplication(id)
                if (data !== null && data.code === 2000) {
                    showNotify({
                        type: 'success',
                        message: '撤回申请成功'
                    })
                    await getSpecificApplication(id)
                } else if (data !== null) {
                    showNotify({
                        type: 'danger',
                        message: `撤回申请失败：${data.msg}`
                    })
                } else {
                    showNotify({
                        type: 'danger',
                        message: '撤回申请失败：未知错误'
                    })
                }
            }).catch(() => {
                showNotify({
                    type: 'primary',
                    message: '已取消撤回'
                })
            })
        } catch (e) {
            showNotify({
                type: 'danger',
                message: '撤回申请失败失败：未知错误'
            })
        }
    }
    
    onMounted(async () => {
        id = router.currentRoute.value.query.id
        await getSpecificApplication(id)
    })
</script>

<template>
    <div class="application-detail-form">
        <van-nav-bar
            title="查看申请信息"
            left-text="返回"
            left-arrow
            right-text="撤回该申请"
            @click-right="withdrawApplication()"
            @click-left="router.go(-1)"
        />
        <van-cell-group inset style="margin-top:5%;">
            <van-field
                v-model="application.id"
                readonly
                label="申请编号"
            />
            <van-field
                v-model="applicationTypeEnum[application.type]"
                readonly
                label="申请类型"
            />
            <van-field
                v-model="applicationStatusEnum[application.applicationStatus]"
                readonly
                label="申请类型"
            />
            <van-field
                v-model="depositStatusEnum[application.depositStatus]"
                readonly
                label="押金状态"
            />
            <van-field
                v-model="application.createTime"
                readonly
                label="发起时间"
            />
            <van-field
                v-model="application.updateTime"
                readonly
                label="更新时间"
            />
        </van-cell-group>
        
        <div class="pay-deposit-warning">
            <div>
                如须缴纳押金请至订单界面
            </div>
            <div>
                押金订单将会自动生成
            </div>
            <div>
                房间信息请至"我的"界面查看
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    .application-detail-form {
        width: 100%;
        height: 100%;
        text-align: center;
        
        .pay-deposit-warning {
            display: flex;
            flex-direction: column;
            margin: 5% auto 5%;
        }
    }
</style>
