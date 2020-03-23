<template>
  <div id="app" :class="{'isRest': isRest}">
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>

    <div class="cart" @click="switchShoppingCart">
      <van-icon name="cart-circle-o" size="2rem" color="#fff" />
    </div>

    <Cart v-if="showCart" :list="cart" />
  </div>
</template>

<script>
import Cart from "@/views/Cart";
export default {
  components: { Cart },
  data() {
    return {
      isRest: false
    }
  },
  computed: {
    showCart() {
      return this.$store.state.showCart;
    },
    cart() {
      return this.$store.state.cart;
    }
  },
  created() {
    this.checkData();
    let data = sessionStorage.getItem("vuex");
    console.log("[App.vue] created，VueX資料： ", JSON.parse(data));
    // 如果data存在並且重整
    if (data) {
      this.$store.replaceState(
        Object.assign({}, this.$store.state, JSON.parse(data))
      );
      sessionStorage.removeItem(data);
    }
  },
  methods: {
    checkData() {
      const startDate = this.$moment("20200316"); // 公休日
      let isRest = false;
      // moment().weeks() = 12 雙數週
      // (moment().week()) % 2 == 0
      // moment().weekday()
      let biweekly = (this.$moment().weeks()) % 2 == 0;
      let monday = this.$moment().format('d') == "1";

      // 檢查時間點 每天的23:00
      let timePoint = 
        this.$moment().startOf('day').subtract(1, 'hour').format('HH:mm');
      // 現在的時間
      let now = this.$moment().format('HH:mm');

      // 先檢查是不是雙週的週一
      if (biweekly && monday) {
        this.isRest = true;
        this.$dialog.alert({
          message: "桃子今日休息，不開放點餐"
        });
      } else if (now > timePoint) {
        // 檢查是不是超過每天晚上2300
        this.isRest = true
        this.$dialog.alert({
          message: "已經結單囉，請23:00前訂"
        });

      } else {
        this.isRest = false;
      }
      
    },
    switchShoppingCart() {
      this.$store.dispatch("switchShoppingCart", true);
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
svg {
  fill: white;
}
</style>