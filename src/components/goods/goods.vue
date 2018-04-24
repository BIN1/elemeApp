<template>
  <div id="goods">
    <div class="menu-wrapper" ref="menuwrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text" :class="{'border-1px':currentIndex!==index}">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foots-wrapper" ref="footswrapper">
      <ul>
        <li v-for="(good,index) in goods" :key="index" class="foot-list foot-list-height" >
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
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
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
import BScroll from 'better-scroll';
export default {
  data() {
    return {
      goods: Datas.goods,
      listHeight:[],
      scrollY:0
    };
  },
  computed:{
    currentIndex(){
      let vm=this;
      for(let i=0;i<vm.listHeight.length;i++){
        let height1=vm.listHeight[i];
        let height2=vm.listHeight[i+1];
        if(!height2 || (vm.scrollY>=height1&&vm.scrollY<height2)){
          return i;
        }
      };
      return 0;
    }
  },
  created(){
    this.classMap=['decrease','discount','special','guarantee','invoice'];
    console.log(this.goods);
  },
  mounted(){
    let vm=this;
    vm.$nextTick(() => {
      vm._initScroll();
      vm._caculateHeight();
    })
  },
  methods: {
    selectMenu(index,event){
      let vm=this;
      if(!event._constructed){
        return;
      };
      let foodList=vm.$refs.footswrapper.getElementsByClassName('foot-list-height');
      let el=foodList[index];
      vm.footScroll.scrollToElement(el,300);
    },
    _initScroll(){
      let vm=this;
      vm.menuScroll=new BScroll(vm.$refs.menuwrapper,{
        click:true
      });
      vm.footScroll=new BScroll(vm.$refs.footswrapper,{
        probeType:3,    //实时监听滚动位置
      });
      vm.footScroll.on('scroll',(pos) => {
        vm.scrollY=Math.abs(Math.round(pos.y));
      })
    },
    _caculateHeight(){
      let vm=this;
      let foodList=vm.$refs.footswrapper.getElementsByClassName('foot-list-height');
      let height=0;
      vm.listHeight.push(height);
      for(let i=0;i<foodList.length;i++){
        let item=foodList[i];
        height+=item.clientHeight;
        vm.listHeight.push(height);
      };
    }
  }
};
</script>


