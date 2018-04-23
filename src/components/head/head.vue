<template>
  <div id="header">
       <div class="content-wrapper">
           <div class="avatar">
               <img :src="seller.avatar" alt="" width="64" height="64">
           </div>
           <div class="content">
               <div class="title">
                   <span class="brand"></span>
                   <span class="name">{{seller.name}}</span>
               </div>
               <div class="description">
                   {{seller.description}}/{{seller.deliveryTime}}分送达
               </div>
               <div v-if='seller.supports' class="supports">
                   <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                   <span class="text">{{seller.supports[0].description}}</span>
               </div>
           </div>
           <div class="support-count" v-if='seller.supports' @click="_showDetail">
               <span class="count">{{seller.supports.length}}个</span>
               <i class="iconfont icon-gengduo"></i>
           </div>
       </div>
       <div class="bulletin-wrapper" @click="_showDetail">
           <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
           <i class="iconfont icon-gengduo arrow-right"></i>
       </div>
       <div class="background">
           <img :src="seller.avatar" alt="" width="100%" height="100%">
       </div>
       <transition name="fade" enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
        <div class="detail" v-show="detailShow">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrapper">
                        <star :size='48' :score='seller.score'></star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul class="support" v-if='seller.supports'>
                        <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                            <span class="icon" :class="classMap[index]"></span>
                            <span class="text">{{seller.supports[index].description}}</span>
                        </li>    
                    </ul>  
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>  
                    <div class="bulletin">
                        <p class="content">{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div class="detail-close" @click="hideDetail">
                <i class="icon-close iconfont"></i>
            </div>
        </div>
       </transition>
  </div>
</template>
<style lang="less" scoped>
    @import url('./head.less');
</style>

<script>
import Star from './../star/star';
export default {
    components: {
        Star
    },
  props:{
      seller:{
          type:Object,
          default:{}
      }
  },
  data () {
      return {
          detailShow:false,
      }
  },
  created(){
      this.classMap=['decrease','discount','special','guarantee','invoice'];
  },
  methods: {
      _showDetail(){
          let vm=this;
          vm.detailShow=true;
      },
      hideDetail(){
          this.detailShow=false;
      }
  }
}
</script>
