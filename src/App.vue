<template>
  <div id="app">
    <van-tabs v-model="active" scrollspy sticky>
      <van-tab title="套餐">
        <div class="box">
          <h2>套餐</h2>
          <ul>
            <li>
              <h4>1號餐</h4>
              <span>漢堡任選口味+25元升級套餐</span>
              <span>附薯條、中杯飲品</span>
            </li>
            <li>
              <h4>2號餐</h4>
              <span>大亨堡任選口味+25元升級套餐</span>
              <span>附薯條、中杯飲品</span>
            </li>
            <li>
              <h4>3號餐</h4>
              <span>卡拉雞腿</span>
              <span>附薯條、中杯飲品</span>
            </li>
            <li>
              <h4>4號餐</h4>
              <span>營養早餐 蛋兩顆、火腿、熱狗兩隻</span>
              <span>附中杯飲品</span>
            </li>
            <li>
              <h4>5號餐</h4>
              <span>蘿蔔糕+蛋+熱狗</span>
              <span>附薯條、中杯飲品</span>
            </li>
            <li>
              <h4>6號餐</h4>
              <span>麥克雞6塊</span>
              <span>附薯條、中杯飲品</span>
            </li>
            <li>
              <h4>7號餐</h4>
              <span>厚片、培根</span>
              <span>附薯條、中杯飲品</span>
            </li>
            <li>
              <h4>8號餐</h4>
              <span>薄片、蛋、豬排、熱狗</span>
              <span>附中杯飲品</span>
            </li>
            <li>
              <h4>9號餐</h4>
              <span>鐵板麵、蛋、豬排</span>
              <span>附中杯飲品</span>
            </li>
            <li>
              <h4>10號餐</h4>
              <span>宮保鐵板麵、蛋、豬排</span>
              <span>附中杯飲品</span>
            </li>
          </ul>
        </div>
      </van-tab>
      <van-tab title="單點類">
        <div class="box">
          <h2>單點類</h2>
          <ul>
            <li>熱狗兩隻</li>
            <li>荷包蛋</li>
          </ul>
        </div>
      </van-tab>
      <van-tab title="乳酪厚片">
        <div class="box">
          <h2>乳酪厚片</h2>
          <ul>
            <li>鮪魚</li>
            <li>火腿</li>
          </ul>
        </div>
      </van-tab>
      <van-tab title="披薩">
        <div class="box">
          <h2>披薩類</h2>
          <div class="box__item">
            <div class="box__item__name">
              夏威夷披薩
            </div>
            <div class="box__item__price">
              55$
            </div>

          </div>
        </div>
      </van-tab>
    </van-tabs>

    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2
    };
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
