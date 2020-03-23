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
                <!-- <h6>${{item.price}}</h6> -->
              </li>
            </router-link>
          </ul>
        </div>
      </van-tab>

      <van-tab title="甜吐司">
        <div class="box">
          <h2>甜吐司</h2>
          <ul>
            <router-link
              v-for="(item,i) in list7"
              :key="i + 'menu7'"
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

    <footer>
      <div class="box">
        <h2>桃子早午餐</h2>
        <ul>
          <li>萬華區德昌街74號1F</li>
          <li>營業時間 0530-1400</li>
          <li>訂購專線 02-2303-7808</li>
        </ul>
      </div>
      
    </footer>
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
          subtitle:
            "大俠最愛吃的漢堡又來啦，記得要選漢堡口味喔，附薯條、中杯飲品",
          price: 25,
          withBread: false,
          type: "套餐"
        },
        {
          title: "2號餐：Still The Same 大亨堡",
          subtitle:
            "還是沒有變，如果說什麼是你記憶中的大亨堡呢？莫過於7-11的熱狗大亨堡了吧，點一道嘗嘗你記憶中的味道，附薯條、中杯飲品",
          price: 25,
          withBread: false,
          type: "套餐"
        },
        {
          title: "3號餐：我只是一隻小小小小雞🐔",
          subtitle:
            "就是那隻超香的雞腿，沒有配漢堡也沒有配吐司，就是雞腿一隻，不要誤會了，卡拉雞腿、附薯條、中杯飲品",
          price: 55,
          withBread: false,
          type: "套餐"
        },
        {
          title: "4號餐：營養早餐標配",
          subtitle:
            "最近缺營養？吃營養早餐就對啦，蛋兩顆、火腿、熱狗兩支，附中杯飲品",
          price: 55,
          withBread: false,
          type: "套餐"
        },
        {
          title: "5號餐：吃我的蘿蔔糕",
          subtitle:
            "豐富你的味蕾，從小陪你長大的經典蘿蔔糕，吃一口安心，吃一口家，蘿蔔糕+蛋+熱狗，附薯條、中杯飲品",
          price: 55,
          withBread: false,
          type: "套餐"
        },
        {
          title: "6號餐：麥克雞套餐",
          subtitle:
            "是誰搶走了我的麥克風？沒關係我還有我的麥克雞🐔咕咕～麥克雞6塊，附薯條、中杯飲品",
          price: 55,
          withBread: false,
          type: "套餐"
        },
        {
          title: "7號餐：厚片培根初起乃",
          subtitle: "厚片培根初起乃就對了，啊還會附上薯條、中杯飲品",
          price: 55,
          withBread: false,
          type: "套餐"
        },
        {
          title: "8號餐：超級滿足大套餐",
          subtitle:
            "有麵包有蛋又有肉還有小熱狗，你還有什麼不滿足的？薄片、蛋、豬排、熱狗，附中杯飲品",
          price: 55,
          withBread: false,
          type: "套餐"
        },
        {
          title: "9號餐：好初的鐵板麵",
          subtitle:
            "這是我們賣最好最經典的餐點，推薦都是多餘的，如果你喜歡閉著眼睛點準沒錯，鐵板麵、蛋、豬排，附中杯飲品",
          price: 70,
          withBread: false,
          type: "套餐"
        },
        {
          title: "10號餐：宮保鐵板麵",
          subtitle:
            "你如果吃膩鐵板麵，可以試試宮保鐵板麵啊，試了不用錢，不試怎麼成吃貨，宮保鐵板麵、蛋、豬排，附中杯飲品",
          price: 80,
          withBread: false,
          type: "套餐"
        }
      ],
      list2: [
        {
          title: "吐司",
          subtitle: "我曾經跨過山和大海，也穿過人山人海，每天吃一片吐司，才知道平凡就是這麼簡單",
          price: 0,
          withBread: true,
          type: "漢吐蛋"
        },
        {
          title: "漢堡",
          subtitle: "每天吃著差不多的早餐、差不多的中餐，差不多的時間去上班，差不多該換個口味了，差不多可以試試不同口味的漢堡",
          price: 0,
          withBread: true,
          type: "漢吐蛋"
        },
        {
          title: "大亨堡",
          subtitle: " 我家的門被自己反鎖，鑰匙掉了鑰匙掉了誰來救我，沒人救我只好點大亨堡來吃",
          price: 0,
          withBread: true,
          type: "漢吐蛋"
        },
        {
          title: "蛋餅",
          subtitle: "那幾個愛過我的窮小子，沒辦法為了每天都吃好吃蛋餅而堅持，你呢？我相信你懂。",
          price: 0,
          withBread: true,
          type: "漢吐蛋"
        },
        {
          title: "捲餅",
          subtitle: "涉世未深，做人好難，還是吃個捲餅吧。",
          price: 0,
          withBread: true,
          type: "漢吐蛋"
        },
        {
          title: "西式燒餅",
          subtitle: "籠罩在暴風圈蓄勢待發的西式燒餅，準備給你燃燒不停的熱情",
          price: 0,
          withBread: true,
          type: "漢吐蛋"
        },
        {
          title: "乳酪餅",
          subtitle: "只要今天比昨天進步了一點點，今天就可以吃乳酪餅！",
          price: 0,
          withBread: true,
          type: "漢吐蛋"
        },
        {
          title: "鬆餅",
          subtitle: "我就這樣告別山下的家，朝向好吃的鬆餅出發",
          price: 0,
          withBread: true,
          type: "漢吐蛋"
        }
      ],
      list3: [
        {
          title: "鮪魚乳酪厚片",
          subtitle: "深海鮪魚最相思",
          price: 50,
          withBread: false,
          noRadio: true, // 此參數關係到button disabled
          type: "乳酪厚片"
        },
        {
          title: "火腿乳酪厚片",
          subtitle: "就是要吃加工食品",
          price: 50,
          withBread: false,
          noRadio: true,
          type: "乳酪厚片"
        },
        {
          title: "培根乳酪厚片",
          subtitle: "培根乳酪厚片",
          price: 50,
          withBread: false,
          noRadio: true,
          type: "乳酪厚片"
        },
        {
          title: "豬排乳酪厚片",
          subtitle: "台灣的豬超級健康的啦",
          price: 60,
          withBread: false,
          noRadio: true,
          type: "乳酪厚片"
        },
        {
          title: "燻雞乳酪厚片",
          subtitle: "燻雞口味",
          price: 60,
          withBread: false,
          noRadio: true,
          type: "乳酪厚片"
        },
        {
          title: "雞腿乳酪厚片",
          subtitle: "雞腿口味",
          price: 65,
          withBread: false,
          noRadio: true,
          type: "乳酪厚片"
        },
        {
          title: "原味卡啦雞腿乳酪厚片",
          subtitle: "雞腿口味",
          price: 65,
          withBread: false,
          noRadio: true,
          type: "乳酪厚片"
        },
        {
          title: "辣味卡啦雞腿乳酪厚片",
          subtitle: "雞腿口味",
          price: 65,
          withBread: false,
          noRadio: true,
          type: "乳酪厚片"
        },
      ],
      list4: [
        {
          title: "夏威夷披薩",
          subtitle: "不用去夏威夷就吃得到",
          price: 30,
          withBread: false,
          noRadio: true,
          type: "披薩"
        },
        {
          title: "總匯披薩",
          subtitle: "要營養吃總匯",
          price: 30,
          withBread: false,
          noRadio: true,
          type: "披薩"
        }
      ],
      list5: [
        {
          title: "兩支熱狗",
          subtitle: "各位觀眾！兩支熱狗",
          price: 20,
          withBread: false,
          noRadio: true,
          type: "單點"
        },
        {
          title: "荷包蛋",
          subtitle: "天天吃蛋營養好健康",
          price: 10,
          withBread: false,
          noRadio: true,
          type: "單點"
        },
        {
          title: "豬排肉",
          subtitle: "就是豬排肉",
          price: 20,
          withBread: false,
          noRadio: true,
          type: "單點"
        },
        {
          title: "煎餃8顆",
          subtitle: "是煎餃，不是鍋貼",
          price: 20,
          withBread: false,
          noRadio: true,
          type: "單點"
        },
        {
          title: "雞球12顆",
          subtitle: "一口吃下去的經典雞球",
          price: 30,
          withBread: false,
          noRadio: true,
          type: "單點"
        },
        {
          title: "薯條",
          subtitle: "美式餐廳都有的薯條",
          price: 20,
          withBread: false,
          noRadio: true,
          type: "單點"
        },
        {
          title: "薯餅兩片",
          subtitle: "我還是一樣，像波希米亞每天早上要吃薯餅兩片",
          price: 30,
          withBread: false,
          noRadio: true,
          type: "單點"
        },
        {
          title: "麥克雞 6塊",
          subtitle: "我是麥克王子",
          price: 30,
          withBread: false,
          noRadio: true,
          type: "單點"
        },
        {
          title: "地瓜餅",
          subtitle: "就是地瓜餅",
          price: 20,
          withBread: false,
          noRadio: true,
          type: "單點"
        },
        {
          title: "南瓜餅",
          subtitle: "就是南瓜餅",
          price: 20,
          withBread: false,
          noRadio: true,
          type: "單點"
        },
        {
          title: "包心地瓜球10顆",
          subtitle: "不是夜市看到的那種地瓜球，裡面有餡喔",
          price: 30,
          withBread: false,
          noRadio: true,
          type: "單點"
        },
        {
          title: "蘑菇鐵板麵",
          subtitle: "就是蘑菇鐵板麵",
          price: 40,
          withBread: false,
          noRadio: false,
          type: "單點"
        },
        {
          title: "黑胡椒鐵板麵",
          subtitle: "就是黑胡椒鐵板麵",
          price: 40,
          withBread: false,
          noRadio: false,
          type: "單點"
        },
        {
          title: "蘿蔔糕",
          subtitle: "總會在早餐店遇見蘿蔔糕，這裡也不意外，你知道的，熟悉的味道。",
          price: 30,
          withBread: false,
          noRadio: false,
          type: "單點"
        },
        {
          title: "蔥油餅",
          subtitle: "曾經在我眼前卻又消失不見，這是今天的第六遍，蔥油餅你在哪兒",
          price: 30,
          withBread: false,
          noRadio: false,
          type: "單點"
        },
        {
          title: "蔥抓餅",
          subtitle: "你知道的，就是蔥抓餅",
          price: 30,
          withBread: false,
          noRadio: false,
          type: "單點"
        },
      ],
      list6: [
        {
          title: "紅茶",
          subtitle: "你知道的身為一家早餐店，有賣紅茶是一件再正常不過的事。",
          price: 15,
          withBread: false,
          drink: true,
          type: "飲料"
        },
        {
          title: "奶茶",
          subtitle:
            "愛喝假奶的人不會喜歡喝的，嗯像是..Hobby、Hazel，我是說應該吧，我們的奶茶不加奶昔，只加純鮮奶",
          price: 15,
          withBread: false,
          drink: true,
          type: "飲料"
        },
        {
          title: "豆漿",
          subtitle:
            "Ｑ懂的最愛，不懂嗎沒關係Ｑ懂，跟上Ｑ董的潮流，早上總是要來杯大冰豆",
          price: 10,
          withBread: false,
          drink: true,
          type: "飲料"
        },
        {
          title: "檸檬汁",
          subtitle: "早上喝酸酸的檸檬汁，是仙女的最愛",
          price: 20,
          withBread: false,
          drink: true,
          type: "飲料"
        },
        {
          title: "檸檬紅茶",
          subtitle: "想要獨立特行？點檸檬紅茶，不會有人跟你搶的",
          price: 20,
          withBread: false,
          drink: true,
          type: "飲料"
        },
        {
          title: "柳橙汁",
          subtitle: "仙女的最愛",
          price: 20,
          withBread: false,
          drink: true,
          type: "飲料"
        },
        {
          title: "柳橙紅茶",
          subtitle: "就是柳橙＋紅茶的新發明",
          price: 20,
          withBread: false,
          drink: true,
          type: "飲料"
        },
        {
          title: "米漿",
          subtitle: "中式米漿好喝",
          price: 10,
          withBread: false,
          drink: true,
          type: "飲料"
        },
        {
          title: "豆漿紅茶",
          subtitle: "豆漿+紅茶蹦出的新滋味",
          price: 15,
          withBread: false,
          drink: true,
          type: "飲料"
        },
        {
          title: "薏仁漿",
          subtitle: "就是薏仁漿",
          price: 10,
          withBread: false,
          drink: true,
          type: "飲料"
        },
        {
          title: "鮮奶茶",
          subtitle: "就是鮮奶茶",
          price: 30,
          withBread: false,
          drink: true,
          type: "飲料"
        },
        {
          title: "研磨咖啡",
          subtitle: "精神缺氧，來杯黑咖啡",
          price: 30,
          withBread: false,
          drink: true,
          type: "飲料"
        },
        {
          title: "鮮奶咖啡",
          subtitle: "顧名思義就是拿鐵",
          price: 45,
          withBread: false,
          drink: true,
          type: "飲料"
        }
      ],
      list7: [
        { // 薄片10厚片25乳酪餅25鬆餅35
          title: "薄片",
          subtitle: "不要問我甜吐司為什麼有香蒜口味，可能桃子店長打從心底認為香蒜是甜的吧",
          price: 10,
          withBread: false,
          type: "甜吐司"
        },
        { 
          title: "厚片",
          subtitle: "厚片吐司們都聚集在這",
          price: 25,
          withBread: false,
          type: "甜吐司"
        },
        { 
          title: "乳酪餅",
          subtitle: "好初乳酪餅",
          price: 25,
          withBread: false,
          type: "甜吐司"
        },
        { 
          title: "鬆餅",
          subtitle: "誰早餐會吃鬆餅啊？我啊，是好初鬆餅",
          price: 35,
          withBread: false,
          type: "甜吐司"
        },
      ]
    };
  },
  methods: {
    saveMenu(item) {
      if (item.title.includes("號餐")) {
        item.combo = true;
      } else {
        item.combo = false;
      }

      // 餐點加到購物車的名稱，預設是餐點名稱
      // 此參數cartItemTitle是用來單點飲料時要修改名稱
      // Ex: 紅茶 => 加入購物車後會顯示：中杯溫紅茶
      item.cartItemTitle = item.title;
      // 存進Vuex
      this.$store.dispatch("addItem", item);
      console.log(this.$store.state);
    }
  }
};
</script>

<style>
</style>