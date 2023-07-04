<script setup>
    import { initMap } from '@/utils/amapUtil'
    import { onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'
    import { closeToast, showLoadingToast, showNotify } from 'vant'
    import 'vant/es/notify/style'
    import 'vant/es/toast/style'
    import { useRouter } from 'vue-router'
    
    import { useDark } from '@vueuse/core'
    
    const isDark = useDark()
    const router = useRouter()
    
    // 首先需要引入 Vue3 的 shallowRef() 方法（使用 shallowRef() 进行非深度监听，
    // 因为在 Vue3 所使用的 Proxy 拦截操作会改变 JS API 原生对象，所以此处需要区别 Vue2 使用方式对地图对象行非深度监听，
    // 否则会出现问题，建议 JS API 相关对象采用非响应式的普通对象来存储）。
    let map = shallowRef(null)
    let AMap
    let departurePoint
    let arrivePoint
    let queryType
    let driving
    let marker
    
    const resolvePoints = async () => {
        departurePoint = new AMap.LngLat(
            router.currentRoute.value.query.departureLng,
            router.currentRoute.value.query.departureLat
        )
        queryType = router.currentRoute.value.query.queryType
        if (queryType === 'route') {
            arrivePoint = new AMap.LngLat(
                router.currentRoute.value.query.arriveLng,
                router.currentRoute.value.query.arriveLat
            )
        }
    }
    
    function drawRoute (route) {
        const path = parseRouteToPath(route)
        
        const startMarker = new AMap.Marker({
            position: path[0],
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
            map: map.value
        })
        
        const endMarker = new AMap.Marker({
            position: path[path.length - 1],
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
            map: map.value
        })
        
        const routeLine = new AMap.Polyline({
            path: path,
            isOutline: true,
            outlineColor: '#ffeeee',
            borderWeight: 2,
            strokeWeight: 5,
            strokeColor: '#0091ff',
            lineJoin: 'round'
        })
        
        routeLine.setMap(map)
        
        // 调整视野达到最佳显示区域
        map.value.setFitView([startMarker, endMarker, routeLine])
    }
    
    // 解析DrivingRoute对象，构造成AMap.Polyline的path参数需要的格式
    // DrivingResult对象结构参考文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute
    function parseRouteToPath (route) {
        const path = [];
        
        let i = 0, l = route.steps.length
        for (; i < l; i++) {
            const step = route.steps[i]
            
            let j = 0, n = step.path.length
            for (; j < n; j++) {
                path.push(step.path[j])
            }
        }
        
        return path
    }
    
    const createMapInstance = async (AMap) => {
        map.value = new AMap.Map('route-map', { //设置地图容器id
            resizeEnable: true, //是否监控地图容器尺寸变化
            mapStyle: !isDark.value ? 'amap://styles/normal' : 'amap://styles/dark', //设置地图的显示样式
            viewMode: "3D", //是否为3D地图模式
            zoom: 15, //初始化地图级别 3-18的整数
            center: [
                router.currentRoute.value.query.departureLng,
                router.currentRoute.value.query.departureLat
            ] //初始化地图中心点位置
        })
        if (queryType === 'route') {
            driving = new AMap.Driving({
                // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                policy: AMap.DrivingPolicy.LEAST_TIME,
                map: map.value
            })
            driving.search(departurePoint, arrivePoint, function (status, result) {
                // result即是对应的公交导航信息，相关数据结构文档请参考
                // https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                if (status === 'complete') {
                    if (result.routes && result.routes.length) {
                        // 绘制第一条路线，也可以按需求绘制其它几条路线
                        drawRoute(result.routes[0])
                    }
                } else {
                    showNotify({type: 'danger', message: '路线规划失败，请检查输入地点是否在杭州市范围内'})
                }
            })
        } else {
            map.value.clearMap(); // 清除地图覆盖物
            
            marker = new AMap.Marker({
                position: departurePoint,
                icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
                offset: new AMap.Pixel(-13, -30)
            });
            marker.setLabel({
                offset: new AMap.Pixel(0, 20), //设置文本标注偏移量
                content: "<div class='info'>这是您的公寓位置</div>", //设置文本标注内容
                direction: 'right' //设置文本标注方位
            });
            
            map.value.add(marker)
            map.value.setFitView()
        }
    }
    
    // 监听isDark 如果切换到暗黑模式 则config-provider的background-color为black
    watch(isDark, async (val) => {
        // 重建map实例 不加这一句log这个watch要失效 不知道为什么
        console.log(val)
        await resolvePoints()
        await createMapInstance(AMap)
    })
    
    // 跳转到内置高德地图app
    const formUrlOfAMapApp = async () => {
        if (queryType === 'route') {
            // position=lon,lat[,name]
            const from = `${departurePoint.lng},` +
                `${departurePoint.lat},` +
                `${router.currentRoute.value.query.departurePoint}`
            const to = `${arrivePoint.lng},` +
                `${arrivePoint.lat},` +
                `${router.currentRoute.value.query.arrivePoint}`
            const mode = 'car'
            const policy = 0
            const coordinate = 'gaode'
            const callnative = 1
            window.location.href = 'https://uri.amap.com/navigation?' +
            `policy=${policy}&from=${from}&to=${to}&mode=${mode}` +
            `&coordinate=${coordinate}&callnative=${callnative}`
        } else {
            window.location.href = 'https://uri.amap.com/marker?' +
                `position=${departurePoint.lng},${departurePoint.lat}&name=我的公寓`
        }
    }
    
    onMounted(async () => {
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '正在加载地图...'
        })
        try {
            AMap = await initMap()
            await resolvePoints()
            await createMapInstance(AMap)
        } catch (e) {
            showNotify({type: 'danger', message: `地图加载失败,${e.message}`})
        } finally {
            closeToast()
        }
    })
    
    onBeforeUnmount(() => {
        // 调用document来destroy地图 即id为route-map的div
        document.getElementById('route-map').remove()
    })
</script>

<template>
    <div class="container">
        <van-nav-bar
            title="行程预览"
            left-text="返回"
            right-text="使用高德地图打开"
            left-arrow
            @click-left="router.go(-1)"
            @click-right="formUrlOfAMapApp()"
        />
        <div id="route-map"></div>
    </div>
</template>

<style lang="less" scoped>
    .container {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        
        .van-nav-bar {
            height: 7%;
        }
        
        #route-map {
            width: 100%;
            height: 93%;
            margin: 0;
        }
    }
</style>
