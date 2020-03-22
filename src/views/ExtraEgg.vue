<template>
  <div>
    <div>
      <div class="item-subtitle text-left">
        要加蛋嗎？
        <span>
          <br />
          <van-icon name="chat-o" />沒有看到你想要的？寫在備註，告訴桃子
        </span>
      </div>
      <van-panel>
        <van-radio-group @change="checkAddonItem" v-model="radio">
          <van-radio :name="x.name" v-for="(x,i) in list" :key="i">
            <div>
              <span class="name">{{x.name}}</span>
              <span class="price">+NT${{x.price}}</span>
            </div>
          </van-radio>
        </van-radio-group>
      </van-panel>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    item() {
      return this.$store.state.item;
    },
  },
  data() {
    return {
      radio: 0,
      list: [
        {
          name: '不加蛋',
          price: 0
        },
        {
          name: '加蛋',
          price: 10
        },
      ]
    }
  },
  methods: {
    checkAddonItem() {
      let order;
      this.list.forEach(item => {
        if (item.name == this.radio) {
          order = {
            name: item.name,
            price: item.price
          }
        }
      });
      this.$emit("addPrice", order);
    }
  }
}
</script>

<style>

</style>