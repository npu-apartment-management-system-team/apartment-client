<script setup>
    import { useRouter } from 'vue-router'
    import { onMounted, ref } from 'vue'
    import { handleGetBasicData } from '@/api/my'
    import { showNotify } from 'vant'
    import { useUserStore } from '@/store'
    import { storeToRefs } from 'pinia'
    
    const userStore = useUserStore()
    const {currentUser} = storeToRefs(userStore)
    
    const basicData = ref({
        apartment: {},
        room: {},
        bed: {},
        department: {}
    })
    
    const getBasicData = async () => {
        try {
            const data = await handleGetBasicData()
            if (data !== null && data.code === 2000) {
                basicData.value = data.result
            } else if (data !== null) {
                showNotify({
                    type: 'danger',
                    message: `获取信息失败,${data.msg}`
                })
            } else {
                showNotify({
                    type: 'danger',
                    message: '获取信息失败,请检查网络'
                })
            }
        } catch (e) {
            showNotify({
                type: 'danger',
                message: '获取信息失败,请检查网络'
            })
        }
    }
    
    const router = useRouter()
    
    const getRoomFee = () => {
        // 0代扣 1自收
        if (currentUser.value.payType === 0) {
            return basicData.value.room.selfPayFee
        }
        return basicData.value.room.totalFee
    }
    
    const getNetFee = () => {
        if (currentUser.value.networkEnabled === 0) {
            return 0;
        }
        return 50;
    }
    
    onMounted(async () => {
        await getBasicData()
    })
    
    const getToNav = async () => {
        await router.push({
            name: 'preview-map',
            query: {
                departureLng: basicData.value.apartment.positionLongitude,
                departureLat: basicData.value.apartment.positionLatitude,
                arriveLng: basicData.value.department.positionLongitude,
                arriveLat: basicData.value.department.positionLatitude
            }
        })
    }
    
    const getBackNav = async () => {
        await router.push({
            name: 'preview-map',
            query: {
                departureLng: basicData.value.department.positionLongitude,
                departureLat: basicData.value.department.positionLatitude,
                arriveLng: basicData.value.apartment.positionLongitude,
                arriveLat: basicData.value.apartment.positionLatitude
            }
        })
    }
</script>

<template>
    <div class="my-dorm-form">
        <van-nav-bar
            title="我的住宿信息"
            left-text="返回"
            left-arrow
            @click-left="router.go(-1)"
        />
        <van-form style="margin-top:5%;">
            <van-cell-group inset>
                <van-cell>
                    我的公寓
                </van-cell>
                <van-cell>
                    <van-row>
                        公寓名称: {{basicData.apartment.name}}
                    </van-row>
                    <van-row>
                        公寓地点: {{basicData.apartment.position}}
                    </van-row>
                </van-cell>
            </van-cell-group>
            <van-cell-group inset>
                <van-cell>
                    我的房间
                </van-cell>
                <van-cell>
                    <van-row>
                        房间名称: {{basicData.room.name}}
                    </van-row>
                    <van-row>
                        每月总费用: {{basicData.room.totalFee}}
                    </van-row>
                    <van-row>
                        您的房费: {{getRoomFee()}}
                    </van-row>
                    <van-row>
                        您的网费: {{getNetFee()}}
                    </van-row>
                </van-cell>
            </van-cell-group>
            <van-cell-group inset>
                <van-cell>
                    我的床位
                </van-cell>
                <van-cell>
                    <van-row>
                        床位名称: {{basicData.bed.name}}
                    </van-row>
                    <van-row>
                        押金序列号: {{basicData.bed.receiptId}}
                    </van-row>
                </van-cell>
            </van-cell-group>
            
            <div class="map-btn">
                <van-button plain block type="primary" @click="getToNav()">
                    查看上班驾车导航
                </van-button>
                <van-button plain block type="primary" @click="getBackNav()">
                    查看下班驾车导航
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<style scoped lang="less">
    .my-dorm-form{
        width: 100%;
        height: 100%;
        text-align: center;
        .van-cell-group {
            margin-top: 5%;
            padding: 1%;
            /deep/ .van-cell__value {
                text-align: center;
            }
        }
        .map-btn {
            display: flex;
            justify-content: space-around;
            margin: 5% auto 5%;
            
            .van-button {
                width: 40%;
            }
        }
    }
</style>
