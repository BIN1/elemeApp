<template>
  <div id="index">
      <v-head :seller='seller'></v-head>
      <div class="tab border-1px">
          <router-link to="/goods" class="tab-item">商品</router-link>
          <router-link to="/ratings" class="tab-item">评论</router-link>
          <router-link to="/seller" class="tab-item">商家</router-link>
      </div>
      <router-view/>
  </div>
</template>
<style lang="less" scoped>
    @import url('./index.less');
</style>

<script>
import VHead from '../head/head.vue';
import Datas from '../../../static/data.json';
export default {
    components:{
        VHead
    },
    data () {
        return {
            goods:Datas.goods,
            seller:Datas.seller,
            ratings:Datas.ratings
        }
    },
    // 钩子
    beforeCreate(){
        console.log('beforeCreate:组件实例刚刚被创建'+new Date().getTime());
    },
    created(){
        console.log('created：组件实例创建完成'+new Date().getTime());
        let vm=this;
    },
    beforeMount(){
        console.log('beforeMount:模板编译／挂载之前'+new Date().getTime());
    },
    mounted () {
        console.log('mounted:模板编译／挂载之后'+new Date().getTime());
    },
    beforeUpdate(){
        console.log('beforeUpdate:组件更新之前'+new Date().getTime());
    },
    updated(){
        console.log('updated:组件更新之后'+new Date().getTime());
    },
    activated () {
        console.log('activated：组件被激活时调用'+new Date().getTime());
    },
    deactivated () {
        console.log('deactivated:组件被移除时调用：'+new Date().getTime());
    },
    beforeDestroy(){
        console.log('beforeDestroy:组件被销毁前调用'+new Date().getTime());
    },
    destroyed(){
        console.log('destroyed:组件销毁后调用'+new Date().getTime());
    }
}
</script>

