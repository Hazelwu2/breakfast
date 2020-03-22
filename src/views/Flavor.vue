<template>
  <div>
    <div>
      <div class="item-subtitle text-left">
        {{item.title.includes('7號餐') ? '厚片' : '薄片'}}要什麼口味呢？
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
          name: '草莓',
          price: 0
        },
        {
          name: '藍莓',
          price: 0
        },
        {
          name: '花生',
          price: 0
        },
        {
          name: '葡萄奶酥',
          price: 0
        },
        {
          name: '芋頭奶酥',
          price: 0
        },
        {
          name: '蜂蜜',
          price: 0
        },
        {
          name: '煉乳',
          price: 0
        },
        {
          name: '巧克力',
          price: 0
        },
        {
          name: '沙拉',
          price: 0
        },
        {
          name: '奶油',
          price: 0
        },
        {
          name: '香蒜',
          price: 0
        },
      ]
    }
  },
  methods: {
    checkAddonItem() {
      // let temp;
      let order;
      this.list.forEach(item => {
        if (item.name == this.radio) {
          // temp = item.price;
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