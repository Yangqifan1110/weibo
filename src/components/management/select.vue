<template lang="html">
<div class="main">
  <div class="head">
    <h1 class="title">微博数据</h1>

  </div>

  <div class="left">

  </div>

  <div class="right">

  </div>

</div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {

    }
  },
  computed : {
    			getToken : function () {
    				var arr, reg = new RegExp("(^| )token=([^;]*)(;|$)");
    		 			if (arr = document.cookie.match(reg))
    		  				return (arr[2]);
    		 			else
    		  				return "";//获取token
    			},
          gotString: function(){
            return
          }

    		},
  mounted(){
        var token = this.getToken;//获取token


    axios.get('http://10.90.6.251:8081/api/content/user/famous',{
      headers : {
    "token" : token,
  },//
    })
    .then((res)=>{
        //this.totalList=res2.data.data;//得到数据
        console.log(res)
      })
    .catch(()=>{
    //  this.$message.error({message: '获取失败'});
    });

  },
  methods:{

  },
}
</script>

<style lang="css" scoped>
.main{ padding:0.2rem 0.2rem 0.2rem 4.2rem;}
.head{ height: 0.5rem;}
h1{font-size: 0.4rem; font-weight: 300}
.title{ text-align: left;font-size: 0.5rem; height: 0.5rem; float: left;}
.title:after{content: 'Weibo Data'; color:#ccc; font-size: 0.4rem; margin-left: 0.5rem;}

.left{float: left; width: 27%; border: 1px solid #ccc;height: 14rem;margin-top: 0.5rem;margin-right: 3%;box-sizing: border-box;}
.right{float: left; width: 70%; border: 1px solid #ccc;height: 14rem;margin-top: 0.5rem;box-sizing: border-box;}
</style>
