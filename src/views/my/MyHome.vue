<script setup>
    import { useRouter } from 'vue-router'
    import Cookies from 'js-cookie'
    import { useNavStore, useUserStore } from '@/store'
    import { storeToRefs } from 'pinia'
    import { handleLogoutReq } from '@/api/my'
    import { showConfirmDialog, showNotify } from 'vant'
    
    const router = useRouter()
    
    const userStore = useUserStore()
    const navStore = useNavStore()
    const {currentUser} = storeToRefs(userStore)
    
    const handleLogout = async () => {
        await handleLogoutReq()
        // 重置userStore navStore
        userStore.reset()
        navStore.reset()
        // 清除token信息
        Cookies.remove('token')
        // 跳转到登录页面
        await router.push('/login')
    }
    
    const handleBindAlipay = () => {
        if (currentUser.value.alipayId !== '') {
            showConfirmDialog({
                title: '提示',
                message: `您已绑定支付宝,您当前的支付宝账号为${currentUser.value.alipayId},是否重新绑定?`,
                confirmButtonText: '绑定',
                cancelButtonText: '取消',
                confirmButtonColor: '#f00',
                showCancelButton: true
            }).then(() => {
                window.location.href = 'https://openauth.alipaydev.com/oauth2/publicAppAuthorize.htm?' +
                    'app_id=' + import.meta.env.VITE_ALIPAY_SANDBOX_APP_ID + '&' +
                    'scope=' + import.meta.env.VITE_ALIPAY_SANDBOX_LOGIN_SCOPE + '&' +
                    'redirect_uri=' + import.meta.env.VITE_ALIPAY_SANDBOX_BIND_REDIRECT_URI + '&' +
                    'state=' + Cookies.get('token')
            }).catch(() => {
                showNotify({
                    type: 'primary',
                    message: '已取消重新解绑'
                })
            })
        } else {
            window.location.href = 'https://openauth.alipaydev.com/oauth2/publicAppAuthorize.htm?' +
                'app_id=' + import.meta.env.VITE_ALIPAY_SANDBOX_APP_ID + '&' +
                'scope=' + import.meta.env.VITE_ALIPAY_SANDBOX_LOGIN_SCOPE + '&' +
                'redirect_uri=' + import.meta.env.VITE_ALIPAY_SANDBOX_BIND_REDIRECT_URI + '&' +
                'state=' + Cookies.get('token')
        }
    }
</script>

<template>
    <van-cell-group inset>
        <van-row class="personCard">
            <van-col span="8">
                <van-image
                    class="avatar-container"
                    round
                    width="6rem"
                    height="6rem"
                    :src="currentUser.faceUrl"
                    fit="cover"
                >
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20"/>
                    </template>
                </van-image>
            </van-col>
            <van-col span="16">
                <h2>{{ currentUser.name }}</h2>
                <h4>欢迎使用员工公寓管理系统</h4>
            </van-col>
        </van-row>
    </van-cell-group>
    <van-cell-group inset>
        <van-list>
            <van-cell :key="2" :title="'住宿信息'"
                      @click="router.push('/main/my/my-dormitory')"/>
            <van-cell :key="2" :title="'个人基础信息维护'"
                      @click="router.push('/main/my/revise-info')"/>
            <van-cell :key="3" :title="'修改密码'"
                      @click="router.push('/main/my/revise-password')"/>
            <van-cell :key="4" :title="'支付宝绑定与换绑'"
                      @click="handleBindAlipay()"/>
        </van-list>
    </van-cell-group>
    <van-cell-group inset>
        <van-list>
            <van-cell :key="5" :title="'隐私'" @click="router.push('/privacy')"/>
        </van-list>
    </van-cell-group>
    <van-cell-group inset>
        <van-list>
            <van-cell :key="6" :title="'退出登录'" @click="handleLogout"/>
        </van-list>
    </van-cell-group>
</template>

<style lang="less" scoped>
    .van-cell-group {
        margin-top: 5%;
    }
    
    .personCard {
        height: 100%;
        // 纵向居中
        display: flex;
        align-items: center;
        
        .avatar-container {
            margin-left: 5px;
        }
    }
</style>
