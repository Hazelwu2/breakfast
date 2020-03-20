<template>
  <div>
    <div>
      <div class="item-subtitle text-left">
        {{item.title.includes('漢堡') ? '漢堡' : '大亨堡'}}要什麼口味呢？
        <span>
          <br />沒有看到你想要的？寫在備註，告訴桃子
        </span>
      </div>
      <van-panel>
        <van-radio-group @change="checkAddonItem" v-model="hanbergerRadio">
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
    list() {
      return this.item.title.includes('漢堡') ? 
              this.hanburgerList 
              : this.bigBiteList;
    }
  },
  data() {
    return {
      hanbergerRadio: 0,
      hanburgerList: [
        {
          name: "煎蛋漢堡",
          price: 25
        },
        {
          name: "起司蛋漢堡",
          price: 30
        },
        {
          name: "漢堡肉蛋漢堡30",
          price: 30
        },
        {
          name: "火腿蛋漢堡",
          price: 30
        },
        {
          name: "培根蛋漢堡",
          price: 30
        },
        {
          name: "肉鬆蛋漢堡",
          price: 30
        },
        {
          name: "鮪魚蛋漢堡",
          price: 30
        },
        {
          name: "豬排蛋漢堡",
          price: 40
        },
        {
          name: "香雞蛋漢堡",
          price: 40
        },
        {
          name: "燻雞蛋漢堡",
          price: 40
        },
        {
          name: "腓力蛋漢堡",
          price: 40
        },
        {
          name: "鮮蝦蛋漢堡",
          price: 40
        },
        {
          name: "總匯蛋漢堡",
          price: 40
        },
        {
          name: "德式香腸蛋漢堡",
          price: 45
        },
        {
          name: "雞腿蛋漢堡",
          price: 50
        },
        {
          name: "原味卡拉雞腿蛋漢堡",
          price: 50
        },
        {
          name: "辣味卡拉雞腿蛋漢堡",
          price: 50
        },
        {
          name: "韓式勁辣雞腿蛋漢堡",
          price: 60
        },
        {
          name: "牛肉蛋漢堡",
          price: 60
        }
      ],
      bigBiteList: [
        {
          name: "煎蛋大亨堡",
          price: 30
        },
        {
          name: "起司蛋大亨堡",
          price: 35
        },
        {
          name: "漢堡肉蛋大亨堡",
          price: 35
        },
        {
          name: "火腿蛋大亨堡",
          price: 35
        },
        {
          name: "培根蛋大亨堡",
          price: 35
        },
        {
          name: "肉鬆蛋大亨堡",
          price: 35
        },
        {
          name: "鮪魚蛋大亨堡",
          price: 35
        },
        {
          name: "豬排蛋大亨堡",
          price: 45
        },
        {
          name: "香雞蛋大亨堡",
          price: 45
        },
        {
          name: "燻雞蛋大亨堡",
          price: 45
        },
        {
          name: "腓力蛋大亨堡",
          price: 45
        },
        {
          name: "鮮蝦蛋大亨堡",
          price: 45
        },
        {
          name: "總匯蛋大亨堡",
          price: 45
        },
        {
          name: "德式香腸蛋大亨堡",
          price: 45
        },
        {
          name: "雞腿蛋大亨堡",
          price: 55
        },
        {
          name: "原味卡拉雞腿蛋大亨堡",
          price: 55
        },
        {
          name: "辣味卡拉雞腿蛋大亨堡",
          price: 55
        },
        {
          name: "韓式勁辣雞腿蛋大亨堡",
          price: 65
        },
        {
          name: "牛肉蛋大亨堡",
          price: 65
        }
      ]
    };
  },
  methods: {
    checkAddonItem() {
      // let temp;
      let order;
      this.list.forEach(item => {
        if (item.name == this.hanbergerRadio) {
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
};
</script>

<style>
</style>