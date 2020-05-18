import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import resource from 'vue-resource'
Vue.use(resource)
import Vuex from 'vuex'
Vue.use(Vuex)
import mui from './lib/dist/js/mui.min.js'
// 按需导入组件
// import { Header,Button } from 'mint-ui'

import './lib/dist/css/mui.css'
import './lib/dist/css/icons-extra.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 按需导入
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

Vue.use(MintUI)
Vue.http.options.root = 'http://www.liulongbin.top:3005'

import VuePreview from 'vue-preview'
Vue.use(VuePreview)


Vue.use(Element)

Vue.config.productionTip = false
Vue.use(Vuex)
var car=JSON.parse(localStorage.getItem('car')||'[]')
var store = new Vuex.Store({
  state: {
    // this.$store.state.***
    car: car //将购物车中的数据，用一个数组储存，在car数组中  存储一些商品对象 可以把商品对象储存起来  设计成这个样子 {id:商品的id，count：要购买的数量，price：商品的价格 selected：'状态'}
  },
  mutations: {
    //this.$store.commit('方法名字'，'传入的参数')
    addtocar: function (state, goodsinfo) {
      //假设 购物车中没有对象的商品 
      var flag = false
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          //如果 有对应的商品 则 商品 数量相加即可
          item.count += parseInt(goodsinfo.count)  //如果已经有了 则给个标识符
          flag = true
          return true
        }

      })
      if (!flag) {
        state.car.push(goodsinfo)  //没有 则添加
      }

      //数据持久化处理
      localStorage.setItem('car',JSON.stringify(state.car))
      //在HTML5中，新加入了一个localStorage特性，这个特性主要是用来作为本地存储来使用的，
      //解决了cookie存储空间不足的问题(cookie中每条cookie的存储空间为4k)，
      //localStorage中一般浏览器支持的是5M大小，这个在不同的浏览器中localStorage会有所不同。
    },
    updatagoodsinfo:function(state,goodsinfo) {
           //修改购物车中商品数量 同步到 car中
           state.car.some(item=>{
             if(item.id==goodsinfo.id) {
               item.count=parseInt(goodsinfo.count)
               return true
             }
           })
           // 当修改完 商品的数量 把最新的数量保存到 本地储存中 
           localStorage.setItem('car',JSON.stringify(state.car))
         
          

    },
    removecar(state,id){
      state.car.some((item,i)=>{
        if(item.id ==id) {
          state.car.splice(i,1)
          return true
        }

      })
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updataselected(state,info) {
      state.car.some(item=>{
        if(item.id==info.id){
          item.selected=info.selected
          return true
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  getters: {
    //this.$store.getters.***
    ass(state) {
      var a = 0
      state.car.forEach(item => {
        a += item.count
      })
      return a

    },
    getcount(state) {
      var o= {}
       state.car.forEach(item=>{
         o[item.id]=item.count
       })
       return o

    },
    add(state){
      var p= {}
      state.car.forEach(item=>{
        p[item.id]=item.selected
      })
      return p
    },
    sum(state) {
      var c={
        count:0,
        anmout:0
      }
      state.car.forEach(item=>{
        if(item.selected) {
          c.count+=item.count
          c.anmout+=item.count*item.price
    
        
        }
       
      })
      return c
    }
  }
})

new Vue({
  router,
  render: h => h(App),
  comments: { App },
  store,

}).$mount('#app')
