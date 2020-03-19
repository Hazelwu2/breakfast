<template>
  <div v-if="!showCart">
    <van-tabs v-model="active" scrollspy sticky>
      <van-tab title="套餐">
        <div class="box">
          <h2>套餐</h2>
          <ul>
            <router-link
              v-for="(item,i) in list1"
              :key="i + 'menu1'"
              :to="{ name: 'Item', params: {item: i, title: item.title, subtitle: item.subtitle, desc: item.desc, price: item.price}}"
            >
              <li @click="saveMenu(item)">
                <h4>{{item.title}}</h4>
                <span class="subtitle">{{item.subtitle}}</span>
                <h6>${{item.price}}</h6>
              </li>
            </router-link>
          </ul>
        </div>
      </van-tab>
      <van-tab title="漢吐蛋">
        <div class="box">
          <h2>漢堡吐司蛋餅</h2>
          <ul>
            <router-link
              v-for="(item,i) in list2"
              :key="i + 'menu2'"
              :to="{ name: 'Item', params: {item: i, title: item.title, subtitle: item.subtitle, desc: item.desc, price: item.price}}"
            >
              <li @click="saveMenu(item)">
                <h4>{{item.title}}</h4>
                <span class="subtitle">{{item.subtitle}}</span>
                <h6>${{item.price}}</h6>
              </li>
            </router-link>
          </ul>
        </div>
      </van-tab>
      <van-tab title="乳酪厚片">
        <div class="box">
          <h2>乳酪厚片</h2>
          <ul>
            <router-link
              v-for="(item,i) in list3"
              :key="i + 'menu3'"
              :to="{ name: 'Item', params: {item: i, title: item.title, subtitle: item.subtitle, desc: item.desc, price: item.price}}"
            >
              <li @click="saveMenu(item)">
                <h4>{{item.title}}</h4>
                <span class="subtitle">{{item.subtitle}}</span>
                <h6>${{item.price}}</h6>
              </li>
            </router-link>
          </ul>
        </div>
      </van-tab>
      <van-tab title="單點類">
        <div class="box">
          <h2>單點</h2>
          <ul>
            <router-link
              v-for="(item,i) in list5"
              :key="i + 'menu4'"
              :to="{ name: 'Item', params: {item: i, title: item.title, subtitle: item.subtitle, desc: item.desc, price: item.price}}"
            >
              <li @click="saveMenu(item)">
                <h4>{{item.title}}</h4>
                <span class="subtitle">{{item.subtitle}}</span>
                <h6>${{item.price}}</h6>
              </li>
            </router-link>
          </ul>
        </div>
      </van-tab>
      <van-tab title="披薩">
        <div class="box">
          <h2>披薩</h2>
          <ul>
            <router-link
              v-for="(item,i) in list4"
              :key="i + 'menu4'"
              :to="{ name: 'Item', params: {item: i, title: item.title, subtitle: item.subtitle, desc: item.desc, price: item.price}}"
            >
              <li @click="saveMenu(item)">
                <h4>{{item.title}}</h4>
                <span class="subtitle">{{item.subtitle}}</span>
                <h6>$ {{item.price}}</h6>
              </li>
            </router-link>
          </ul>
        </div>
      </van-tab>


      <van-tab title="飲料">
        <div class="box">
          <h2>飲料</h2>
          <ul>
            <router-link
              v-for="(item,i) in list6"
              :key="i + 'menu6'"
              :to="{ name: 'Item', params: {item: i, title: item.title, subtitle: item.subtitle, desc: item.desc, price: item.price}}"
            >
              <li @click="saveMenu(item)">
                <h4>{{item.title}}</h4>
                <span class="subtitle">{{item.subtitle}}</span>
                <h6>$ {{item.price}}</h6>
              </li>
            </router-link>
          </ul>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  computed: {
    showCart() {
      return this.$store.state.showCart;
    }
  },
  data() {
    return {
      active: 0,
      list1: [
        {
          title: "1號餐：大俠愛吃漢堡包",
          subtitle: "大俠最愛吃的漢堡又來啦，記得要選漢堡口味喔，附薯條、中杯飲品",
          price: 25,
          withBread: false
        },
        {
          title: "2號餐：Still The Same 大亨堡",
          subtitle: "還是沒有變，如果說什麼是你記憶中的大亨堡呢？莫過於7-11的熱狗大亨堡了吧，點一道嘗嘗你記憶中的味道，附薯條、中杯飲品",
          price: 25,
          withBread: false
        },
        {
          title: "3號餐：我只是一隻小小小小雞🐔",
          subtitle: "就是那隻超香的雞腿，沒有配漢堡也沒有配吐司，就是雞腿一隻，不要誤會了，卡拉雞腿、附薯條、中杯飲品",
          price: 55,
          withBread: false
        },
        {
          title: "4號餐：營養早餐標配",
          subtitle: "最近缺營養？吃營養早餐就對啦，蛋兩顆、火腿、熱狗兩支，附中杯飲品",
          price: 55,
          withBread: false
        },
        {
          title: "5號餐：吃我的蘿蔔糕",
          subtitle: "豐富你的味蕾，從小陪你長大的經典蘿蔔糕，吃一口安心，吃一口家，蘿蔔糕+蛋+熱狗，附薯條、中杯飲品",
          price: 55,
          withBread: false
        },
        {
          title: "6號餐：麥克雞套餐",
          subtitle: "是誰搶走了我的麥克風？沒關係我還有我的麥克雞🐔咕咕～麥克雞6塊，附薯條、中杯飲品",
          price: 55,
          withBread: false
        },
        {
          title: "7號餐：厚片培根初起乃",
          subtitle: "厚片培根初起乃就對了，啊還會附上薯條、中杯飲品",
          price: 55,
          withBread: false
        },
        {
          title: "8號餐：超級滿足大套餐",
          subtitle: "有麵包有蛋又有肉還有小熱狗，你還有什麼不滿足的？薄片、蛋、豬排、熱狗，附中杯飲品",
          price: 55,
          withBread: false
        },
        {
          title: "9號餐：好初的鐵板麵",
          subtitle: "這是我們賣最好最經典的餐點，推薦都是多餘的，如果你喜歡閉著眼睛點準沒錯，鐵板麵、蛋、豬排，附中杯飲品",
          price: 55,
          withBread: false
        },
        {
          title: "10號餐：宮保鐵板麵",
          subtitle: "你如果吃膩鐵板麵，可以試試宮保鐵板麵啊，試了不用錢，不試怎麼成吃貨，宮保鐵板麵、蛋、豬排，附中杯飲品",
          price: 55,
          withBread: false
        }
      ],
      list2: [
        {
          title: "煎蛋",
          subtitle: "就是煎蛋",
          price:  20,
          withBread: true
        },
        {
          title: "起司蛋",
          subtitle: "就是起司蛋",
          price:  30,
          withBread: true
        },
        {
          title: "漢堡肉蛋",
          subtitle: "就是漢堡肉蛋",
          price:  30,
          withBread: true
        },
        {
          title: "火腿蛋",
          subtitle: "就是火腿蛋",
          price:  20,
          withBread: true
        },
        {
          title: "培根蛋",
          subtitle: "就是培根蛋",
          price:  30,
          withBread: true
        },
        {
          title: "肉鬆蛋",
          subtitle: "就是肉鬆蛋",
          price:  30,
          withBread: true
        },
        {
          title: "鮪魚蛋",
          subtitle: "就是鮪魚蛋",
          price:  30,
          withBread: true
        },
        {
          title: "豬排蛋",
          subtitle: "就是豬排蛋",
          price:  40,
          withBread: true
        },
        {
          title: "香雞蛋",
          subtitle: "就是香雞蛋",
          price:  40,
          withBread: true
        },
        {
          title: "燻雞蛋",
          subtitle: "就是燻雞蛋",
          price:  40,
          withBread: true
        },
        {
          title: "腓立蛋",
          subtitle: "就是腓立蛋",
          price:  40,
          withBread: true
        },
        {
          title: "鮮蝦蛋",
          subtitle: "就是鮮蝦蛋",
          price:  40,
          withBread: true
        },
        {
          title: "鱈魚蛋",
          subtitle: "就是鱈魚蛋",
          price:  40,
          withBread: true
        },
        {
          title: "總匯",
          subtitle: "就是總匯",
          price:  50,
          withBread: true
        },
        {
          title: "德式香腸蛋",
          subtitle: "就是德式香腸蛋",
          price:  45,
          withBread: true
        },
        {
          title: "雞腿蛋",
          subtitle: "就是雞腿蛋",
          price:  50,
          withBread: true
        },
        {
          title: "卡啦雞腿蛋",
          subtitle: "就是卡啦雞腿蛋",
          price:  50,
          withBread: true
        },
        {
          title: "韓式勁辣雞腿蛋",
          subtitle: "就是韓式勁辣雞腿蛋",
          price:  60,
          withBread: true
        },
      ],
      list3: [
        {
          title: "鮪魚乳酪厚片",
          subtitle: "深海鮪魚最相思",
          price: 50,
          withBread: false
        },
        {
          title: "火腿乳酪厚片",
          subtitle: "就是要吃加工食品",
          price: 50,
          withBread: false
        },
        {
          title: "豬排乳酪厚片",
          subtitle: "台灣的豬超級健康的啦",
          price: 60,
          withBread: false
        },
        {
          title: "燻雞乳酪厚片",
          subtitle: "燻雞口味",
          price: 60,
          withBread: false
        },
        {
          title: "雞腿乳酪厚片",
          subtitle: "雞腿口味",
          price: 65,
          withBread: false
        }
      ],
      list4: [
        {
          title: "夏威夷披薩",
          subtitle: "不用去夏威夷就吃得到",
          price: 30,
          withBread: false
        },
        {
          title: "總匯披薩",
          subtitle: "要營養吃總匯",
          price: 30,
          withBread: false
        }
      ],
      list5: [
        {
          title: "兩支熱狗",
          subtitle: "各位觀眾！兩支熱狗",
          price: 20,
          withBread: false
        },
        {
          title: "荷包蛋",
          subtitle: "天天吃蛋營養好健康",
          price: 10,
          withBread: false
        },
        {
          title: "豬排肉",
          subtitle: "就是豬排肉",
          price: 20,
          withBread: false
        },
        {
          title: "煎餃8顆",
          subtitle: "是煎餃，不是鍋貼",
          price: 20,
          withBread: false
        },
        {
          title: "一口雞",
          subtitle: "一口雞 12顆",
          price: 30,
          withBread: false
        },
        {
          title: "薯條",
          subtitle: "美式餐廳都有的薯條",
          price: 20,
          withBread: false
        },
        {
          title: "薯餅兩片",
          subtitle: "油亮亮的薯餅",
          price: 30,
          withBread: false
        },
        {
          title: "麥克雞 6塊",
          subtitle: "我是麥克王子",
          price: 30,
          withBread: false
        }
      ],
      list6: [
        {
          title: "紅茶",
          subtitle: "你知道的身為一家早餐店，有賣紅茶是一件再正常不過的事。",
          price: 15,
          withBread: false,
          drink: true,
        },
        {
          title: "奶茶",
          subtitle: "愛喝假奶的人不會喜歡喝的，嗯像是..Hobby、Hazel，我是說應該吧，我們的奶茶不加奶昔，只加純鮮奶",
          price: 15,
          withBread: false,
          drink: true,
        },
        {
          title: "豆漿",
          subtitle: "Ｑ懂的最愛，不懂嗎沒關係Ｑ懂，跟上Ｑ董的潮流，早上總是要來杯大冰豆",
          price: 10,
          withBread: false,
          drink: true,
        },
        {
          title: "檸檬汁",
          subtitle: "早上喝酸酸的檸檬汁，是仙女的最愛",
          price: 20,
          withBread: false,
          drink: true,
        },
        {
          title: "檸檬紅茶",
          subtitle: "想要獨立特行？點檸檬紅茶，不會有人跟你搶的",
          price: 20,
          withBread: false,
          drink: true,
        },
        {
          title: "柳橙汁",
          subtitle: "愛喝假奶的人不會喜歡喝的，因為我們的奶茶不加入奶昔，只加純鮮奶",
          price: 20,
          withBread: false,
          drink: true,
        },
        {
          title: "柳橙紅茶",
          subtitle: "就是柳橙＋紅茶的新發明",
          price: 20,
          withBread: false,
          drink: true,
        },
        {
          title: "米漿",
          subtitle: "中式米漿好喝",
          price: 10,
          withBread: false,
          drink: true,
        },
        {
          title: "豆漿紅茶",
          subtitle: "豆漿+紅茶蹦出的新滋味",
          price: 15,
          withBread: false,
          drink: true,
        },
        {
          title: "薏仁漿",
          subtitle: "就是薏仁漿",
          price: 10,
          withBread: false,
          drink: true,
        },
        {
          title: "鮮奶茶",
          subtitle: "就是鮮奶茶",
          price: 30,
          withBread: false,
          drink: true,
        },
        {
          title: "研磨咖啡",
          subtitle: "精神缺氧，來杯黑咖啡",
          price: 30,
          withBread: false,
          drink: true,
        },
        {
          title: "鮮奶咖啡",
          subtitle: "顧名思義就是拿鐵",
          price: 45,
          withBread: false,
          drink: true,
        },
      ],
    };
  },
  methods: {
    saveMenu(item) {
      if (item.title.includes('號餐')) {
        item.combo = true;
      } else {
        item.combo = false;
      }

      this.$store.dispatch("addItem", item);
    }
  }
};
</script>

<style>
</style>