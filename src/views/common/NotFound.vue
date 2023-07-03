<script setup>
    import { showFailToast } from 'vant'
    import 'vant/es/toast/style'
    import { onMounted } from 'vue'
    
    import { useRouter } from 'vue-router'
    
    const router = useRouter()

    onMounted(async () => {
        showFailToast('您似乎来到了不存在房间的荒原,三秒后跳转到用户主页')
        setInterval(async () => {
            await router.push('/main/my/my-home')
        }, 3000)
    })
</script>

<template>
    <div></div>
</template>

