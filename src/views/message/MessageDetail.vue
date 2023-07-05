<script setup>
import {onMounted, ref} from 'vue'
import {handleGetMessageDetail} from '@/api/message'
import {showNotify} from 'vant'
import 'vant/es/notify/style'
import {useRouter} from "vue-router";
const router = useRouter()
const navTitle = ref('')
const messageDetail = ref({
  code: 1,
  msg: '',
  result: []
})
onMounted(async () => {
  const messageId = router.currentRoute.value.query.id
  const data = await handleGetMessageDetail(messageId)
  console.log(data)
  if (data !== null && data.code === 2000) {
    messageDetail.value.result = data.result.messageDetail
    navTitle.value = data.result.senderAdmin.name
  } else {
    showNotify({
      type: 'danger',
      message: '获取信息详情失败'
    })
  }
})
</script>

<template>
  <van-nav-bar
      :title="navTitle"
      left-text="返回"
      left-arrow
      @click-left="router.go(-1)"
  >
  </van-nav-bar>
  <div class="message-container">
    <van-list>
      <div id="time">
        {{messageDetail.result.createTime}}
      </div>
      <van-cell-group inset style="margin-top:2%">
        <van-col>
          {{messageDetail.result.message}}
        </van-col>
      </van-cell-group>
    </van-list>
  </div>

</template>

<style scoped lang="less">
#delete{
  color: red;
}
.message-container{
  margin-top: 7%;
  #time{
    text-align: center;
    margin: 0 auto;
    backface-visibility: hidden;
    color:darkgray;
  }
  .van-cell-group{
    width: 95%;
    margin: 0 auto;
    .van-col{
      text-align: left;
      margin-left: 5%;
      color: gray;
      word-break: break-all;
    }
  }
}
</style>
