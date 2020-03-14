<template>
  <div class="item">
    <van-sticky>
      <van-nav-bar @click-left="back" :title="$route.params.title" left-text="返回" left-arrow></van-nav-bar>
    </van-sticky>

    <van-panel :title="$route.params.subtitle" :desc="$route.params.desc"></van-panel>

    <div class="item-subtitle text-left">特殊指示</div>

    <van-panel>
      <div slot="header">
      </div>
      <textarea v-model="msg" placeholder="留下備註給桃子早餐"></textarea>
    </van-panel>

    <van-sticky>
      <van-button block class="btn-text" type="primary">新增1份餐點到訂單 ${{$route.params.price}}</van-button>
    </van-sticky>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    back() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>