<template>
  <div class="item">
    <van-sticky>
      <van-nav-bar @click-left="back" :title="item.subtitle" left-text="返回" left-arrow></van-nav-bar>
    </van-sticky>

    <van-panel :title="item.title" :desc="item.desc"></van-panel>
    <!-- 飲品加點 -->
    <div class="item-subtitle text-left">
      配杯飲料吧
      <span>無糖飲料，請另外備註</span>
    </div>
    <van-panel>
      <van-radio-group @change="checkAddonItem" v-model="radio">
        <van-radio :name="drink.name" v-for="(drink,i) in beverage" :key="i">
          <div>
            <span class="name">{{drink.name}}</span>
            <span class="price">+NT${{drink.price}}</span>
          </div>
        </van-radio>
        
      
      </van-radio-group>
    </van-panel>

    <div class="item-subtitle text-left">特殊指示</div>

    <van-panel>
      <div slot="header"></div>
      <textarea v-model="item.msg" placeholder="留下備註給桃子早餐"></textarea>
    </van-panel>

    <van-sticky>
      <van-button
        block
        class="btn-text submit-btn"
        @click="addToCart"
      >新增1份餐點到訂單 ${{item.price}}</van-button>
    </van-sticky>
  </div>
</template>

<script>
export default {
  computed:{
    item() {
      return this.$store.state.item
    }
  },
  data() {
    return {
      // item: {
      //   title: "",
      //   subtitle: "",
      //   desc: "",
      //   price: this.item.price || 0,
      //   msg: ""
      // },
      beverage: [
        {
          name: '溫紅茶（中）',
          price: 5
        },
        {
          name: '冰紅茶（中）',
          price: 5
        },
        {
          name: '溫紅茶（大）',
          price: 15
        },
        {
          name: '冰紅茶（大）',
          price: 15
        },
        {
          name: '溫奶茶（中）',
          price: 5
        },
        {
          name: '冰奶茶（中）',
          price: 5
        },
        {
          name: '溫豆漿（中）',
          price: 5
        },
        {
          name: '冰豆漿（中）',
          price: 5
        },

      ],
      radio: '1'
    };
  },
  methods: {
    back() {
      this.$router.push("/");
      this.$store.dispatch("switchShoppingCart", false);
    },
    addToCart() {
      let temp = {
        title: this.item.title,
        subtitle: this.item.subtitle,
        desc: this.item.desc,
        price: this.item.price,
        msg: this.item.msg
      };
      this.checkAddonItem()

      this.$store.dispatch("addToCart", temp);
      this.$toast.success("加入購物車成功");
    },
    checkAddonItem() {
      // 檢查加點項目
      // console.log(this.radio)
      switch (this.radio) {
        case '溫紅茶（中）':
          break;
        case '溫紅茶（大）':
          this.beverage.forEach(item => {
            if (item.name == '溫紅茶（大）') {
              console.log(item.price)
            }
          })

          break;
        default:
          return;
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.item {
  .item-subtitle {
    span {
      font-size: 12px;
    }
  }
  .van-radio__label {
    .name {
      color: #000;
    }
    .price {
      letter-spacing: 1px;
      padding-left: .8rem;
      font-size: 12px;
      line-height: 20px;
      color: rgb(84, 84, 84);
      cursor: pointer;
    }
  }
}
</style>