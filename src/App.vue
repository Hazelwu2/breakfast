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
    return {
    };
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

      // 檢查時間點 每天的22:00 - 隔日0900都不給訂餐

      // 現在的時間
      let now = this.$moment();
      let format = "YYYY-MM-DD HH:MM:ss";
      let yesterday;
      let today9AM;

      // 如果現在的時候超過今天晚上十點
      if ( now > this.$moment().startOf("day").add(22, "hour") ) {
        // yesterday = 今日 22:00
        // today9AM = 隔天 0900
        yesterday = this.$moment()
          .startOf("day")
          .add(22, "hour")
          .format(format);
        // 2020-03-24 09:00:00
        today9AM = this.$moment()
          .add(1, "day")
          .startOf("day")
          .add(9, "hour")
          .format("YYYY-MM-DD HH:MM:ss");
      } else {
        // 如果現在的時候沒有超過晚上十點
        // yesterday = 昨天晚上 22:00
        // today9AM = 今天早上 0900
        // 昨天晚上2200，例：2020-03-22 22:00:00
        yesterday = this.$moment()
          .startOf("day")
          .subtract(2, "hour")
          .format(format);
        // 今天的早上九點，例：2020-03-23 09:00:00
        today9AM = this.$moment()
          .startOf("day")
          .add(9, "hour")
          .format(format);
      }

      console.log(`yesterday: ${yesterday}`); 
      console.log(`today9AM: ${today9AM}`)


      // 先檢查是不是雙週的週一
      if (biweekly && monday) {
        let am9 = this.$moment().startOf('day').add(9, 'hour');
        if ( this.$moment() > am9) {
          // 超過早上九點，可以點餐
          this.$store.dispatch("changeIsOpenStatus", true);
        } else {
          this.$store.dispatch("changeIsOpenStatus", false);

          this.$dialog.alert({
            message: "桃子今日休息，不開放點餐"
          });
        }
      } else if (now.isBetween(yesterday, today9AM)) {
        // 再檢查是不是介於2200-0900時間區間
        console.log(`${yesterday} 至 ${today9AM}之間`)
        this.$store.dispatch("changeIsOpenStatus", false);
        // this.$store.dispatch("changeIsOpenStatus", true);
        this.$dialog.alert({
          message: `已結單，2200-0900不開放點餐`
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