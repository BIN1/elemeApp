<template>
  <div id="shopcart">
    <div class="content">
        <div class="content-left" @click="toggleList">
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
    <transition enter-active-class="animated fadeInUp"
    leave-active-class="animated fadeOutDown">
        <div class="shopcart-list animated" v-show="listShow">
            <div class="list-wrapper">
                <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span class="empty" @click="empty">清空</span>
                </div>
                <div class="list-content" ref="listcontent">
                    <ul>
                        <li class="food" v-for="(selectFood,index) in selectFoods" :key="index">
                            <span class="name">{{selectFood.name}}</span>
                            <div class="price">
                                <span>¥{{selectFood.price*selectFood.count}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol  :food='selectFood'></cartcontrol>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </transition>
    <transition enter-active-class="animated fadeInUp"
    leave-active-class="animated fadeOutDown">
        <div class="list-mask"  v-show="listShow" @click="toggleList"></div>
    </transition>
  </div>
</template>
<style lang="less" scoped>
    @import url('./shopcart');
</style>
<script>
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol';
export default {
    components: {
        cartcontrol
    },
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
    data(){
        return {
            balls:[
                {show:false},
                {show:false},
                {show:false},
                {show:false},
                {show:false}
            ],
            dropBall:[],
            fold:true,
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
        },
        listShow(){
            if(!this.totalCount){
                this.fold=true;
                return false;
            };
            let show=!this.fold;
            if(show){
                if(!this.listScroll){
                    this.$nextTick(() => {
                        this._initScroll();
                    })
                }else{
                    this.listScroll.refresh();
                }
            }
            return show;
        }
    },
    methods: {
        drop(el){
            let vm=this;
            for(let i=0;i<vm.balls.length;i++){
                let ball=vm.balls[i];
                if(!ball.show){
                    ball.show=true;
                    ball.el=el;
                    vm.dropBall.push(ball);
                    return;
                }
            };
        },
        toggleList(){
            let vm=this;
            if(!vm.totalCount){
                return;
            };
            vm.fold=!vm.fold;
        },
        _initScroll(){
            let vm=this;
            vm.listScroll=new BScroll(vm.$refs.listcontent,{
                click:true
            })
        },
        empty(){
            this.selectFoods.forEach((food) => {
                food.count=0;
            })
        }
    }
}
</script>


