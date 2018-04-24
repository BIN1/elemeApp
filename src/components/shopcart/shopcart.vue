<template>
  <div id="shopcart">
      <div class="content">
          <div class="content-left">
              <div class="logo-wrapper">
                  <div class="logo" :class="{'logo-active':totalCount}">
                      <i class="icon-cart iconfont"></i>
                  </div>
                  <div class="num" v-show="totalCount>0">{{totalCount}}</div>
              </div>
              <div class="price" :class="{'highlight-price':totalPrice>0}">
                  ¥{{totalPrice}}
              </div>
              <div class="desc">
                  另需配送费¥{{delivaryPrice}}元
              </div>
          </div>
          <div class="content-right">
              <div class="pay" :class="payClass">
                  {{padDesc}}
              </div>
          </div>
      </div>
  </div>
</template>
<style lang="less" scoped>
    @import url('./shopcart');
</style>
<script>
export default {
    props: {
        delivaryPrice:{
            type:Number,
            default:0
        },
        minPrice:{
            type:Number,
            default:0
        },
        selectFoods:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    computed:{
        totalPrice(){
            let vm=this;
            let total=0;
            vm.selectFoods.forEach((food) => {
                total+=food.price*food.count;
            });
            return total;
        },
        totalCount(){
            let count=0;
            let vm=this;
            vm.selectFoods.forEach((food) => {
                count+=food.count;
            });
            return count;
        },
        padDesc(){
            let vm=this;
            if(vm.totalPrice===0){
                return `¥${vm.minPrice}元起送`;
            }else if(vm.totalPrice<vm.minPrice){
                let diff=vm.minPrice-vm.totalPrice;
                return `还差¥${diff}元起送`;
            }else{
                return `去结算`;
            }
        },
        payClass(){
            let vm=this;
            if(vm.totalPrice<vm.minPrice){
                return 'not-enough'
            }else{
                return 'enough'
            }
        }
    }
}
</script>


