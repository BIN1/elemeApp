import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  linkActiveClass:'routActive',
  routes: [
    {
      path: "/",
      name: "index",
      component: resolve => require(["@/components/index/index"], resolve),
      children: [
        {
          path: "/",
          name: "goods",
          component: resolve => require(["@/components/goods/goods"], resolve)
        },
        {
          path: "/goods",
          name: "goods",
          component: resolve => require(["@/components/goods/goods"], resolve)
        },
        {
          path: "/ratings",
          name: "ratings",
          component: resolve => require(["@/components/goods/ratings"], resolve)
        },
        {
          path: "/seller",
          name: "seller",
          component: resolve => require(["@/components/goods/seller"], resolve)
        }
      ]
    }
  ]
});
