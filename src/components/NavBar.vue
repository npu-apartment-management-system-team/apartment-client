<script setup>
    import { onMounted, ref } from 'vue'
    import { useNavStore, useUserStore } from '@/store'
    import { storeToRefs } from 'pinia'
    import { useRouter } from 'vue-router'
    import { handleGetPersonalInfo } from '@/api/common'
    import { showNotify } from 'vant'
    
    const router = useRouter()
    const active = ref('carpooling')
    
    const navStore = useNavStore()
    const {nav} = storeToRefs(navStore)
    
    const userStore = useUserStore()
    const {currentUser} = storeToRefs(userStore)
    
    const getUserBasic = async () => {
        const data = await handleGetPersonalInfo()
        if (data !== null && data.code === 2000) {
            userStore.$patch((state) => {
                state.currentUser = data.result
            })
        } else if (data !== null) {
            showNotify({type: 'danger', message: `首页初始化失败,${data.msg},请刷新页面重试`});
        } else {
            showNotify({type: 'danger', message: `首页初始化失败,请刷新页面重试`});
        }
    }
    
    const saveNavState = (navName,to) => {
        navStore.$patch((state) => {
            state.nav.currentNav = navName
            state.nav.to = to
        })
    }
    
    onMounted(async () => {
        // 从pinia读取当前active
        active.value = nav.value.currentNav
        if (currentUser.value.isDeleted === 1) {
            // 首次登入 pinia为空 加载用户信息
            await getUserBasic()
        }
        await router.push(nav.value.to)
    })
</script>

<template>
    <van-tabbar v-model="active">
        <van-tabbar-item
            name="application"
            icon="todo-list-o" to="/main/application/application-list"
            @click="saveNavState('application', '/main/application/application-list')"
        >
            我的申请
        </van-tabbar-item>
        <van-tabbar-item
            name="finance"
            icon="balance-list-o" to="/main/finance/finance-list"
            @click="saveNavState('finance', '/main/finance/finance-list')"
        >
            我的账单
        </van-tabbar-item>
        <van-tabbar-item
            name="message"
            icon="chat-o"
            to="/main/message/message-list"
            @click="saveNavState('message', '/main/message/message-list')"
        >
            我的消息
        </van-tabbar-item>
        <van-tabbar-item
            name="my" icon="user-o"
            to="/main/my/my-home"
            @click="saveNavState('my', '/main/my/my-home')"
        >
            我
        </van-tabbar-item>
    </van-tabbar>
</template>


