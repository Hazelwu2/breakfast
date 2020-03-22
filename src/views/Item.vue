<template>
  <div class="item">
    <van-sticky>
      <van-nav-bar @click-left="back" :title="item.title" left-text="返回" left-arrow></van-nav-bar>
    </van-sticky>

    <van-sticky>
      <van-panel :title="item.title" :desc="item.subtitle">
        <div class="price" v-if="item.type !== '漢吐蛋'">NT$ {{item.price}}</div>
      </van-panel>
    </van-sticky>

    <!-- 只有一號餐、二號餐才會出現漢堡、大亨堡口味挑選 -->
    <Bread 
      v-if="comboOneAndTwo" 
      @addPrice="checkCustomPrice" />

    <!-- 只有七號餐、八號餐才會出現吐司口味（草莓、巧克力）挑選 -->
    <Flavor 
      v-if="comboSevenAndEight || item.type == '甜吐司'" 
      @addPrice="checkCustomPrice" />

    <!-- 單點飲料，才會出現的元件 -->
    <Beverage v-if="isLaCarteDrink" @addPrice="checkDrinkNotes" />

    <!-- 配料 蛋餅吐司漢堡 -->
    <div v-show="item.withBread">
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
    </div>

    <!-- 飲品加點，套餐 [item.combo] 才會出現 -->
    <div v-if="item.combo">
      <div class="item-subtitle text-left">
        配杯飲料吧
        <span>
          <br />
          <van-icon name="chat-o" />無糖飲料，請另外備註
        </span>
        <span>
          <br />
          <van-icon name="chat-o" />沒有特別備註飲料要冰的熱的，預設都是冰的
        </span>
      </div>

      <van-panel>
        <van-radio-group @change="checkAddonItem('drinkRadio')" v-model="drinkRadio">
          <van-radio :name="drink.name" v-for="(drink,i) in comboBeverage" :key="i">
            <div>
              <span class="name">{{drink.name}}</span>
              <span class="price">+NT${{drink.price}}</span>
            </div>
          </van-radio>
        </van-radio-group>

        <!-- 選飲料大小 -->
        <van-popup
          @close="closePopupComboDrink"
          v-model="showComboDrink"
          closeable
          close-icon="close"
          position="bottom"
          :style="{ height: '45%' }"
        >
          <van-panel class="order-panel"  title="生活就是一場流浪" desc="只好把飲料變成自己喜歡的樣子">
            <div>
              <span class="d-block text-left mt-5 mb-5">
              {{drinkRadio}}
              </span>
              <van-radio-group v-model="comboDrink.temperature">
                <van-radio name="冰的">冰的</van-radio>
                <van-radio name="涼的">涼的</van-radio>
                <van-radio name="溫的">溫的</van-radio>
                <van-radio name="熱的">熱的</van-radio>
              </van-radio-group>
            </div>
          </van-panel>
        </van-popup>
      </van-panel>
    </div>

    <div class="item-subtitle text-left">特殊指示</div>

    <van-panel>
      <div slot="header"></div>
      <textarea v-model="item.msg" placeholder="留下備註給桃子早餐"></textarea>
    </van-panel>

    <van-sticky id="fixed">
      <!-- 不用另外客製化，只需要填寫備註的餐點，例：厚片類 -->
      <van-button
        v-if="noDisabledCheck"
        block
        class="btn-text submit-btn"
        @click="addToCart"
      >1 新增1份餐點到訂單 ${{trialPrice}}</van-button>

      <van-button
        v-else-if="item.type  == '套餐'"
        :disabled="firstRadio == 0 && drinkRadio ==0"
        block
        class="btn-text submit-btn"
        @click="addToCart"
      >2 新增1份餐點到訂單 ${{trialPrice}}</van-button>

      <!-- 只有一種加料要確定的 -->
      <van-button
        v-else-if="item.type  == '漢吐蛋'"
        :disabled="firstRadio == 0"
        block
        class="btn-text submit-btn"
        @click="addToCart"
      >3 新增1份餐點到訂單 ${{trialPrice}}</van-button>

      <!-- 甜吐司 -->
      <van-button
        v-else-if="item.type  == '甜吐司'"
        :disabled="!customPrice.name"
        block
        class="btn-text submit-btn"
        @click="addToCart"
      >4 新增1份餐點到訂單 ${{trialPrice}}</van-button>

      <!-- 單點飲料，不會被disabled限制 -->
      <van-button
        v-else
        :disabled="!drink.name"
        block
        class="btn-text submit-btn"
        @click="addToCart"
      >5 新增1份餐點到訂單 ${{trialPrice}}</van-button>
    </van-sticky>
  </div>
</template>

<script>
import Bread from "./Bread";
import Flavor from "./Flavor";
import Beverage from "./Beverage";
export default {
  components: { Bread, Flavor, Beverage },
  computed: {
    item() {
      return this.$store.state.item;
    },
    comboOneAndTwo() {
      // 篩選餐點是不是1號餐、2號餐
      return (
        this.item.title.includes("1號餐") || this.item.title.includes("2號餐")
      );
    },
    comboSevenAndEight() {
      return (
        this.item.title.includes("7號餐") || this.item.title.includes("8號餐")
      );
    },
    isLaCarteDrink() {
      // 是單點飲料
      return this.item.drink;
    },
    noDisabledCheck() {
      return (
        this.item.type == "乳酪厚片" ||
        this.item.type == "披薩" ||
        this.item.type == "單點"
      );
    }
  },
  data() {
    return {
      showComboDrink: false,
      beverage: [
        // 非套餐飲料價格
        {
          name: "紅茶（中）",
          price: 15
        },
        {
          name: "紅茶（大）",
          price: 20
        },
        {
          name: "奶茶（中）",
          price: 15
        },
        {
          name: "奶茶（大）",
          price: 20
        },
        {
          name: "豆漿（中）",
          price: 10
        },
        {
          name: "豆漿（大）",
          price: 20
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
          price: 20
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
          price: 35
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
      ], //
      comboBeverage: [], // 套餐飲料價格
      // 吐司、蛋餅
      level1: [
        {
          name: "煎蛋",
          price: 20
        },
        {
          name: "起司蛋",
          price: 30
        },
        {
          name: "漢堡肉蛋",
          price: 30
        },
        {
          name: "火腿肉蛋",
          price: 30
        },
        {
          name: "培根蛋",
          price: 30
        },
        {
          name: "肉鬆蛋",
          price: 30
        },
        {
          name: "鮪魚蛋",
          price: 30
        },
        {
          name: "豬排蛋",
          price: 40
        },
        {
          name: "香雞蛋",
          price: 40
        },
        {
          name: "燻雞蛋",
          price: 40
        },
        {
          name: "腓力蛋",
          price: 40
        },
        {
          name: "鮮蝦蛋",
          price: 40
        },
        {
          name: "鱈魚蛋",
          price: 40
        },
        {
          name: "總匯",
          price: 50
        },
        {
          name: "德式香腸蛋",
          price: 45
        },
        {
          name: "雞腿蛋",
          price: 50
        },
        {
          name: "原味卡啦雞腿蛋",
          price: 50
        },
        {
          name: "辣味卡啦雞腿蛋",
          price: 50
        },
        {
          name: "韓式勁辣雞腿蛋",
          price: 60
        },
        {
          name: "牛肉蛋",
          price: 60
        }
      ],
      // 漢堡
      level2: [
        {
          name: "煎蛋",
          price: 25
        },
        {
          name: "起司蛋",
          price: 30
        },
        {
          name: "漢堡肉蛋",
          price: 30
        },
        {
          name: "火腿肉蛋",
          price: 30
        },
        {
          name: "培根蛋",
          price: 30
        },
        {
          name: "肉鬆蛋",
          price: 30
        },
        {
          name: "鮪魚蛋",
          price: 30
        },
        {
          name: "豬排蛋",
          price: 40
        },
        {
          name: "香雞蛋",
          price: 40
        },
        {
          name: "燻雞蛋",
          price: 40
        },
        {
          name: "腓力蛋",
          price: 40
        },
        {
          name: "鮮蝦蛋",
          price: 40
        },
        {
          name: "鱈魚蛋",
          price: 40
        },
        {
          name: "總匯",
          price: 40
        },
        {
          name: "德式香腸蛋",
          price: 45
        },
        {
          name: "雞腿蛋",
          price: 50
        },
        {
          name: "原味卡啦雞腿蛋",
          price: 50
        },
        {
          name: "辣味卡啦雞腿蛋",
          price: 50
        },
        {
          name: "韓式勁辣雞腿蛋",
          price: 60
        },
        {
          name: "牛肉蛋",
          price: 60
        }
      ],
      // 大亨堡
      level3: [
        {
          name: "煎蛋",
          price: 30
        },
        {
          name: "起司蛋",
          price: 35
        },
        {
          name: "漢堡肉蛋",
          price: 35
        },
        {
          name: "火腿肉蛋",
          price: 35
        },
        {
          name: "培根蛋",
          price: 35
        },
        {
          name: "肉鬆蛋",
          price: 35
        },
        {
          name: "鮪魚蛋",
          price: 35
        },
        {
          name: "豬排蛋",
          price: 45
        },
        {
          name: "香雞蛋",
          price: 45
        },
        {
          name: "燻雞蛋",
          price: 45
        },
        {
          name: "腓力蛋",
          price: 45
        },
        {
          name: "鮮蝦蛋",
          price: 45
        },
        {
          name: "鱈魚蛋",
          price: 45
        },
        {
          name: "總匯",
          price: 45
        },
        {
          name: "德式香腸蛋",
          price: 45
        },
        {
          name: "雞腿蛋",
          price: 55
        },
        {
          name: "原味卡啦雞腿蛋",
          price: 55
        },
        {
          name: "辣味卡啦雞腿蛋",
          price: 55
        },
        {
          name: "韓式勁辣雞腿蛋",
          price: 65
        },
        {
          name: "牛肉蛋",
          price: 65
        }
      ],
      // 捲餅
      level4: [
        {
          name: "煎蛋",
          price: 30
        },
        {
          name: "起司蛋",
          price: 35
        },
        {
          name: "漢堡肉蛋",
          price: 35
        },
        {
          name: "火腿肉蛋",
          price: 35
        },
        {
          name: "培根蛋",
          price: 35
        },
        {
          name: "肉鬆蛋",
          price: 35
        },
        {
          name: "鮪魚蛋",
          price: 35
        },
        {
          name: "豬排蛋",
          price: 45
        },
        {
          name: "香雞蛋",
          price: 45
        },
        {
          name: "燻雞蛋",
          price: 45
        },
        {
          name: "腓力蛋",
          price: 45
        },
        {
          name: "鮮蝦蛋",
          price: 45
        },
        {
          name: "鱈魚蛋",
          price: 45
        },
        {
          name: "總匯",
          price: 55
        },
        {
          name: "德式香腸蛋",
          price: 50
        },
        {
          name: "雞腿蛋",
          price: 55
        },
        {
          name: "原味卡啦雞腿蛋",
          price: 55
        },
        {
          name: "辣味卡啦雞腿蛋",
          price: 55
        },
        {
          name: "韓式勁辣雞腿蛋",
          price: 65
        },
        {
          name: "牛肉蛋",
          price: 65
        }
      ],
      // 西式燒餅
      level5: [
        {
          name: "煎蛋",
          price: 30
        },
        {
          name: "起司蛋",
          price: 35
        },
        {
          name: "漢堡肉蛋",
          price: 35
        },
        {
          name: "火腿肉蛋",
          price: 35
        },
        {
          name: "培根蛋",
          price: 35
        },
        {
          name: "肉鬆蛋",
          price: 35
        },
        {
          name: "鮪魚蛋",
          price: 35
        },
        {
          name: "豬排蛋",
          price: 45
        },
        {
          name: "香雞蛋",
          price: 45
        },
        {
          name: "燻雞蛋",
          price: 45
        },
        {
          name: "腓力蛋",
          price: 45
        },
        {
          name: "鮮蝦蛋",
          price: 45
        },
        {
          name: "鱈魚蛋",
          price: 45
        },
        {
          name: "總匯",
          price: 55
        },
        {
          name: "德式香腸蛋",
          price: 55
        },
        {
          name: "雞腿蛋",
          price: 55
        },
        {
          name: "原味卡啦雞腿蛋",
          price: 55
        },
        {
          name: "辣味卡啦雞腿蛋",
          price: 55
        },
        {
          name: "韓式勁辣雞腿蛋",
          price: 65
        },
        {
          name: "牛肉蛋",
          price: 65
        }
      ],
      // 乳酪餅
      level6: [
        {
          name: "煎蛋",
          price: 30
        },
        {
          name: "起司蛋",
          price: 40
        },
        {
          name: "漢堡肉蛋",
          price: 40
        },
        {
          name: "火腿肉蛋",
          price: 40
        },
        {
          name: "培根蛋",
          price: 40
        },
        {
          name: "肉鬆蛋",
          price: 40
        },
        {
          name: "鮪魚蛋",
          price: 40
        },
        {
          name: "豬排蛋",
          price: 45
        },
        {
          name: "香雞蛋",
          price: 45
        },
        {
          name: "燻雞蛋",
          price: 45
        },
        {
          name: "腓力蛋",
          price: 45
        },
        {
          name: "鮮蝦蛋",
          price: 45
        },
        {
          name: "鱈魚蛋",
          price: 45
        },
        {
          name: "總匯",
          price: 50
        },
        {
          name: "德式香腸蛋",
          price: 50
        },
        {
          name: "雞腿蛋",
          price: 50
        },
        {
          name: "原味卡啦雞腿蛋",
          price: 50
        },
        {
          name: "辣味卡啦雞腿蛋",
          price: 50
        },
        {
          name: "韓式勁辣雞腿蛋",
          price: 60
        },
        {
          name: "牛肉蛋",
          price: 60
        }
      ],
      // 鬆餅
      level7: [
        {
          name: "煎蛋",
          price: 35
        },
        {
          name: "起司蛋",
          price: 40
        },
        {
          name: "漢堡肉蛋",
          price: 40
        },
        {
          name: "火腿肉蛋",
          price: 40
        },
        {
          name: "培根蛋",
          price: 40
        },
        {
          name: "肉鬆蛋",
          price: 40
        },
        {
          name: "鮪魚蛋",
          price: 40
        },
        {
          name: "豬排蛋",
          price: 50
        },
        {
          name: "香雞蛋",
          price: 50
        },
        {
          name: "燻雞蛋",
          price: 50
        },
        {
          name: "腓力蛋",
          price: 50
        },
        {
          name: "鮮蝦蛋",
          price: 50
        },
        {
          name: "總匯",
          price: 60
        },
        {
          name: "德式香腸蛋",
          price: 60
        },
        {
          name: "雞腿蛋",
          price: 60
        },
        {
          name: "原味卡啦雞腿蛋",
          price: 60
        },
        {
          name: "辣味卡啦雞腿蛋",
          price: 60
        },
        {
          name: "韓式勁辣雞腿蛋",
          price: 70
        },
        {
          name: "牛肉蛋",
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
      },
      customPrice: {
        // 類別是套餐
        // 客製化加點區會存在customPrice，例：一號餐的漢堡
        name: "",
        price: 0
      },
      drink: {
        // 單點飲料時會存在這裡
        name: "",
        price: 0
      },
      comboDrink: {
        // 套餐飲料選的冰塊會存在這裡
        temperature: "冰的"
      }
    };
  },
  methods: {
    back() {
      this.$router.push("/");
      this.$store.dispatch("switchShoppingCart", false);
    },
    loop(items, name) {
      // items = comboBeverage
      // name = 豆漿紅茶（大）

      this[items].forEach(item => {
        if (item.name == name) {
          // 勾選飲料或配料的價格
          this.addon[items == "comboBeverage" ? "beverage" : "item"] =
            item.price;
        }

        if (this.item.combo) {
          // 試算價格 = 套餐價格 + 加點飲料

          this.trialPrice =
            this.item.price + this.addon["item"] + this.addon["beverage"];
        } else {
          // 試算價格 = 原價 + 加點飲料 + 加點配料
          this.trialPrice =
            this.originPrice + this.addon["beverage"] + this.addon["item"];
        }
      });
    },
    checkAddonItem(radio) {
      // 檢查加點項目是否要加價
      // 當User change radio時會試算價格，並更新到trialPrice上

      if (radio == "firstRadio") {
        this.loop(this.price, this.firstRadio);
      } else {
        if (radio == "drinkRadio") {
          this.showComboDrink = !this.showComboDrink;
        }

        this.loop("comboBeverage", this[radio]);
      }
    },
    level(title) {
      switch (title) {
        case "吐司":
        case "蛋餅":
          this.price = "level1";
          return this.level1;

        case "漢堡":
          this.price = "level2";
          return this.level2;
        case "大亨堡":
          this.price = "level3";
          return this.level3;

        case "捲餅":
          this.price = "level4";
          return this.level4;

        case "捲餅":
          this.price = "level6";
          return this.level6;

        case "西式燒餅":
          this.price = "level5";
          return this.level5;
        case "乳酪餅":
          this.price = "level6";
          return this.level6;
        case "鬆餅":
          this.price = "level7";
          return this.level7;
        default:
          console.log("no level price");
          break;
      }
    },
    addToCart() {
      let temp = {
        title: this.item.title, // 擷取冒號前的餐點名稱
        subtitle: this.item.subtitle || "",
        price: this.item.price,
        msg: this.item.msg || "",
        cartItemTitle: this.item.cartItemTitle
      };

      switch (this.item.type) {
        case "套餐":
          // 將套餐的標題簡化成 x號餐
          // 例：9號餐：好初的鐵板麵 => 9號餐
          temp.title = this.item.title.split("：")[0];

          // 如果是套餐裡面的一號餐、二號餐
          // 便另外算出加點選項的價格
          if (
            this.item.title.includes("1號餐") ||
            this.item.title.includes("2號餐") ||
            this.comboSevenAndEight
          ) {
            // 1號餐、2號餐有客製化選項，價格與品項皆存在customPrice
            temp.title += `/${this.customPrice.name}`;
            temp.price += this.customPrice.price;

            this.comboBeverage.forEach(drink => {
              if (drink.name === this.drinkRadio) {
                temp.title += `＋${this.comboDrink.temperature}${drink.name}`;
                temp.price += drink.price;
              }
            });
          } else {
            // 其他套餐（非一號餐、二號餐）
            this.comboBeverage.forEach(drink => {
              if (drink.name === this.drinkRadio) {
                temp.title += `＋${drink.name}`;
                temp.price += drink.price;
              }
            });
          }
          break;

        case "飲料":
          temp.title = this.drink.name;
          // 飲料價格 = 原價 + 看使用者選中杯還是大杯另外加錢
          temp.price = this.item.price + this.drink.price;

          break;

        case "漢吐蛋":
          // 類別是漢堡吐司蛋餅的話，
          // 便從 level 找到符合對應的價格
          this[this.price].forEach(item => {
            if (item.name === this.firstRadio) {
              temp.title = `${item.name}${temp.title}`;
              temp.price += item.price;
            }
          });
          break;
        case '甜吐司':
          temp.title = `${this.customPrice.name}${temp.title}`;
          break;

        default:
          temp.title = this.item.title;
          temp.price = this.item.price;
          break;
      }

      // this.checkAddonItem();

      console.log("temp", temp);

      this.$store.dispatch("addToCart", temp);
      this.$toast.success("加入購物車成功");
    },
    checkBeveragePrice(item) {
      // 針對是不是套餐，調整飲料價格
      // 如果是套餐
      var arr = [];
      if (item.combo) {
        this.comboBeverage = this.beverage.map(drink => {
          if (drink.name.includes("中")) {
            // 點套餐、飲料是中杯，飲品0元
            if (drink.price >= 30) {
              // 鮮奶茶、研磨咖啡、鮮奶咖啡 原價-10$
              drink.price -= 10;
            } else if (drink.price > 20) {
              drink.price -= 15;
            } else if (drink.price == 20) {
              // 檸檬汁、檸檬紅茶、柳橙汁、柳橙紅茶
              drink.price += 5;
            } else {
              // [套餐] 中杯不用補差額、大杯補五塊
              // 紅茶、奶茶、豆漿、米漿、薏仁漿、豆漿紅茶
              drink.price = 0;
            }
          } else if (drink.name.includes("大")) {
            // 點套餐、飲料是大杯，飲品折10元
            if (drink.price >= 30) {
              // 鮮奶茶、研磨咖啡、鮮奶咖啡 原價-10$
              drink.price -= 10;
            } else if (drink.price == 25) {
              // 檸檬汁、檸檬紅茶、柳橙汁、柳橙紅茶
              // 大杯補十塊
              drink.price += 10;
            } else if (drink.price == 20) {
              drink.price -= 15;
            } else if (drink.price > 20) {
              drink.price -= 10;
            }
          }

          var temp = {
            name: drink.name,
            price: drink.price
          };

          return temp;
        });

        arr.push(temp);
      } else {
        // 如果不是套餐，照比原來價格算
        return this.beverage;
      }
    },
    checkCustomPrice(order) {
      console.log(order)
      // 客製化選單最後選的菜會用order回傳
      // 例：order: {name: '鮪魚蛋漢堡', price: 30}
      this.customPrice.price = order.price;
      this.customPrice.name = order.name;

      this.addon.item = order.price;

      switch (this.item.type) {
        case '甜吐司':
          this.trialPrice = this.item.price;
          break;

        case '套餐':
          // 7號餐、8號餐價格
          // 1號餐、2號餐價格
          this.trialPrice = this.originPrice + order.price + this.addon["beverage"];
          break;
      }
      

    },
    checkDrinkNotes(order) {
      // 飲料備註添加到訂單上
      // 飲料價錢新增到試算價格上
      // 中杯大杯、溫的冰的
      console.log(order);
      this.drink.name = order.name;
      this.drink.price = order.price;

      // let temp = order.name;
      this.addon.item = order.price;

      // 試算價格
      this.trialPrice = this.originPrice + this.addon.item;
    },
    closePopupComboDrink() {
      console.log('close')
      console.log(this.comboDrink.temperature);
    }
  },
  created() {
    // 品項是飲料就取得飲料價格，若不是飲料，從0元算
    this.originPrice = this.item.drink || this.item.combo ? this.item.price : 0;

    switch (this.item.type) {
      case "套餐":
        this.trialPrice = this.item.combo ? this.item.price : this.originPrice;
        break;
      default:
        this.trialPrice = this.item.price;
        break;
    }
    this.checkBeveragePrice(this.item);
  }
};
</script>

<style lang="scss">
.item {
  .item-subtitle {
    span {
      font-size: 12px;
    }
  }
  .van-radio__label {
    font-weight: 300;
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
  .price {
    margin: 1rem;
    text-align: left;
  }
}
</style>