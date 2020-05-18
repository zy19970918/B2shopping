<template>
    <div class="shopcar">
        <div class="good-list">
            <div class="mui-card" v-for='(item , i ) in goodlist' :key=item.id>
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model='$store.getters.add[item.id]'
                        
                        @change='gaibian(item.id,$store.getters.add[item.id])'></mt-switch>
                        <img :src="item.thumb_path">

                        <div class="info">
                            <h2>{{item.title}}</h2>
                            <p>
                                <span class="price">{{item.sell_price}}</span>
                                <com1 :initcount='$store.getters.getcount[item.id]' :goodsid='item.id'></com1>
                                <a href="#" @click.prevent='remove(item.id,i)'>删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>




            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner jiesuan">
                       <div class="left">
                           <p>总计</p>
                           <p>已勾选商品 : <span style="color: red;">{{ $store.getters.sum.count}}</span>件，总价:  <span style="color: red;">{{$store.getters.sum.anmout}}</span></p>
                       </div>
                       <mt-button type="danger">去结算</mt-button>
                     
                    </div>
                   
                </div>
            </div>
        </div>
      
    </div>
   
</template>
<script>
    import com1 from '../subcompents/shopcar.vue'
    export default {
        data() {
        return {
          goodlist:[]//将购车中获取的数据 放到这个数组中
        
        }
      },

        components: {
            com1
        },
        methods: {
            getgoodlist() {
          //获取store中所有商品的id，然后拼接处一个 用逗号分隔的字符串
          var idarr=[]
          this.$store.state.car.forEach(item => {
                idarr.push(item.id)
          });
          if(idarr.length<=0) {
            //如果购物车中没有商品 则直接return出去 不用个发送请求 否则会报错
            return
          }
          this.$http.get( 'api/goods/getshopcarlist/'+idarr.join(",") ).then(result=>{
            if (result.body.status ===0 ) {
                 this.goodlist=result.body.message
                 console.log(result);
                 
            }
          })
        },
           remove(id,index) {
              this.goodlist.splice(index,1)
              this.$store.commit('removecar',id)
           },
           gaibian(id,val){
           this.$store.commit('updataselected',{id,selected:val})
            
           }
        },
       
        created() {
      this.getgoodlist()
      }
      }
    
    
    
</script>
<style lang="scss" scoped>
    .shopcar {
        background-color: #eee;
        overflow: hidden
        
    }
    .good-list>img{
        width: 60px;
        height: 60px;
    }
    h2{
        font-size: 13px;

    }
    .price{
        color: red;
        font-weight: bold;
    }
    .mui-card-content-inner{
        display: flex;
        align-items: center;
    }
    img{
        height: 60px;
        width: 60px;
    }
    .jiesuan{
       display: flex;
       justify-content: space-between;
    }
</style>