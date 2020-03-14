<template>
  <div class="shopping-cart">
    <div v-if="list">
      <van-sticky>
        <van-nav-bar @click-left="back" title="購物車" left-text="返回" left-arrow></van-nav-bar>
      </van-sticky>

      <van-card
        v-for="(item, i) in list"
        :key="i + '-cart'"
        num="1"
        :price="item.price"
        :desc="item.desc"
        :title="item.title"
      >
        {{item.title}}
        {{item.price}}
      </van-card>

      <div class="submit-bar">
        <div class="submit-bar__text">
          <span>總計</span>
          <span class="submit-bar__text__price">NT${{total}}</span>
        </div>
        <button class="submit-bar__button" @click="showActionSheet=true">
          <span>明天的早餐有著落啦</span>
        </button>
      </div>

      <van-action-sheet v-model="showActionSheet" title="明天的早餐有著落啦">
        <div class="content">
          <van-form>
            <van-field
              v-model="username"
              placeholder="名字"
              :rules="[{ required: true, message: '請告訴桃子你是誰' }]"
            />
            <div style="margin: 16px;">
              <button @click="order" class="submit-btn">下訂單</button>
            </div>
          </van-form>
        </div>
      </van-action-sheet>
    </div>

    <div v-else>
      購物車沒有東西喔
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: ["list"],
  data() {
    return {
      showActionSheet: false,
      username: ""
    };
  },
  computed: {
    total() {
      var sum = 0;
      this.list.forEach(item => {
        console.log(item.price)
        sum += item.price
      })
      return sum
    }
  },
  methods: {
    submit() {},
    back() {
      this.$store.dispatch('switchShoppingCart', false);
      this.$router.go(-1);
    },
    order() {},
    calTotal() {
      this.list.forEach(item => {
        this.total += item.price
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.shopping-cart {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f7f8fa;
}
</style>