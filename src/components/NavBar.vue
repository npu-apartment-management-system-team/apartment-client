<script setup>
    import { onMounted, ref } from 'vue'
    import { useNavStore } from '@/store'
    import { storeToRefs } from 'pinia'
    import { useRouter } from 'vue-router'
    
    const router = useRouter()
    const active = ref('carpooling')
    
    const navStore = useNavStore()
    const {nav} = storeToRefs(navStore)
    
    const saveNavState = (navName, to) => {
        navStore.$patch((state) => {
            state.nav.currentNav = navName
            state.nav.to = to
        })
    }
    
    onMounted(async () => {
        // 从pinia读取当前active
        active.value = nav.value.currentNav
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


