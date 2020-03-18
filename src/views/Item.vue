<template>
  <div class="item">
    <van-sticky>
      <van-nav-bar @click-left="back" :title="item.subtitle" left-text="返回" left-arrow></van-nav-bar>
    </van-sticky>

    <van-panel :title="item.title" :desc="item.desc"></van-panel>

    <!-- 配料 蛋餅吐司漢堡 -->
    <div class="item-subtitle text-left">
      配料要什麼呢？
      <span>
        <br />沒有看到你想要的？寫在備註，告訴桃子
      </span>
  
    </div>
    <van-panel>
      <van-radio-group @change="checkAddonItem('firstRadio')" v-model="firstRadio">
        <van-radio :name="x.name" v-for="(x,i) in level(item.title)" :key="i">
          <div>
            <span class="name">{{x.name}}</span>
            <span class="price">+NT${{x.price}}</span>
          </div>
        </van-radio>
      </van-radio-group>
    </van-panel>

    <!-- 飲品加點 -->
    <div class="item-subtitle text-left">
      配杯飲料吧 {{addon}}
      <span>無糖飲料，請另外備註</span>
    </div>
    <van-panel>
      <van-radio-group @change="checkAddonItem('drinkRadio')" v-model="drinkRadio">
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
        :disabled="firstRadio == 0 && drinkRadio==0"
        block
        class="btn-text submit-btn"
        @click="addToCart"
      >新增1份餐點到訂單 ${{trialPrice}}</van-button>
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
          price: 15
        },
        {
          name: "冰紅茶（中）",
          price: 15
        },
        {
          name: "溫紅茶（大）",
          price: 20
        },
        {
          name: "冰紅茶（大）",
          price: 20
        },
        {
          name: "溫奶茶（中）",
          price: 15
        },
        {
          name: "冰奶茶（中）",
          price: 15
        },
        {
          name: "溫豆漿（中）",
          price: 10
        },
        {
          name: "冰豆漿（中）",
          price: 10
        },
        {
          name: "檸檬汁（中）",
          price: 20
        },
        {
          name: "檸檬汁（大）",
          price: 25
        },
        {
          name: "檸檬紅茶（中）",
          price: 25
        },
        {
          name: "檸檬紅茶（大）",
          price: 25
        },
        {
          name: "柳橙汁（中）",
          price: 20
        },
        {
          name: "柳橙汁（大）",
          price: 25
        },
        {
          name: "柳橙紅茶（中）",
          price: 20
        },
        {
          name: "柳橙紅茶（大）",
          price: 25
        },
        {
          name: "米漿（中）",
          price: 10
        },
        {
          name: "米漿（大）",
          price: 20
        },
        {
          name: "豆漿紅茶（中）",
          price: 15
        },
        {
          name: "豆漿紅茶（大）",
          price: 20
        },
        {
          name: "薏仁漿（中）",
          price: 10
        },
        {
          name: "薏仁漿（大）",
          price: 20
        },
        {
          name: "鮮奶茶（中）",
          price: 30
        },
        {
          name: "鮮奶茶（大）",
          price: 40
        },
        {
          name: "研磨咖啡（中）",
          price: 30
        },
        {
          name: "研磨咖啡（大）",
          price: 40
        },
        {
          name: "鮮奶咖啡（中）",
          price: 45
        },
        {
          name: "鮮奶咖啡（大）",
          price: 55
        },
        {
          name: "不加點飲料",
          price: 0
        }
      ],
      level1: [
        {
          name: "吐司",
          price: 20
        },
        {
          name: "漢堡",
          price: 25
        },
        {
          name: "大亨堡",
          price: 30
        },
        {
          name: "蛋餅",
          price: 20
        },
        {
          name: "捲餅",
          price: 30
        },
        {
          name: "西式燒餅",
          price: 30
        },
        {
          name: "乳酪餅",
          price: 30
        },
        {
          name: "鬆餅",
          price: 35
        }
      ],
      level2: [
        {
          name: "吐司",
          price: 30
        },
        {
          name: "漢堡",
          price: 30
        },
        {
          name: "大亨堡",
          price: 35
        },
        {
          name: "蛋餅",
          price: 30
        },
        {
          name: "捲餅",
          price: 35
        },
        {
          name: "西式燒餅",
          price: 35
        },
        {
          name: "乳酪餅",
          price: 40
        },
        {
          name: "鬆餅",
          price: 40
        }
      ],
      level3: [
        {
          name: "吐司",
          price: 40
        },
        {
          name: "漢堡",
          price: 40
        },
        {
          name: "大亨堡",
          price: 45
        },
        {
          name: "蛋餅",
          price: 40
        },
        {
          name: "捲餅",
          price: 45
        },
        {
          name: "西式燒餅",
          price: 45
        },
        {
          name: "乳酪餅",
          price: 45
        },
        {
          name: "鬆餅",
          price: 50
        }
      ],
      level4: [
        { // 總匯
          name: "吐司",
          price: 50
        },
        {
          name: "漢堡",
          price: 40
        },
        {
          name: "大亨堡",
          price: 45
        },
        {
          name: "蛋餅",
          price: 40
        },
        {
          name: "捲餅",
          price: 55
        },
        {
          name: "西式燒餅",
          price: 55
        },
        {
          name: "乳酪餅",
          price: 50
        },
        {
          name: "鬆餅",
          price: 60
        }
      ],
      level5: [
        // 德式香腸蛋
        {
          name: "吐司",
          price: 45
        },
        {
          name: "漢堡",
          price: 45
        },
        {
          name: "大亨堡",
          price: 45
        },
        {
          name: "蛋餅",
          price: 45
        },
        {
          name: "捲餅",
          price: 50
        },
        {
          name: "西式燒餅",
          price: 55
        },
        {
          name: "乳酪餅",
          price: 50
        },
        {
          name: "鬆餅",
          price: 60
        }
      ],
      level6: [
        {
          name: "吐司",
          price: 50
        },
        {
          name: "漢堡",
          price: 50
        },
        {
          name: "大亨堡",
          price: 55
        },
        {
          name: "蛋餅",
          price: 50
        },
        {
          name: "捲餅",
          price: 55
        },
        {
          name: "西式燒餅",
          price: 55
        },
        {
          name: "乳酪餅",
          price: 50
        },
        {
          name: "鬆餅",
          price: 60
        }
      ],
      level7: [
        {
          name: "吐司",
          price: 60
        },
        {
          name: "漢堡",
          price: 60
        },
        {
          name: "大亨堡",
          price: 65
        },
        {
          name: "蛋餅",
          price: 60
        },
        {
          name: "捲餅",
          price: 65
        },
        {
          name: "西式燒餅",
          price: 65
        },
        {
          name: "乳酪餅",
          price: 60
        },
        {
          name: "鬆餅",
          price: 70
        }
      ],
      firstRadio: "0", // 選蛋餅、漢堡等
      drinkRadio: "0", // 選飲料
      price: "", // level1-level6，不同level價格也不同
      originPrice: 0, // 原始價格
      trialPrice: 0, // 試算價格
      addon: {
        item: 0,
        beverage: 0
      }
    };
  },
  methods: {
    back() {
      this.$router.push("/");
      this.$store.dispatch("switchShoppingCart", false);
    },
    loop(items, name) {
      // items 的值：飲料(beverage)、配料（item）
      this[items].forEach(item => {
        if (item.name == name) {
          let temp = item.price;
          // 勾選飲料或配料的價格
          this.addon[items == "beverage" ? "beverage" : "item"] = item.price;
        }
        // 試算價格 = 原價 + 加點飲料 + 加點配料
        this.trialPrice =
          this.originPrice + this.addon["beverage"] + this.addon["item"];
      });
    },
    checkAddonItem(radio) {
      // 檢查加點項目是否要加價
      // 當User change radio時會試算價格，並更新到trialPrice上

      if (radio == "firstRadio") {
        this.loop(this.price, this.firstRadio);
      } else {
        this.loop("beverage", this[radio]);
      }
    },
    level(title) {
      switch (title) {
        case "煎蛋":
          this.price = "level1";
          return this.level1;
        case "起司蛋":
        case "漢堡肉蛋":
        case "火腿蛋":
        case "培根蛋":
        case "肉鬆蛋":
        case "鮪魚蛋":
        case "玉米蛋":
          this.price = "level2";
          return this.level2;

        case "豬排蛋":
        case "香雞蛋":
        case "燻雞蛋":
        case "腓力蛋":
        case "鮮蝦蛋":
        case "鱈魚蛋":
          this.price = "level3";
          return this.level3;
        case "總匯":
          this.price = "level4";
          return this.level4;

        case "德式香腸蛋":
          this.price = "level5";
          return this.level5;
        
        case "雞腿蛋":
        case "卡啦雞腿蛋":
          this.price = "level6";
          return this.level6;

        case "韓式勁辣雞腿蛋":
        case "牛肉蛋":
          this.price = "level7";
          return this.level7;

        default:
          return this.level3;
      }
    },
    addToCart() {
      let temp = {
        title: this.item.title,
        subtitle: this.item.subtitle || "",
        desc: this.item.desc || "",
        price: this.item.price,
        msg: this.item.msg || "",
      };

      // this.price = 確定是level幾的菜單，每一層level價格都不同
      this[this.price].forEach(item => {
        if (item.name === this.firstRadio) {
          temp.title += `${item.name}`;
          temp.price += item.price;
        }
        // temp.price = this.addon['items']
      });

      this.beverage.forEach(drink => {
        if (drink.name === this.drinkRadio) {
          temp.title += `＋${drink.name}`;
          temp.price += drink.price;
        }
      });

      this.checkAddonItem();

      this.$store.dispatch("addToCart", temp);
      this.$toast.success("加入購物車成功");
    }
  },
  created() {
    this.originPrice = this.item.price;
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

  .van-sticky {
    margin-bottom: 2.5rem;
  }
}
</style>