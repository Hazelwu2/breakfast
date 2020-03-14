<template>
  <div id="app">
    <van-tabs v-model="active" scrollspy sticky>
      <van-tab title="套餐">
        <div class="box">
          <h2>套餐</h2>
          <ul>
            <li>
              <h4>1號餐</h4>
              <!-- <span>漢堡任選口味+25元升級套餐</span> -->
              <span>大俠愛吃漢堡寶</span>
              <span>漢堡任選口味、附薯條、中杯飲品</span>
              <h6>$55</h6>
            </li>
            <li>
              <h4>2號餐</h4>
              <span>大俠也愛大亨堡</span>
              <span>大亨堡任選口味、附薯條、中杯飲品</span>
              <h6>$55</h6>
            </li>
            <li>
              <h4>3號餐</h4>
              <span>卡拉雞腿</span>
              <span>附薯條、中杯飲品</span>
              <h6>$55</h6>
            </li>
            <li>
              <h4>4號餐</h4>
              <span>營養早餐 蛋兩顆、火腿、熱狗兩隻</span>
              <span>附中杯飲品</span>
              <h6>$55</h6>
            </li>
            <li>
              <h4>5號餐</h4>
              <span>蘿蔔糕+蛋+熱狗</span>
              <span>附薯條、中杯飲品</span>
              <h6>$55</h6>
            </li>
            <li>
              <h4>6號餐</h4>
              <span>麥克雞6塊</span>
              <span>附薯條、中杯飲品</span>
              <h6>$55</h6>
            </li>
            <li>
              <h4>7號餐</h4>
              <span>厚片、培根</span>
              <span>附薯條、中杯飲品</span>
              <h6>$55</h6>
            </li>
            <li>
              <h4>8號餐</h4>
              <span>薄片、蛋、豬排、熱狗</span>
              <span>附中杯飲品</span>
              <h6>$55</h6>
            </li>
            <li>
              <h4>9號餐</h4>
              <span>鐵板麵、蛋、豬排</span>
              <span>附中杯飲品</span>
              <h6>$55</h6>
            </li>
            <li>
              <h4>10號餐</h4>
              <span>宮保鐵板麵、蛋、豬排</span>
              <span>附中杯飲品</span>
              <h6>$55</h6>
            </li>
          </ul>
        </div>
      </van-tab>
      <van-tab title="單點類">
        <div class="box">
          <h2>單點</h2>
          <ul>
            <li>
              <h4>各位觀眾！兩支熱狗</h4>
              <span>兩支熱狗</span>
              <h6>$20</h6>
            </li>
            <li>
              <h4>天天吃蛋營養好健康</h4>
              <span>荷包蛋</span>
              <h6>$10</h6>
            </li>
            <li>
              <h4>就是豬排肉</h4>
              <span>豬排肉</span>
              <h6>$20</h6>
            </li>
            <li>
              <h4>是煎餃，不是鍋貼</h4>
              <span>煎餃8顆</span>
              <h6>$20</h6>
            </li>
            <li>
              <h4>一口雞 12顆</h4>
              <span>？？？</span>
              <h6>$30</h6>
            </li>
            <li>
              <h4>美式餐廳都有的薯條</h4>
              <span>薯條</span>
              <h6>$20</h6>
            </li>
            <li>
              <h4>油亮亮的薯餅</h4>
              <span>薯餅兩片</span>
              <h6>$30</h6>
            </li>
            <li>
              <h4>麥克雞 6塊</h4>
              <span>麥克雞 6塊</span>
              <h6>$30</h6>
            </li>
          </ul>
        </div>
      </van-tab>
      <van-tab title="乳酪厚片">
        <div class="box">
          <h2>乳酪厚片</h2>
          <ul>
            <li>
              <h4>深海鮪魚最相思</h4>
              <span>鮪魚</span>
              <h6>$50</h6>
            </li>
            <li>
              <h4>就是要吃加工食品</h4>
              <span>火腿</span>
              <h6>$50</h6>
            </li>
            <li>
              <h4>培根口味</h4>
              <span>培根</span>
              <h6>$50</h6>
            </li>
            <li>
              <h4>豬排口味</h4>
              <span>豬排</span>
              <h6>$60</h6>
            </li>
            <li>
              <h4>燻雞口味</h4>
              <span>燻雞</span>
              <h6>$60</h6>
            </li>
            <li>
              <h4>雞腿口味</h4>
              <span>雞腿</span>
              <h6>$65</h6>
            </li>
            <li>
              <h4>卡拉雞腿口味</h4>
              <span>卡拉雞腿</span>
              <h6>$65</h6>
            </li>
            
          </ul>
        </div>
      </van-tab>
      <van-tab title="披薩">
        <div class="box">
          <h2>披薩</h2>
          <ul>
            <li>
              <h4>不用去夏威夷就吃得到</h4>
              <span>夏威夷披薩</span>
              <h6>$30</h6>
            </li>
            <li>
              <h4>要營養吃總匯</h4>
              <span>總匯披薩</span>
              <h6>$30</h6>
            </li>
            
          </ul>
        </div>
      </van-tab>
    </van-tabs>

    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2,
      show: false
    };
  },
  methods: {}
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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
