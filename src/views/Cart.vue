<template>
  <div class="shopping-cart">
    <div>
      <van-sticky>
        <van-nav-bar @click-left="back" title="早起鳥兒有早餐吃" left-text="返回" left-arrow></van-nav-bar>
      </van-sticky>

      <div class="list">
        <ul>
          <li v-for="(item, i) in list" :key="i + '-cart'">
            <div class="first">
              <div class="list-price">
                <van-icon name="ecard-pay" />
                <br />
                NT${{item.price}}
              </div>
              <div class="list-info">
                <h4>{{item.title}}</h4>
                <span>{{item.desc}}</span>
                <!-- <span>{{item.count}}</span> -->
              </div>
              <div class="close" @click="removeItem(item, i)">
                <van-icon name="clear" />
              </div>
            </div>

            <div class="msg" v-if="item.msg">
              <span>備註</span>
              {{item.msg}}
            </div>
          </li>
        </ul>
      </div>

      <div class="submit-bar" v-if="list.length > 0">
        <div class="submit-bar__text">
          <span>總計</span>
          <span class="submit-bar__text__price">NT${{total}}</span>
        </div>
        <button class="submit-bar__button" @click="showActionSheet=true">
          <span>明天的早餐有著落啦</span>
        </button>
      </div>

      <div class="submit-bar" v-else>
        <div class="submit-bar__text">
          <span>總計</span>
          <span class="submit-bar__text__price">NT${{total}}</span>
        </div>
        <button class="submit-bar__button" :disabled="true" @click="showActionSheet=true">
          <span>這裡沒有任何東西</span>
        </button>
      </div>

      <van-action-sheet @cancel="cancelActionSheet" v-model="showActionSheet" title="明天的早餐有著落啦">
        <div class="content">
          <van-form>
            <van-field
              v-model="username"
              placeholder="名字"
              :rules="[{ required: true, message: '請告訴桃子你是誰' }]"
            />
            <div style="margin: 16px;">
              <button @click="order" class="submit-btn">下訂單</button>
            </div>
          </van-form>
        </div>
      </van-action-sheet>

      <van-overlay :show="loading">
        <van-loading size="24px" vertical>請稍候...</van-loading>
      </van-overlay>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Cart",
  props: ["list"],
  data() {
    return {
      showActionSheet: false,
      username: "",
      url:
        "https://script.google.com/macros/s/AKfycbwPulu26xB4-ctjcf4XKe4JaY7pR5gvrkCqhgPIYgu7Aqb_V4OC/exec",
      loading: false,
      all: 0
    };
  },
  computed: {
    total() {
      var sum = 0;
      this.list.forEach(item => {
        sum += item.price;
      });
      this.all = sum;
      return sum;
    }
  },
  methods: {
    submit() {},
    back() {
      this.$store.dispatch("switchShoppingCart", false);
      this.$router.go(-1);
    },
    order() {
      if (!this.username) return;

      this.loading = true;
      this.cancelActionSheet();

      // 取得今天日期
      let today = this.$moment().format("YYYY/MM/DD");
      var arrTitle = [];
      var arrSubtitle = [];
      var arrDesc = [];
      var arrMsg = [];

      this.list.forEach(item => {
        arrTitle.push(item.title);
        arrSubtitle.push(item.subtitle);
        arrDesc.push(item.desc);
        arrMsg.push(item.msg);
      });

      axios
        .get(
          `${this.url}?time=${today}&title=${arrTitle}&subtitle=${arrSubtitle}&desc=${arrDesc}&price=${this.all}&msg=${arrMsg}&name=${this.username}`
        )
        .then(response => {
          this.loading = false;
          console.log(response);
          if (response.data == "成功") {
            this.$dialog.alert({
              message: "訂購桃子早餐成功啦，明天記得來11F領取喔"
            });
            // 清除購物車
            this.$store.dispatch("clearCart");
          } else {
            this.$dialog.alert({
              message: "訂購失敗 Sorry啦" + response.data
            });
          }
        });
    },
    calTotal() {
      this.list.forEach(item => {
        this.total += item.price;
      });
    },
    removeItem(item, index) {
      this.$store.dispatch("removeCart", item, index);
    },
    cancelActionSheet() {
      this.showActionSheet = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.shopping-cart {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f7f8fa;
}

.list {
  margin: 1rem;
  ul {
    li {
      padding: 0.6rem;
      background: white;
      border-radius: 10px;
      margin-bottom: 1rem;
  
      border-left: 3px solid #ff6034;
      box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
    }

    .first {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
    }

    .msg {
      border-top: 1px solid lightgray;
      padding: 1rem;
      span {
        font-size: 14px;
    color: #545454;
      }
    }
  }

  .list-price {
    flex: 1;
    border-right: 1px solid lightgray;
  }

  .list-info {
    flex: 3;
    text-align: left;
    line-height: 24px;
    padding-left: 1rem;

    h4 {
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 1px;
    }

    span {
      font-size: 14px;
      color: rgb(84, 84, 84);
    }
  }
}
</style>