<script setup>
    import { useRouter } from 'vue-router'
    import { onMounted, ref } from 'vue'
    
    const router = useRouter()
    
    const finance = ref({
        id: 0,
        price: 0,
        status: '',
        type: '',
        createTime: '',
        updateTime: ''
    })
    
    onMounted(() => {
        finance.value = JSON.parse(router.currentRoute.value.query.finance)
    })
</script>

<template>

</template>

<style scoped lang="less">

</style>
