<template lang="html">
  <div class="main">
    <div class="head">
      <h1 class="title">数据展示</h1>
      <h1 class="title2">{{all.toFixed(2)}}GB</h1>
    </div>

    <div class="banner">
      <div class="block">
          <span class="demonstration"></span>
          <el-carousel trigger="click" height="330px"  class="go">
            <el-carousel-item v-for="item in dataList" :key="item" class="goList">
                <div class="goTop">

                </div>
                <h1 >微博记录数:{{item.count}}</h1>
                <h1>每条微博的平均内存大小:{{item.avgSize}}</h1>
                <h1>当前分配的内存大小:{{item.storageSize}}</h1>
                <h1>索引大小:{{item.totalIndexSize}}</h1>
                <h1>数据库状态:{{item.status}}</h1>
            </el-carousel-item>
          </el-carousel>
        </div>
    </div>

    <div class="con1">
      <ul>
        <li v-for='fourdata in dataList'>
          <div class="text" >
            <h1 class="ttitle">数据量(字节)</h1>
            <h1 class="big">{{(fourdata.size/1073741824).toFixed(4)}}Gb</h1>
            <h1 class="ttitle">IP地址</h1>
            <h1>{{fourdata.host.host}}</h1>

          </div>
          <div class="chart" id="c1"></div>
        </li>

      </ul>
    </div>
    <!-- <div id="myChart" :style="{width: '600px', height: '400px',}"></div> -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{

        dataList:[],//存储数据
        mongoDB1:'',
        mongoDB2:'',
        mongoDB3:'',
        mongoDB4:'',
        all:''
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

  		},
mounted(){

      var token = this.getToken;//获取token
      axios.get('http://10.90.6.251:8081//api/statistics/splited',{
        headers : {
      "token" : token,
    },//发送请求
      })
      .then((res)=>{
        // console.log(res)
          this.dataList=res.data.data;//得到数据
          this.mongoDB1=res.data.data[0].size/1073741824;
          this.mongoDB2=res.data.data[1].size/1073741824;
          this.mongoDB3=res.data.data[2].size/1073741824;
          this.mongoDB4=res.data.data[3].size/1073741824;
          console.log(this.dataList)
          this.all=this.mongoDB1+this.mongoDB2+this.mongoDB3+this.mongoDB4;//计算总和
          console.log(this.all)

        })
      .catch(()=>{
        this.$message.error({message: '获取失败'});
      });

    },
    methods: {

 }
}
</script>

<style lang="css">
.main{ padding:80px 30px 20px 240px;}
.head{ height: 40px;}
.title{ text-align: left;font-size: 40px; height: 40px; float: left;}
.title2{ float: right;font-size: 30px; height: 40px}
.title2:before{content: '当前总数据量：';color:#ccc; font-size: 20px; margin-right: 10px; }
.title:after{content: 'Data Presentation'; color:#ccc; font-size: 30px; margin-left: 20px;}
.banner{ width: 100%; height: 330px; background: #fff; margin-top: 20px}
.con1{ width: 100%; height: 100px; margin-top: 20px;}

.con1 ul li{ height: 80px; width: 18.75%; background: #fff;float: left; padding: 2%; text-align: left;}
.con1 ul li:nth-child(1) .chart{background: #F36A5A}
.con1 ul li:nth-child(2){margin: 0 3%;}
.con1 ul li:nth-child(2) .chart{background: #30A5FF}
.con1 ul li:nth-child(3){margin-right: 3%;}
.con1 ul li:nth-child(3) .chart{background: #1ABC9C}
.con1 ul li:nth-child(4) .chart{background: #FABE28}
.con1 ul li .text{float: left; width: 80%}
.con1 ul li .chart{float: right; width: 20%; height: 100%; background: #0f0}
.con1 ul li .ttitle{ text-align: left; color:#ccc}
.con1 ul li .big{font-size: 22px; line-height: 24px;}
.go h1{ font-size:30px; height: 45px}
.go .goTop{height: 50px; width: 300px;  margin-bottom: 40px}
.go .goList:nth-child(3) .goTop { border-bottom: 3px solid #F36A5A;}
.go .goList:nth-child(4) .goTop { border-bottom: 3px solid #30A5FF;}
.go .goList:nth-child(5) .goTop { border-bottom: 3px solid #1ABC9C;}
.go .goList:nth-child(6) .goTop { border-bottom: 3px solid #FABE28;}
.el-carousel__item:nth-child(2n) {
    background-color: #ccc;
 }

 .el-carousel__item:nth-child(2n+1) {
    background-color: #ddd;
 }
</style>
