<template>
  <div>
    <mt-swipe :auto="5000">
      <mt-swipe-item v-for='item in lblist' :key='item.id'><img :src='item.img' alt=''></mt-swipe-item>
    </mt-swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newlist">
          <img src='../../../src/lib/dist/imgers/menu1.png'>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src='../../../src/lib/dist/imgers/menu2.png'>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src='../../../src/lib/dist/imgers/menu3.png'>
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/#">
          <img src='../../../src/lib/dist/imgers/menu4.png'>
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/#">
          <img src='../../../src/lib/dist/imgers/menu5.png'>
          <div class="mui-media-body">视屏专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/#">
          <img src='../../../src/lib/dist/imgers/menu6.png'>
          <div class="mui-media-body">联系方式</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        lblist: []
      }
    },
    created() {
      this.getlunbo()
    },
    methods: {
      getlunbo() {
        this.$http.get('api/getlunbo').then(result => {
        
          if (result.status === 200) {
            this.lblist = result.body.message
          } else {
            Toast('加载失败')
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .mint-swipe {
    height: 200px;
  
    .mint-swipe-item {
      &:nth-child(1) {
        background-color: red;
      }
      &:nth-child(2) {
        background-color: blue;
      }
      &:nth-child(3) {
        background-color: cyan;
      }
  
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  
  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
    img {
      width: 60px;
      height: 60px;
    }
  
    .mui-media-body {
      font-size: 13px;
    }
  }
  
  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
  }
  </style>
  