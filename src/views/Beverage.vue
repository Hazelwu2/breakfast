<template>
  <div>
    <div>
      <div class="item-subtitle text-left">飲料要做成你喜歡的樣子</div>

      <van-panel>
        <van-radio-group
          @change="checkAddonItem('drinkSize', 'drinkSizeRadio')"
          v-model="drinkSizeRadio"
        >
          <van-radio :name="x.name" v-for="(x,i) in drinkSize" :key="i + 'drinkSize'">
            <div>
              <span class="name">{{x.name}}</span>
              <span class="price">+NT${{x.price}}</span>
            </div>
          </van-radio>
        </van-radio-group>
      </van-panel>
      <div class="item-subtitle text-left">要什麼溫度？</div>
      <br>

      <van-panel>
        <van-radio-group
          @change="checkAddonItem('drinkTemperature', 'drinkTemperatureRadio')"
          v-model="drinkTemperatureRadio"
        >
          <van-radio :name="x.name" v-for="(x,i) in drinkTemperature" :key="i + 'temperature'">
            <div>
              <span class="name">{{x.name}}</span>
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
    }
  },
  data() {
    return {
      drinkSizeRadio: 0,
      drinkTemperatureRadio: '冰',
      drinkSize: [
        {
          name: "中杯",
          price: 0
        },
        {
          name: "大杯",
          price: 0
        }
      ],
      drinkTemperature: [
        {
          name: "溫",
          price: 0
        },
        {
          name: "冰",
          price: 0
        }
      ]
    };
  },
  methods: {
    changeDrinkPrice(largePrice) {
      // 傳參數：大杯價格
      this.drinkSize.forEach(drink => {
        if (drink.name == "中杯") {
          drink.price = 0;
        } else {
          drink.price = largePrice - this.item.price;
        }
      });

      // console.log(this.item.title, ' 的大杯價格是＄ ', largePrice)
    },
    checkDrinkSizePrice() {
      switch (this.item.title) {
        case "豆漿":
        case "薏仁漿":
        case "米漿":
          this.changeDrinkPrice(20);
          break;
        case "紅茶":
        case "奶茶":
        case "豆漿紅茶":
          this.changeDrinkPrice(20);
          break;
        case "檸檬汁":
        case "檸檬紅茶":
        case "柳橙汁":
        case "柳橙紅茶":
          this.changeDrinkPrice(25);
          break;
        case "鮮奶茶":
          this.changeDrinkPrice(35);
          break;
        case "研磨咖啡":
          this.changeDrinkPrice(40);
          break;
        case "鮮奶咖啡":
          this.changeDrinkPrice(55);
          break;
      }
    },
    checkAddonItem(list, radio) {
      // let temp;
      let order;
      
      // 必須選擇飲料size，才會繼續執行
      if (this.drinkSizeRadio == 0 ) {
        return;
      };
      

      this.drinkSize.forEach(item => {
        if (item.name == this.drinkSizeRadio) {
          // item.name 中杯 || 大杯
          // item.price 中杯價格 || 大杯價格
          order = {
            name: `${this.drinkSizeRadio}${this.drinkTemperatureRadio}${this.item.title}`,
            // 例：大杯溫奶茶或中杯冰奶茶
            price: item.price
          }
        }
      });

      this.$emit("addPrice", order);
    }
  },
  created() {
    this.checkDrinkSizePrice();
  }
};
</script>

<style>
</style>