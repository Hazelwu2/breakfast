<template>
  <div class="item">
    <van-sticky>
      <van-nav-bar @click-left="back" :title="$route.params.title" left-text="返回" left-arrow></van-nav-bar>
    </van-sticky>

    <van-panel :title="$route.params.subtitle" :desc="$route.params.desc"></van-panel>
    <div class="item-subtitle text-left">特殊指示</div>

    <van-panel>
      <div slot="header"></div>
      <textarea v-model="item.msg" placeholder="留下備註給桃子早餐"></textarea>
    </van-panel>

    <van-sticky>
      <van-button
        block
        class="btn-text"
        type="primary"
        @click="addToCart"
      >新增1份餐點到訂單 ${{$route.params.price}}</van-button>
    </van-sticky>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {
        title: "",
        subtitle: "",
        desc: "",
        price: 0,
        msg: "",
      },
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
      this.$store.dispatch('switchShoppingCart', false)
    },
    addToCart() {
      this.item = {
        title: this.$route.params.title,
        subtitle: this.$route.params.subtitle,
        desc: this.$route.params.desc,
        price: this.$route.params.price,
        msg: this.item.msg
      };

      this.$store.dispatch("addToCart", this.item);
      this.$notify({
        message: "加入購物車成功",
        color: "#fff",
        background: "linear-gradient(to right, #ff6034, #ee0a24)"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>