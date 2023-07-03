<script setup>
    import { useRouter } from 'vue-router'
    import { onMounted } from 'vue'
    import { showNotify } from 'vant'
    
    const router = useRouter()
    
    onMounted(async () => {
        showNotify({
            type: 'danger',
            message: '您的账户未绑定支付宝账号,请先登录并绑定'
        })
        setTimeout(async () => {
            await router.push('/login')
        }, 3000)
    })
</script>

<template>
    <div class="welcome-banner">
        <h1>正在处理登录信息</h1>
    </div>
</template>

<style lang="less" scoped>
    .welcome-banner {
        // 上下左右居中
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>
