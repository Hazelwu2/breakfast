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
      <van-button :disabled="radio==0" block class="btn-text submit-btn" @click="addToCart">新增1份餐點到訂單 ${{temp}}</van-button>
    </van-sticky>
  </div>
</template>

<script>
export default {
  computed: {
    item() {
      return this.$store.state.item;
    }
  },
  data() {
    return {
      beverage: [
        {
          name: "溫紅茶（中）",
          price: 0
        },
        {
          name: "冰紅茶（中）",
          price: 0
        },
        {
          name: "溫紅茶（大）",
          price: 15
        },
        {
          name: "冰紅茶（大）",
          price: 15
        },
        {
          name: "溫奶茶（中）",
          price: 5
        },
        {
          name: "冰奶茶（中）",
          price: 5
        },
        {
          name: "溫豆漿（中）",
          price: 5
        },
        {
          name: "冰豆漿（中）",
          price: 5
        },
        {
          name: "不加點飲料",
          price: 0
        },
      ],
      radio: "0",
      temp: 0
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
        subtitle: this.item.subtitle || '',
        desc: this.item.desc || '',
        price: this.item.price,
        msg: this.item.msg || ''
      };

      this.beverage.forEach(drink => {
        if (drink.name === this.radio) {
          temp.title += `、${drink.name}`
          temp.price += drink.price
        }
      })

      this.checkAddonItem();

      this.$store.dispatch("addToCart", temp);
      this.$toast.success("加入購物車成功");
    },
    loop(name) {
      this.beverage.forEach(drink => {
        if (drink.name == name) {
          this.temp += drink.price;
        }
      });
    },
    checkAddonItem() {
      // 檢查加點項目是否要加價

      this.temp = this.item.price;
      
      switch (this.radio) {
        case "溫紅茶（中）":
          this.loop('溫紅茶（中）')
          break;
        case "冰紅茶（中）":
          this.loop('冰紅茶（中）')
          break;
        case "溫紅茶（大）":
          this.loop('溫紅茶（大）')
          break;
        case "冰紅茶（大）":
          this.loop('冰紅茶（大）')
          break;
        case "溫奶茶（中）":
          this.loop('溫奶茶（中）')
          break;
        case "冰奶茶（中）":
          this.loop('冰奶茶（中）')
          break;
        case "溫豆漿（中）":
          this.loop('溫豆漿（中）')
          break;
        case "冰豆漿（中）":
          this.loop('冰豆漿（中）')
          break;
        default:
          return;
      }
    },
  },
  created() {
    this.temp = this.item.price;
  },
  update() {
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
      padding-left: 0.8rem;
      font-size: 12px;
      line-height: 20px;
      color: rgb(84, 84, 84);
      cursor: pointer;
    }
  }
}
</style>