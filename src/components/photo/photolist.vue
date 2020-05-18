<template>
    <div>
        <div id="slider" class="mui-slider ">
            <div id="sliderSegmentedControl"
                class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id==0 ? 'mui-active' : '']" href="#item1mobile"
                        data-wid="tab-top-subpage-1.html" v-for='item in photolist' :key='item.id'
                        @click="getphotelist(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>

        </div>
        <ul class="photo-list">
            <router-link :to="'/home/photoinfo/'+item.id" v-for="item in list" :key="item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                photolist: [],
                list: []
            }
        },
        methods: {
            getphoto() {
                this.$http.get('api/getimgcategory').then(result => {
                    if (result.body.status === 0) {
                        this.photolist = result.body.message
                        result.body.message.unshift({ title: '全部', id: 0 })
                        this.photolist = result.body.message


                    } else {
                        console.log('失败')
                    }
                })
            },
            getphotelist(cateid) {
                this.$http.get('api/getimages/' + cateid).then(result => {
                    if (result.body.status === 0) {
                        this.list = result.body.message
                    }
                })
            }
        },
        created() {
            this.getphoto()
            this.getphotelist(0)
        },
    }

//
</script>


    <style lang="scss" scoped>
           * {
      touch-action: pan-y;
    }
    
    .photo-list {
      list-style: none;
      margin:0;
      padding: 10px;
      padding-bottom: 0;
      li{
        background-color:#ccc;
        text-align:center;
        margin-bottom:10px;
        box-shadow:0 0 9px #999;
        position:relative;
        img {
          width:100%;
          vertical-align: middle;
        }
        img[lazy="loading"] {
          width:40px;
          height:300px;
          margin:auto;
        }
    
        .info {
          color: white;
          text-align: left;
          position: absolute;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.4);
          max-height: 84px;
        .info-title {
            font-size: 14px;
          }
        .info-body {
            font-size:13px;
          }
        }
      }
    }
    </style>
    