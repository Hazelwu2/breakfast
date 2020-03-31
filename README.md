# 桃子早餐

## Log
- 20200401
  - [Fix] 修正日期 324 => 2020/03/24 比對試算表日期
- 20200324 
  - [Fix] 點「辣椒蛋餅」會出現辣椒蛋餅蛋餅
  - [Add] 單點飲料新增「溫的」、「涼的」可選
  - [Add] 加Cookie 0.8天來查詢訂單、
  - [Fix] 修正查詢訂單：超過AM九點就查不到昨天的訂單，以九點當分界點當新的一天
  - [Fix] 送出訂單修正日期，以AM 9:00當作分界點，超過9:00跳日期
  - [Add] 修改奶茶、鮮奶茶文案，奶昔變奶精
  - [Fix] 修正套餐選主餐只選一種即可送出按鈕
  - [Fix] 煎餃8顆價格20$更正為30$
  
## Feature
- PM 23:00 - AM 09:00 無法提供訂餐
- 送出訂單後會存到Google試算表





## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
