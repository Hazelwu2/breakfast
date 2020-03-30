<template>
  <div id="app">
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
    return {};
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
    // console.log("[App.vue] created，VueX資料： ", JSON.parse(data));
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
      // moment().weeks() = 12 雙數週
      // (moment().week()) % 2 == 0
      // moment().weekday()
      let biweekly = this.$moment().weeks() % 2 == 0;
      let monday = this.$moment().format("d") == "1";

      // 檢查時間點 每天的23:00 - 隔日0900都不給訂餐

      // 現在的時間
      let now = this.$moment();
      let format = "YYYY-MM-DD HH:MM:ss";
      let yesterday;
      let today9PM;
      if (
        this.$moment() >
        this.$moment()
          .startOf("day")
          .add(10, "hour")
      ) {
        // 如果現在的時間已超過10點
        // 2020-03-23 23:03:00
        yesterday = this.$moment()
          .startOf("day")
          .add(23, "hour")
          .format(format);
        // 2020-03-24 09:00:00
        today9PM = this.$moment()
          .add(1, "day")
          .startOf("day")
          .add(9, "hour")
          .format("YYYY-MM-DD HH:MM:ss");
      } else {
        // 昨天晚上2300，例：2020-03-22 23:00:00
        yesterday = this.$moment()
          .startOf("day")
          .subtract(1, "hour")
          .format(format);
        // 今天的晚上九點，例：2020-03-23 09:00:00
        today9PM = this.$moment()
          .startOf("day")
          .add(9, "hour")
          .format(format);
      }

      // 先檢查是不是雙週的週一
      if (biweekly && monday) {
        let am9 = this.$moment().startOf('day').add(9, 'hour');
        if ( this.$moment > am9) {
          // 超過早上九點，可以點餐
          this.$store.dispatch("changeIsOpenStatus", true);
        } else {
          this.$store.dispatch("changeIsOpenStatus", false);
          console.log("isOpen", this.$store.state.isOpen);
          this.$dialog.alert({
            message: "桃子今日休息，不開放點餐"
          });
        }
      } else if (now.isBetween(yesterday, today9PM)) {
        // 再檢查是不是介於2300-0900時間區間
        this.$store.dispatch("changeIsOpenStatus", false);
        // this.$store.dispatch("changeIsOpenStatus", true);
        this.$dialog.alert({
          message: `已結單，2300-0900暫時不開放點餐`
        });
      } else {
        // 可點餐
        this.$store.dispatch("changeIsOpenStatus", true);
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