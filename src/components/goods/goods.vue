<template>
  <div id="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="menu-item">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foots-wrapper">
      <ul>
        <li v-for="(good,index) in goods" :key="index" class="foot-list">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li v-for="(food,key) in good.foods" :key="key" class="food-item border-1px">
              <div class="icon">
                <img width="57" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import url("./less/goods");
</style>
<script>
import Datas from "../../../static/data.json";
export default {
  data() {
    return {
      goods: Datas.goods
    };
  },
  created(){
    this.classMap=['decrease','discount','special','guarantee','invoice'];
    console.log(this.goods);
  }
};
</script>


