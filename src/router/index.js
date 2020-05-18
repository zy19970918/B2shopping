import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import home from '../components/tablebar/home.vue'
import search from '../components/tablebar/search.vue'
import member from '../components/tablebar/member.vue'
import shop from '../components/tablebar/shop.vue'
import newlist from '../components/new/newlist.vue'
import newsinfo from '../components/new/newsinfo.vue'
import photolist from '../components/photo/photolist.vue'
import photoinfo from '../components/photo/photoinfo.vue'
import GoodsList from '../components/goods/GoodList.vue'
import GoodsInfo from '../components/goods/Goodsinfo.vue'


Vue.use(VueRouter)
const routes = [
  {
      path: '/',redirect:'/home',
      name: 'Home',
      component: Home
  },
  {
      path: '/home',
      // name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: home
  },
  {
      path: '/shop',
      component: shop
  },
  {
      path: '/search',
      component: search
  },
  {
      path: '/member',
      component: member
  },
  {
      path:'/home/newlist',
      component:newlist
  },
  {
      path:'/home/newsinfo/:id',
      component:newsinfo
  },
  {
      path:'/home/photolist',
      component:photolist
  },
  {
      path:'/home/photoinfo/:id',
      component:photoinfo
  },
  {
      path:'/home/goodslist',
      component: GoodsList
  },
  {
    path: '/home/goodsinfo/:id', 
    component: GoodsInfo,
    name: 'goodsinfo' 
  }
]
const router = new VueRouter({
  routes,
  linkActiveClass: 'mui-active'
})

export default router
