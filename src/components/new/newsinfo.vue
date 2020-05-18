<template>
    <div class='newsinfo-container'>
        <h3 class="title">{{newsinfo.title}}</h3>
        <p class='subtitle'>
            <span>发表时间：{{newsinfo.add_time}}</span>
            <span>点击：{{newsinfo.click}}次</span>
        </p>
        <div class='content' v-html='newsinfo.content'></div>
        <coment :id=this.id></coment>
    </div>

</template>

<script>
    import coment from '../subcompents/coments.vue'
    import { Toast } from 'mint-ui'
    export default {

        data() {
            return {
                id: this.$route.params.id,
                newsinfo: {}
            }
        },
        methods: {
            getinfo() {
                this.$http.get("api/getnew/" + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.newsinfo = result.body.message[0]
                    } else {
                        Toast('获取失败')
                    }
                })
            }
        },
        created() {
            this.getinfo()


        },
        components: {
            'coment': coment
        }

    }
</script>
<style lang="scss" scoped>
    .mui-table-view {
      li {
        h1 {
          font-size: 14px;
        }
        .mui-ellipsis {
          font-size: 12px;
          color: #226aff;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    </style>
    