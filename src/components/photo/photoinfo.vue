<template>
  <div class="photoinfo-container">
    <h3>{{Photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{Photoinfo.add_time}}</span>
      <span>点击{{Photoinfo.click}}次</span>
    </p>
    <hr>

    <!-- suolvqu  -->
    <div class="thumbs">
      <vue-preview class="preview-img" :slides="slide1" @close="handleClose"></vue-preview>
    </div>
    <!-- 图片内容区域 -->
    <div class="content" v-html="Photoinfo.content"></div>

    <!-- 评论子组件 -->
    <comment1 :id=this.id></comment1>
  </div>
</template>

<script>
  import comment from '../subcompents/coments.vue'
  export default {
    data() {
      return {
        id: this.$route.params.id,
        Photoinfo: {},
        slide1: []  //SUOLVQU
      }
    },
    methods: {
      getPhotoinfo(id) {
        //获取图片详情
        this.$http.get("api/getimageInfo/" + this.id).then(result => {
          if (result.body.status === 0) {
            this.Photoinfo = result.body.message[0]
          }
        })
      },
      gethumbs() {
        this.$http.get("api/getthumimages/" + this.id).then(result => {
          if (result.body.status === 0) {
            result.body.message.forEach(item => {
              item.w = 600;
              item.h = 400;
              item.msrc = item.src
            })
            this.slide1 = result.body.message
          }

        })
      },
      handleClose() {
        console.log('close event')
      }
    },
    created() {
      this.getPhotoinfo()
      this.gethumbs()
    },
    components: {
      'comment1': comment
    }
  }
</script>
<style lang="scss" scoped>
  .photoinfo-container {
    padding: 3px;

    h3 {
      color: #26a2ff;
      font-size: 15px;
      text-align: center;
      margin: 15px 0;
    }

    .subtitle {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
    }

    .content {
      font-size: 13px;
      line-height: 30px;
    }

    .thumbs {
      /deep/ .my-gallery {
        display: flex;
        flex-wrap: wrap;

        figure {
          width: 30%;
          margin: 5px;

          img {
            width: 100%;
          }
        }
      }

    }
  }
</style>