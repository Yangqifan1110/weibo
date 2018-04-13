<template lang="html">
  <div class="main">
    <div class="head">
      <h1 class="title">集群数据量监控</h1>

    </div>

    <div class="banner">
      <div class="bannerLeft"  >


        <h1><span>数据库数目</span><span>{{totalList.okCount}}</span></h1>
        <h1><span>运行中数据库</span><span>{{totalList.serverCount}}</span></h1>
        <h1><span>微博记录总数</span><span>{{totalList.count.toString().replace(/(\d)(?=(?:\d{3})+$)/g,'$1,') }}</span></h1>
        <h1><span>记录存储容量</span><span>{{ (totalList.size/1073741824).toFixed(4)}}GB</span></h1>
        <h1><span>记录索引容量</span><span>{{ (totalList.totalIndexSize/1073741824).toFixed(4)}}GB </span></h1>
        <h1><span>记录平均容量</span><span>{{ (totalList.size/1073741824/4).toFixed(4)}}GB</span></h1>


      </div>


      <div class="bannerRight">
        <div class="block">
            <span class="demonstration"></span>
            <el-carousel trigger="click" height="250px"  class="go">
              <el-carousel-item v-for="(item,index) in dataList" :key="index" class="goList" >

                  <h1><span>IP地址</span><span>{{item.host.host}}</span></h1>
                  <h1 ><span>微博记录总数</span><span>{{item.count.toString().replace(/(\d)(?=(?:\d{3})+$)/g,'$1,')}}</span></h1>
                  <h1><span>记录存储容量</span><span>{{ (item.size/1073741824).toFixed(4)}}GB</span></h1>
                  <h1><span>记录索引容量</span><span>{{(item.totalIndexSize /1073741824).toFixed(4)}}GB</span></h1>
                  <h1><span>磁盘剩余空间</span><span>{{(item.diskLeft/1073741824).toFixed(4)}}GB</span></h1>
                  <h1><span>磁盘占用率:</span><span>{{((item.diskAll-item.diskLeft)/item.diskAll*100).toFixed(2)}}%</span></h1>
              </el-carousel-item>
            </el-carousel>
          </div>
      </div>

    </div>

    <div class="con1">
      <ul>
        <li v-for='fourdata in dataList'>
          <div class="text" >
            <p class="ttitle">记录存储容量</p>
            <p class="big">{{(fourdata.size/1073741824).toFixed(4)}}Gb</p>
            <p class="ttitle">IP地址</p>
            <p>{{fourdata.host.host}}</p>

          </div>
          <div class="chart" id="c1"></div>
        </li>

      </ul>
    </div>
    <div class="con2">
      <div class="con2Left">
        <div id="myChart" :style="{width: '100%', height: '300px',}"></div>
      </div>
      <div class="con2Right">
        <div id="pie" :style="{width: '100%', height: '300px',}"></div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{

        dataList:[],//发送请求多主机分开查询
      totalList:{},//发送请求总量查询
        diskList:[],//发送磁盘占用率查询
        memList:[],//发送内存占用率查询
        mongoDB1:'',
        mongoDB2:'',
        mongoDB3:'',
        mongoDB4:'',
        all:'',
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
creat(){
      //  setInterval('this.getTot()',1000)
      },
mounted(){

      var token = this.getToken;//获取token


  // 1
      axios.get('http://10.90.6.251:8081//api/statistics/splited',{
        headers : {
      "token" : token,
    },//发送请求多主机分开查询
      })
      .then((res1)=>{
        // console.log(res1)
          this.dataList=res1.data.data;//得到数据
          this.mongoDB1=(res1.data.data[0].size/1073741824);
          this.mongoDB2=(res1.data.data[1].size/1073741824);
          this.mongoDB3=(res1.data.data[2].size/1073741824);
          this.mongoDB4=(res1.data.data[3].size/1073741824);
          // console.log(this.dataList)
          this.all=this.mongoDB1+this.mongoDB2+this.mongoDB3+this.mongoDB4;//计算总和
          // console.log(this.all)
          this.rowChart()//图表挂载放在then里
  })
      .catch(()=>{
        // this.$message.error({message: '获取失败'});
      });



   //发送一次的方法
      axios.get('http://10.90.6.251:8081/api/statistics/total',{
        headers : {
      "token" : token,
    },//发送请求总量查询
      })
      .then((res2)=>{
          this.totalList=res2.data.data;//得到数据
          //console.log(this.totalList)
        })
      .catch(()=>{
        this.$message.error({message: '获取失败'});
      });



  //  3
      axios.get('http://10.90.6.251:8081/api/statistics/disk',{
        headers : {
      "token" : token,
    },//发送磁盘占用率查询
      })
      .then((res3)=>{
          this.diskList=res3.data.data;//得到数据
          // console.log(this.diskList)

          this.drawLine()//图表挂载放在then里
        })
      .catch(()=>{
        this.$message.error({message: '获取失败'});
      });


    //下一步
    //   axios.get('http://10.90.6.251:8081/api/statistics/mem',{
    //     headers : {
    //   "token" : token,
    // },//发送内存使用情况
    //   })
    //   .then((res)=>{
    //       this.memList=res.data.data;//得到数据
    //       // console.log(this.memList);
    //
    //
    //     })
    //   .catch(()=>{
    //     // this.$message.error({message: '获取失败'});
    //   });


    //计时发送的方法
    //1
    setInterval(()=>{
      axios.get('http://10.90.6.251:8081//api/statistics/splited',{
        headers : {
      "token" : token,
    },//发送请求多主机分开查询
      })
      .then((res1)=>{
        // console.log(res1)
          this.dataList=res1.data.data;//得到数据
          this.mongoDB1=(res1.data.data[0].size/1073741824);
          this.mongoDB2=(res1.data.data[1].size/1073741824);
          this.mongoDB3=(res1.data.data[2].size/1073741824);
          this.mongoDB4=(res1.data.data[3].size/1073741824);
          // console.log(this.dataList)
          this.all=this.mongoDB1+this.mongoDB2+this.mongoDB3+this.mongoDB4;//计算总和
          // console.log(this.all)
          this.rowChart()//图表挂载放在then里
  })
      .catch(()=>{
        // this.$message.error({message: '获取失败'});
      });
} ,3000)



    //2
    setInterval(()=>{
      axios.get('http://10.90.6.251:8081/api/statistics/total',{
        headers : {
      "token" : token,
    },//发送请求总量查询
      })
      .then((res2)=>{
          this.totalList=res2.data.data//得到数据
          //console.log(this.totalList)
        })
      .catch(()=>{
        //this.$message({message: '获取失败111'});

      });
} ,1500)


  //3
setInterval(()=>{
  axios.get('http://10.90.6.251:8081/api/statistics/disk',{
    headers : {
  "token" : token,
},//发送磁盘占用率查询
  })
  .then((res3)=>{
      this.diskList=res3.data.data;//得到数据
      // console.log(this.diskList)

      this.drawLine()//图表挂载放在then里
    })
  .catch(()=>{
    //this.$message.error({message: '获取失败'});
  });
} ,30000)

    },
    methods: {


    drawLine(){
              // 基于准备好的dom，初始化echarts实例
              let myChart = this.$echarts.init(document.getElementById('myChart'))
              // 绘制图表
              myChart.setOption( {
    title : {
        text: '磁盘内存占用率，单位GB',
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        // data:['已占用','总容量']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : ['主机1','主机2','主机3','主机4']
        }
    ],
    yAxis : [
        {
            type : 'value',

        }
    ],
    series : [
        {
            name:'已占用',
            type:'bar',
            data:[
                  (this.diskList[0].used/1073741824).toFixed(2),
                  (this.diskList[1].used/1073741824).toFixed(2),
                  (this.diskList[2].used/1073741824).toFixed(2),
                  (this.diskList[3].used/1073741824).toFixed(2)
                ],

            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        },
        {
            name:'总量',
            type:'bar',
            data:[
            (this.diskList[0].all/1073741824).toFixed(2),
            (this.diskList[1].all/1073741824).toFixed(2),
            (this.diskList[2].all/1073741824).toFixed(2),
            (this.diskList[3].all/1073741824).toFixed(2)
          ],
            markPoint : {
                data : [
                    {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                    {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name : '平均值'}
                ]
            }
        }
    ]
});
},//endchart

 rowChart(){
     let myChart1 = this.$echarts.init(document.getElementById('pie'))
     myChart1.setOption( {
    title : {
        text: '数据量占比',

        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['222.27.227.104','222.27.227.107','222.27.227.110','222.27.227.113']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'left',
                        max: 1548
                    }
                }
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'数据量占比',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:this.mongoDB1.toFixed(4), name:'222.27.227.104'},
                {value:this.mongoDB2.toFixed(4), name:'222.27.227.107'},
                {value:this.mongoDB3.toFixed(4), name:'222.27.227.110'},
                {value:this.mongoDB4.toFixed(4), name:'222.27.227.113'},

            ]
        }
    ],
      color: ['rgb(243,106,90)','rgb(48,165,255)','rgb(26,188,156)','rgb(250,190,40)']
}


     )
 }//endchart1

},
}
</script>

<style lang="css">
.main{ padding:10px 10px 10px 210px;}
.head{ height: 20px;}
.title{ text-align: left;font-size: 20px; height: 20px; float: left;}
.title2{ float: right;font-size: 20px; height: 20px}
.title2:before{content: '当前总数据量：';color:#ccc; font-size: 16px; margin-right: 10px; }
.title:after{content: 'Data Presentation'; color:#ccc; font-size: 16px; margin-left: 20px;}
.banner{ width: 100%; height: 250px;  margin-top: 20px}
.banner .bannerLeft{width: 40%; border: 1px solid #ccc; height: 250px; float: left;background: #fff;}
.banner .bannerLeft h1{ height: 41.6px; line-height: 41.6px}
.banner .bannerLeft h1 span{display: inline-block; width: 50%; border: 1px solid #ccc;box-sizing: border-box; height: 40px; line-height: 40px;}
.banner .bannerLeft h1:nth-child(2n+1){background: #F6F8FA}
.banner .bannerRight{width:58%; height: 250px; border: 1px solid #ccc; float: right;background: #fff;}
.con1{ width: 100%; height: 100px; margin-top: 20px;}

.con1 ul li{ height: 80px; width: 20.75%; background: #fff;float: left; padding:6px 1%; text-align: left;}
.con1 ul li:nth-child(1) .chart{background: #F36A5A}
.con1 ul li:nth-child(2){margin: 0 3%;}
.con1 ul li:nth-child(2) .chart{background: #30A5FF}
.con1 ul li:nth-child(3){margin-right: 3%;}
.con1 ul li:nth-child(3) .chart{background: #1ABC9C}
.con1 ul li:nth-child(4) .chart{background: #FABE28}
/* .con1 ul li p{font-size: 16px; height: 16px} */
.con1 ul li .text{float: left; width: 80%}
.con1 ul li .chart{float: right; width: 20%; height: 100%; background: #0f0}
.con1 ul li .ttitle{ text-align: left; color:#ccc}
.con1 ul li .big{font-size: 18px; line-height: 18px;}


.con2{width: 100%; height: 250px;  margin-top: 10px}
.con2 .con2Left{ width: 59%; height: 300px;border: 1px solid #ccc; float: left; background: #fff}
.con2 .con2Right{ width: 39%; height: 300px;border: 1px solid #ccc; float: right;background: #fff}



.go .goList:nth-child(3) .goTop { border-bottom: 3px solid #F36A5A;}
.go .goList:nth-child(4) .goTop { border-bottom: 3px solid #30A5FF;}
.go .goList:nth-child(5) .goTop { border-bottom: 3px solid #1ABC9C;}
.go .goList:nth-child(6) .goTop { border-bottom: 3px solid #FABE28;}
.go .goList h1 span{display: inline-block; width: 50%; border: 1px solid #ccc;box-sizing: border-box; height: 41.6px; line-height: 41.6px;}
.go .goList h1:nth-child(2n){background: #F6F8FA}
ul.el-carousel__indicators li:nth-child(1) button{ background: #F36A5A; }
ul.el-carousel__indicators li:nth-child(2) button{ background: #30A5FF; }
ul.el-carousel__indicators li:nth-child(3) button{ background: #1ABC9C; }
ul.el-carousel__indicators li:nth-child(4) button{ background: #FABE28; }
.el-carousel__item:nth-child(2n) {
    background-color: #eee;
 }

 .el-carousel__item:nth-child(2n+1) {
    background-color: #ddd;
 }
</style>
