<script setup>

</script>

<template>
  <router-view/>
</template>

<style scoped lang="less">
.message-card-container {
  // 无论加载成什么样都位于searchForm下方
  margin-top: 7%;

  .carpoolingItem {
    .van-cell__value {
      min-width: 80%;

      .van-row {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #time {
        text-align: left;
      }

      #NameAndMessage {
        text-align: left;
      }
    }
  }
}
</style>