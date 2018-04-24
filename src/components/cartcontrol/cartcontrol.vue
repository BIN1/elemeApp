<template>
  <div id="cartcontrol">
    <transition name="move">
        <div class="cart-decrease" v-show="food.count>0" @click="_decrease($event)">
            <i class="icon-jian-copy iconfont inner"></i>
        </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">
        {{food.count}}
    </div>
    <div class="cart-add" @click="addCart($event)">
        <i class="icon-add iconfont add"></i>
    </div>
  </div>
</template>
<style lang="less" scoped>
    @import url('./cartcontrol');
</style>

<script>
import Vue from 'vue';
export default {
  props: {
      food:{
          type:Object,
          default:{}
      }
  },
  methods: {
      addCart(event){
        let vm=this;
        if(!event._constructed){
            return;
        };
        if(!vm.food.count){
            Vue.set(vm.food,'count',1);
        }else{
            vm.food.count++;
        };
      },
      _decrease(event){
        let vm=this;
        if(!event._constructed){
            return;
        };
        vm.food.count--;
      }
  }
}
</script>

