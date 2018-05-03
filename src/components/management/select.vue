<template lang="html">
<div class="main">
  <div class="head">
    <h1 class="title">微博数据</h1>

  </div>

  <div class="left">

   <div class="leftTop">
     <h1>微博大咖们</h1>
   </div>


   <div class="leftCon">
 <ul id="con1" ref="con1" :class="{anim:animate==true}">


  <li v-for='famous in famousList'>
    <div class="head">
      <img :src=famous.headurl alt="">
    </div>
    <div class="text">
      <p>用户名:{{famous.nickname}}</p>
      <p>关注数:{{famous.weibonum}}</p>
      <p>粉丝数:{{famous.fansnum}}</p>
    </div>

  </li>
</ul>
</div>


  </div>

  <div class="right">
    <div class="rightTop">


      <el-input v-model="uname" placeholder="请输入微博名" class="name"></el-input>
   <el-date-picker v-model="dataFrom" class="from"
     type="date"
     placeholder="起始日期">
   </el-date-picker>
   <el-date-picker v-model="dataTo" class="to"
     type="date"
     placeholder="结束日期">
   </el-date-picker>
   <el-button @click='search()' type="danger" icon="el-icon-search" class="btnSerch"  size="small">搜索</el-button>

   <span class="span1">微博数:{{number.weibo}}</span>
   <span class="span2">用户数:{{number.user}}</span>

    </div>

    <div class="rightCon">
      <ul>
        <li v-for='rec in records'>

          <p v-html='rec.content'></p>
          <!-- {{rec.content}} -->
          <div class="desc">
            <span>设备：{{rec.device}}</span>
            <span>时间：{{rec.time}}</span>
          </div>

        </li>
      </ul>
      <el-button-group class="bottomBtn">
  <el-button type="danger" icon="el-icon-arrow-left" @click='pageBefour()'>上一页</el-button>
  <el-button type="danger" @click='pageAfter()'>下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
</el-button-group>
    </div>
  </div>

</div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      famousList:[],
      number:{},
      records:[],
      dataFrom:'2017-4-1',
      dataTo:'2017-12-1',
      uname:'微博管理员',
      pageNum:1,


    }
  },
  created(){
  setInterval(this.scroll,2000) // 在钩子函数中调用我在method 里面写的scroll()方法，注意此处不要忘记加this,我在这个位置掉了好几次坑，都是因为忘记写this。
},

  computed : {
    			getToken : function () {
    				var arr, reg = new RegExp("(^| )token=([^;]*)(;|$)");
    		 			if (arr = document.cookie.match(reg))
    		  				return (arr[2]);
    		 			else
    		  				return "";//获取token
    			},


    		},
  mounted(){
        var token = this.getToken;//获取token


    axios.get('http://10.90.6.251:8081/api/content/user/famous',{
      headers : {
    "token" : token,
  },//微博大咖

    })
    .then((res)=>{
        this.famousList=res.data.data;//得到数据
        //console.log(this.famousList)
      })
    .catch(()=>{
    //  this.$message.error({message: '获取失败'});
    });


    axios.get('http://10.90.6.251:8081/api/content/number',{
      headers : {
    "token" : token,
  },//数量查询
  params : {
    "weibo": 1,
    "user": 1
        },
    })
    .then((res)=>{
        this.number=res.data.data;//得到数据
      //  console.log(res)
      })
    .catch(()=>{
    //  this.$message.error({message: '获取失败'});
    });

    axios.get('http://10.90.6.251:8081/api/content/records',{
      headers : {
    "token" : token,
  },//搜索
  params : {
    "uname" : this.uname,
   "dateFrom" : this.dataFrom,
   "dateTo" : this.dataTo,
   "pageNum" : this.pageNum,
   "pageSize" : 10
        },
    })
    .then((res)=>{
        this.records=res.data.data.list;//得到数据
        console.log(res)

      })
    .catch(()=>{
    //  this.$message.error({message: '获取失败'});
    });


  },
  methods:{
    pageAfter(){
      var token = this.getToken;//获取token
      this.pageNum++;
      axios.get('http://10.90.6.251:8081/api/content/records',{
        headers : {
      "token" : token,
    },//
    params : {
      "uname" : this.uname,
     "dateFrom" : this.dataFrom,
     "dateTo" : this.dataTo,
     "pageNum" : this.pageNum,
     "pageSize" : 10
          },
      })
      .then((res)=>{
          this.records=res.data.data.list;//得到数据
        console.log(res)
        if(res.data.data.isLastPage){
          this.$message.error({message: '没有下一页了'});
        }
        })
      .catch(()=>{
       this.$message.error({message: '没有下一页了'});
      });


    },
    pageBefour(){
      this.pageNum--;
      var token = this.getToken;//获取token
      axios.get('http://10.90.6.251:8081/api/content/records',{
        headers : {
      "token" : token,
    },//
    params : {
      "uname" : this.uname,
     "dateFrom" : this.dataFrom,
     "dateTo" : this.dataTo,
     "pageNum" : this.pageNum,
     "pageSize" : 10
          },
      })
      .then((res)=>{
          this.records=res.data.data.list;//得到数据
          console.log(res)
          if(res.data.data.isLastPage){
            this.$message.error({message: '没有上一页了'});
          }
        })
      .catch(()=>{
       this.$message.error({message: '没有上一页了'});
      });

    },

    search(){
        var token = this.getToken;//获取token
        this.pageNum=1;
      axios.get('http://10.90.6.251:8081/api/content/records',{
        headers : {
      "token" : token,
    },//
    params : {
      "uname" : this.uname,
     "dateFrom" : this.dataFrom,
     "dateTo" : this.dataTo,
     "pageNum" : this.pageNum,
     "pageSize" : 10
          },
      })
      .then((res)=>{
          this.records=res.data.data.list;//得到数据
          //console.log(res)
        })
      .catch(()=>{
      //  this.$message.error({message: '获取失败'});
      });
    },

    scroll(){
    let con1 = this.$refs.con1;
    con1.style.transition='1s'
    con1.style.marginTop='-2rem';
    this.animate=!this.animate;
    var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
    setTimeout(function(){
      con1.style.transition='0s'
        that.famousList.push(that.famousList[0]);
        that.famousList.shift();
        con1.style.marginTop='0';
        that.animate=!that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
    },1000)
  }

  },
}
</script>

<style lang="css" scoped>
.main{ padding:0.2rem 0.2rem 0.2rem 4.2rem;}
.head{ height: 0.5rem;}
h1{font-size: 0.4rem; font-weight: 300}
.title{ text-align: left;font-size: 0.5rem; height: 0.5rem; float: left;}
.title:after{content: 'Weibo Data'; color:#ccc; font-size: 0.4rem; margin-left: 0.5rem;}

.left{float: left; width: 23%; height: 14rem;margin-top: 0.5rem;margin-right: 3%;box-sizing: border-box;overflow: hidden;}
.left .leftTop{ height: 1.1rem;z-index: 99;z-index: 99}
.left .leftTop h1{ text-align: left; line-height: 1.1rem;padding-left: 0.5rem;background: #ccc}
.leftCon{ overflow: hidden;}
.left ul{height: 13rem; width: 100%;}
.left ul li{ width: 100%; height: 2rem;border: 1px solid #ccc; background: #eee;box-sizing: border-box; }
.left ul li .head{float: left;width: 1.6rem; height: 1.6rem;padding: 2% 2%;}
.left ul li .head img{ width: 1.6rem;border-radius: 0.8rem; overflow: hidden;height: 1.6rem;}
.left ul li .text{float: left;height: 1.6rem;padding-left: 5%;overflow: hidden}
.left ul li .text p{ text-align: left; font-size: 0.2rem;line-height: 0.6rem;overflow: hidden;text-overflow: ellipsis;width: 100%}



.right{float: left; width: 74%; border: 1px solid #ccc;height: 14rem;margin-top: 0.5rem;box-sizing: border-box; background: #fff}
.right .rightTop{height: 1rem; border: 1px solid #ccc; background: #ccc;  }
.right .rightTop .name{width: 15%; height: 100%}
.right .rightTop .from{width: 20%;height: 100%}
.right .rightTop .to{width: 20%;height: 100%}
.right .rightTop .btnSerch{width: 10%;height: 100%}
.right .rightTop .span1{width: 13%;display: inline-block;height: 100%;font-size: 0.2rem}
.right .rightTop .span2{width: 13%;display: inline-block;height: 100%;font-size: 0.2rem}


.right .rightCon{ height:13rem; width: 100% }
.right .rightCon li{border: 1px solid #ccc; height: 1.2rem;text-overflow: ellipsis;text-align: left;line-height: 0.5rem;padding-left: 0.2rem;padding-right: 0.2rem}
.right .rightCon li p{ height: 1rem;overflow: hidden;}
.right .rightCon li .desc{height: 0.2rem;line-height: 0.2rem}
.right .rightCon ul{height:11.8rem; width: 100% }
.right .rightCon .bottomBtn{  }
</style>
