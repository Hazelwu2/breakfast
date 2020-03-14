<template>
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
            <li>
              <h4>{{item.title}}</h4>
              <span>{{item.subtitle}}</span>
              <span>{{item.desc}}</span>
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
            v-for="(item,i) in list2"
            :key="i + 'menu1'"
            :to="{ name: 'Item', params: {item: i, title: item.title, subtitle: item.subtitle, desc: item.desc, price: item.price}}"
          >
            <li>
              <h4>{{item.title}}</h4>
              <span>{{item.subtitle}}</span>
              <span>{{item.desc}}</span>
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
            :key="i + 'menu1'"
            :to="{ name: 'Item', params: {item: i, title: item.title, subtitle: item.subtitle, desc: item.desc, price: item.price}}"
          >
            <li>
              <h4>{{item.title}}</h4>
              <span>{{item.subtitle}}</span>
              <span>{{item.desc}}</span>
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
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      show: false,
      list1: [
        {
          title: "1號餐",
          subtitle: "大俠愛吃漢堡寶",
          desc: "漢堡任選口味、附薯條、中杯飲品",
          price: 55
        },
        {
          title: "2號餐",
          subtitle: "大俠也愛大亨堡",
          desc: "大亨堡任選口味、附薯條、中杯飲品",
          price: 55
        },
        {
          title: "3號餐",
          subtitle: "卡拉雞腿",
          desc: "附薯條、中杯飲品",
          price: 55
        },
        {
          title: "4號餐",
          subtitle: "營養早餐 蛋兩顆、火腿、熱狗兩隻",
          desc: "附中杯飲品",
          price: 55
        },
        {
          title: "5號餐",
          subtitle: "蘿蔔糕+蛋+熱狗",
          desc: "附薯條、中杯飲品",
          price: 55
        },
        {
          title: "6號餐",
          subtitle: "麥克雞6塊",
          desc: "附薯條、中杯飲品",
          price: 55
        },
        {
          title: "7號餐",
          subtitle: "厚片、培根",
          desc: "附薯條、中杯飲品",
          price: 55
        },
        {
          title: "8號餐",
          subtitle: "薄片、蛋、豬排、熱狗",
          desc: "附中杯飲品",
          price: 55
        },
        {
          title: "9號餐",
          subtitle: "鐵板麵、蛋、豬排",
          desc: "附中杯飲品",
          price: 55
        },
        {
          title: "10號餐",
          subtitle: "宮保鐵板麵、蛋、豬排",
          desc: "附中杯飲品",
          price: 55
        }
      ],
      list2: [
        {
          title: "各位觀眾！兩支熱狗",
          subtitle: "兩支熱狗",
          price: 20
        },
        {
          title: "天天吃蛋營養好健康",
          subtitle: "荷包蛋",
          price: 10
        },
        {
          title: "就是豬排肉",
          subtitle: "豬排肉",
          price: 20
        },
        {
          title: "是煎餃，不是鍋貼",
          subtitle: "煎餃8顆",
          price: 20
        },
        {
          title: "一口雞 12顆",
          subtitle: "？？？？",
          price: 30
        },
        {
          title: "美式餐廳都有的薯條",
          subtitle: "薯條",
          price: 20
        },
        {
          title: "油亮亮的薯餅",
          subtitle: "薯餅兩片",
          price: 30
        },
        {
          title: "我是麥克王子",
          subtitle: "麥克雞 6塊",
          price: 30
        },
      ],
      list3: [
        {
          title: "深海鮪魚最相思",
          subtitle: "鮪魚乳酪厚片",
          price: 50
        },
        {
          title: "就是要吃加工食品",
          subtitle: "火腿乳酪厚片",
          price: 50
        },
        {
          title: "台灣的豬超級健康的啦",
          subtitle: "豬排乳酪厚片",
          price: 60
        },
        {
          title: "燻雞口味",
          subtitle: "燻雞乳酪厚片",
          price: 60
        },
        {
          title: "雞腿口味",
          subtitle: "雞腿乳酪厚片",
          price: 65
        },
      ],
    };
  }
};
</script>

<style>
</style>