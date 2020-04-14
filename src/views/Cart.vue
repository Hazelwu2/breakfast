<template>
  <div class="shopping-cart">
    <div>
      <van-sticky v-if="isOpen">
        <van-nav-bar @click-left="back" title="早起鳥兒有早餐吃" left-text="返回" left-arrow></van-nav-bar>
      </van-sticky>
      <!-- 如果沒有開放點餐，顯示 2300-隔日0900時段不開放點單 -->
      <van-sticky v-else>
        <van-nav-bar @click-left="back" title="2300-隔日0900時段不開放點單" left-text="返回" left-arrow></van-nav-bar>
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
              </div>
              <div class="close" @click="removeItem(i)">
                <van-icon name="clear" />
              </div>
            </div>

            <div class="msg" v-if="item.msg">
              <span>備註 |</span>
              <span>{{item.msg}}</span>
            </div>
          </li>
        </ul>
      </div>

      <div v-if="list.length > 0">
        <div class="submit-bar">
          <van-goods-action-icon
            @click="checkOrder"
            style="padding-right: 1rem;"
            icon="cart-o"
            text="查看訂單"
          />
          <div class="submit-bar__text">
            <span>總計</span>
            <span class="submit-bar__text__price">NT${{total}}</span>
          </div>
          <button class="submit-bar__button" @click="showActionSheet=true"
            :disabled="!isOpen"
            :class=" {'close-order': !isOpen}">
            <span>明天的早餐有著落啦</span>
          </button>
        </div>
      </div>

      <div v-else>
        <div class="submit-bar">
          <van-goods-action-icon
            @click="checkOrder"
            style="padding-right: 1rem;"
            icon="cart-o"
            text="查看訂單"
          />
          <div class="submit-bar__text">
            <span>總計</span>
            <span class="submit-bar__text__price">NT${{total}}</span>
          </div>
          <button class="submit-bar__button" :disabled="true" @click="showActionSheet=true">
            <span>這裡沒有任何東西</span>
            <span v-if="!isOpen">0900-2300時段不開放點單喔</span>
          </button>
        </div>
      </div>

      <!-- 查詢訂單 Modal -->
      <van-popup
        v-model="showOrderModal"
        closeable
        close-icon="close"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <van-panel class="order-panel"  title="今天大家點了什麼" desc="早餐不知道吃什麼，決定今天來Cosplay學Hobby!">
          <div>
            <ul class="orderlist">
              <li class="orderlist__item" v-for="(record,i) in records" :key="i+'records'">
                <div class="orderlist__item__icon">
                  <van-icon size="2rem" name="comment-o" />
                  <van-tag class="orderlist__item__icon__tag d-block" plain>{{record['日期']}}</van-tag>
                </div>
                <div>
                  <ul>
                    <li v-for="(item,i) in record['餐點']" :key="i + '-order'">{{item}}</li>
                  </ul>
                </div>
                <div class="orderlist__footer" slot="footer">
                  <span class="d-block">$ {{record['價格']}}</span>

                  <span class="d-block">{{record['訂購人']}}</span>
                  <van-button
                    v-if="userName() == record['訂購人']"
                    @click="deleteOrder(record.ID)"
                    class="mt-5"
                    type="default"
                    size="mini"
                  >刪除</van-button>
                </div>
              </li>
            </ul>
          </div>
        </van-panel>

        <van-overlay :show="loading">
          <van-loading size="24px" vertical>請稍候...</van-loading>
        </van-overlay>
      </van-popup>

      <!-- 提交訂單 -->
      <van-action-sheet @cancel="cancelActionSheet" v-model="showActionSheet" title="明天的早餐有著落啦">
        <van-form>
          <van-field
            type="textarea"
            v-model="username"
            placeholder="名字"
            :rules="[{ required: true, message: '請告訴桃子你是誰' }]"
          />
        </van-form>
        <div class="content">
          <div style="margin: 16px;">
            <button @click="order" class="submit-btn">下訂單</button>
          </div>
        </div>
      </van-action-sheet>

      <van-overlay :show="loading">
        <van-loading size="24px" vertical>請稍候...</van-loading>
      </van-overlay>
    </div>
  </div>
</template>

<script>
import {setToken, getToken, removeToken} from '@/utils/auth';

import axios from "axios";
export default {
  name: "Cart",
  props: ["list"],
  data() {
    return {
      showActionSheet: false,
      showOrderModal: false,
      username: '',
      url:
        "https://script.google.com/macros/s/AKfycbwPulu26xB4-ctjcf4XKe4JaY7pR5gvrkCqhgPIYgu7Aqb_V4OC/exec",
      loading: false,
      all: 0,
      records: []
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
    },
    
    isOpen() {
      return this.$store.state.isOpen;
    }
  },
  methods: {
    userName() {
      return getToken();
    },
    submit() {},
    back() {
      this.$store.dispatch("switchShoppingCart", false);
      this.$router.go(-1);
    },
    order() {
      if (!this.username || !this.isOpen) return; // 沒有填寫名字、不開放點單，無法提交

      this.loading = true;
      this.cancelActionSheet();

      // 超過AM9 算隔日訂單
      let am9 = this.$moment().startOf('day').add(9, 'hour');
      let now = this.$moment();
      let today;
      
      if (now > am9) {
        today = this.$moment().add(1, 'day').format("YYYY/MM/DD");
      } else {
        today = this.$moment().format("YYYY/MM/DD");
      }

      var arrTitle = [];
      var arrSubtitle = [];
      var arrDesc = [];
      var arrMsg = [];

      this.list.forEach(item => {
        var temp;
        // 若無備註，移除備註文字
        if (!item.msg) {
          temp = `${item.title}`;
        } else {
          temp = `${item.title}，備註：${item.msg} `;
        }

        arrTitle.push(temp);
      });

      axios
        .get(
          `${this.url}?time=${today}&title=${arrTitle}&price=${this.all}&name=${this.username}&action=insert`
        )
        .then(response => {
          this.loading = false;

          if (response.data == "成功") {
            // 送交訂單成功，便將username存進cookie
            // 查詢訂單會根據cookie的username來顯示可不可以刪除
            this.$store.dispatch("addUserName", this.username);
            this.$dialog.alert({
              message: "訂購桃子早餐成功啦，餐點請明日九點半後的11F領取"
            });

            // let msg = `${today}，訂購：${arrTitle}，價格：${this.all}，訂購人：${this.username}`;
            // axios({
            //   methos: "get",
            //   url: `https://script.google.com/macros/s/AKfycbxaXv_bRTwJRh_GKPtys6Ae7-zgQjvf1611R57L9AOouHgZVWcG/exec?msg=${msg}`
            // })
            //   .then(res => {
            //     alert(res);
            //   })
            //   .catch(err => alert(err));

            // 清除購物車
            this.$store.dispatch("clearCart");
          } else {
            this.$dialog.alert({
              message: "訂購失敗 Sorry啦， " + response.data
            });
          }
        })
        .then(() => (this.loading = false))
        .catch(err => {
          this.loading = false;
          this.$dialog.alert({
            message: "訂購失敗 Sorry啦" + err
          });
        });
    },
    calTotal() {
      this.list.forEach(item => {
        this.total += item.price;
      });
    },
    removeItem(index) {
      this.$store.dispatch("removeCart", index);
    },
    cancelActionSheet() {
      this.showActionSheet = false;
    },
    checkOrder() {
      // 查詢訂單
      this.loading = true;

      // 以今日日期下去查詢
      let today = this.$moment().format('YYYY/MM/DD')
      
      var arrTitle = [];

      this.list.forEach(item => {
        var temp;
        // 若無備註，移除備註文字
        if (!item.msg) {
          temp = `${item.title}`;
        } else {
          temp = `備註：${item.msg} `;
        }

        arrTitle.push(temp);
      });

      axios
        .get(
          `${this.url}?time=${today}&action=read`
        )
        .then(res => {
          this.loading = false;
          this.showOrderModal = true;

          let pm9 = this.$moment().startOf('day').add(9, 'hour');
          let now = this.$moment();
          var today = this.$moment();
          
          // 取得今天日期
            // 如果超過早上九點 tomorrow
            // 沒有超過早上九點 today
          if (now > pm9) {
            // today = this.$moment().add(1, 'day').format("MMDD").split("0")[1];
            today = this.$moment().add(1, 'day').format("YYYY/MM/DD");
            
          } else {
            // today = this.$moment().format("MMDD").split("0")[1];
            today = this.$moment().format("YYYY/MM/DD");
          }
          
          console.log('today', today);
          if (res) {
            this.records = res.data.records.filter(item => {
              item["日期"] = this.$moment(item["日期"]).format("YYYY/MM/DD");
              return item["日期"] == today;
            });

            this.records = this.records.sort(function(a, b) {
              return b.ID - a.ID;
            });
            this.records.forEach(item => {
              item["餐點"] = item["餐點"].split(",");
              item["日期"] = this.$moment(item["日期"]).format('YYYY/MM/DD')
            });

          } else {
            this.$dialog.alert({
              message: "歹勢啦，查詢訂單失敗：" + res
            });
          }

        })
        .catch(err => {
          this.loading = false;
          this.$dialog.alert({
            message: "歹勢啦，查詢訂單失敗，錯誤原因：" + err
          });
        });
    },
    deleteOrder(id) {
      console.log("id: ", id);
      this.loading = true;
      axios
        .get(`${this.url}?id=${id}&action=delete`)
        .then(res => {
          if (res.data.result == "value deleted successfully") {
            this.$dialog.alert({
              message: "刪除成功"
            });
          } else {
            this.$dialog.alert({
              message: "刪除失敗"
            });
          }
        })
        .then(() => {
          this.checkOrder();
        })
        .catch(err => {
          this.loading = false;
          this.$dialog.alert({
            message: "發生了一場美麗的錯誤，" + err
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.shopping-cart {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f7f8fa;
  overflow: scroll;

  .van-goods-action-icon {
    font-size: 12px;
    letter-spacing: 1px;
  }
}

.list {
  margin: 1rem;
  margin-bottom: 8rem;
  ul {
    li {
      padding: 0.6rem;
      background: white;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      margin-bottom: 1rem;

      border-left: 3px solid #ff6034;
      box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
    }

    .first {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      padding-bottom: 1rem;
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

// 查詢訂單 CSS
.van-tag--danger {
  color: #ee0a24 !important;
}

.orderlist {
  &__item {
    padding: 20px 10px;
    border-radius: 5px;
    transition: all 0.35s ease;
    cursor: pointer;
    border-bottom: 1px solid #e0e6ed;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    &__icon {
      font-size: 2rem;
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &__tag {
        margin-top: 0.6rem;
      }
    }

    & > div {
      font-size: 13px;
      flex: 4;
      text-align: center;
    }

    &__footer {
      margin-top: 1rem;
      width: 100%;
      text-align: right;
    }
    span {
      color: #969799;
    }
  }

  .van-button__text {
    font-size: 12px;
  }

  .van-panel__footer {
    .van-button {
      margin-right: 5px;
      min-width: 60px;
      height: 30px;
      padding: 0 8px;
      font-size: 12px;
      line-height: 28px;
    }
  }
}
</style>