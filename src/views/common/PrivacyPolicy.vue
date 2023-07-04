<script setup>
    import { useRouter } from 'vue-router'
    
    const router = useRouter()
</script>

<template>
    <div class="privacy-box">
        <h3 style="color: #5CA0FF">我们的隐私政策</h3>
        <van-list>
            <van-cell>
                    <div>
                        1. 您的证照将在您的浏览器与平台后端服务器之间加密传输。
                        平台仅保存必须的身份信息以保证您的交易安全。
                    </div>
            </van-cell>
            <van-cell>
                <div>
                    2. 应高德地图公司要求，我们需要在此注明如下内容:<p/>
                    本产品使用高德地图SDK
                    提供者的公司名称即高德软件有限公司，本产品使用了高德地图JS-API以为您提供
                    导航路径指引。本产品并不直接收集您的行程信息。如果您需要了解高德地图SDK
                    收集和使用的个人信息类型，请您查看
                    <a href="https://lbs.amap.com/home/privacy/">高德地图官方隐私说明</a>
                </div>
            </van-cell>
        </van-list>
        <van-button plain block type="primary" @click="router.go(-1)">
            返回上一页
        </van-button>
    </div>
</template>

<style lang="less" scoped>
    .privacy-box{
        margin-top: 5%;
        text-align: center;
        align-items: center;
        .van-cell{
            /deep/ .van-cell__value{
                min-width:80%;
                text-align: start;
            }
        }
        .van-button{
            width: 40%;
            // 永远处于底部
            position: fixed;
            bottom: 5%;
            // 左右居中
            left: 50%;
            transform: translateX(-50%);
        }
    }
</style>
