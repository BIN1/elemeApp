<template>
  <div id="star" :class="starType">
      <span v-for="(itemclass,index) in itemClasses" :key="index" :class="itemclass" class="star-item"></span>
  </div>
</template>
<style lang="less" scoped>
    @import url('./star.less');
</style>
<script>
const LENGTH=5;
const CLS_ON='on';
const CLS_HALF='half';
const CLS_OFF='off';
export default {
  props: {
      size:{
          type:Number
      },
      score:{
          type:Number
      }
  },
  computed:{
      starType() {
          return 'star-'+this.size;
      },
      itemClasses() {
          let result=[];
          let score=Math.floor(this.score*2)/2;
          let hasDecimal=score%1!==0;       //半星
          let integer=Math.floor(score);    //全星
          for(let i=0;i<integer;i++){
              result.push(CLS_ON);
          };
          if(hasDecimal){
              result.push(CLS_HALF);
          };
          while (result.length<LENGTH) {
            result.push(CLS_OFF);
          };
          return result;
      }
  },
  created () {
      console.log(this.score);
  }
}
</script>


