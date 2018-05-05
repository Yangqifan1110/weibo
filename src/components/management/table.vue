<template lang="html">
  <div class="main">
    <div class="head">
      <h1 class="title">数据增量监控</h1>

    </div>

    <div class="con1">
      <div class="con1Left">
        <h1><span>爬虫状态</span><span>{{this.gotTrue}}</span></h1>
        <h1><span>爬虫节点数</span><span>{{status.nodeCount}}</span></h1>
        <h1><span>当前总爬取速率</span><span>{{status.curRate.toFixed(4)}}条/秒</span></h1>
        <h1><span>当前平均爬取速率</span><span>{{status.curAvgRate.toFixed(4)}}条/秒</span></h1>
        <h1><span>五分钟内爬取速率</span><span>{{status.rateInFive.toFixed(4)}}条/秒</span></h1>
      </div>
      <div class="con1Right">
        <div id="myChart2" :style="{width: '100%', height: '4.5rem',}"></div>
      </div>
    </div>

    <div class="con2">
      <div class="con2Left">
        <div class="left1">
          <h1><span>IP池填装</span><span>{{this.gotTrue}}</span></h1>
          <h1><span>IP池当前容量</span><span>{{ippool.pool.length}}</span></h1>
          <h1><span>IP池更新时间间隔</span><span>{{ippool.refreshInterval}}秒</span></h1>
          <h1><span>IP池上次更新时间</span><span>{{ippool.lastRefresh}}</span></h1>


        </div>
        <div class="left2">
          <div class="tableLeft">
            <h1>代 <br> 理 <br> IP <br> 列 <br> 表</h1>
          </div>
          <ul class="tableRight">
          <li v-for='pool in poolList'  >
              <h1>{{pool}}</h1>
            </li>
          </ul>
        </div>
      </div>
      <div class="con2Right">
        <div class="right1">
            <div id="myChart3" :style="{width: '100%', height: '5.5rem',}"></div>
        </div>
        <div class="right2">
            <div id="myChart4" :style="{width: '100%', height: '4rem',}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      memList:[],
      sevenday:[],
      status:{},
      ippool:{},
      poolList:[],
      todayList:[]
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
          gotTrue:function(){

              return '启用中'

          }

    		},
  mounted(){
      var token = this.getToken;//获取token


      //1
        axios.get('http://10.90.6.251:8081/api/spider/status',{
          headers : {
        "token" : token,
      },//爬虫速率
        })
        .then((res)=>{
            this.status=res.data.data;//得到数据
            //console.log(res);
            //this.drawLine();

          })
        .catch(()=>{
          // this.$message.error({message: '获取失败'});
        });

      //2
        axios.get('http://10.90.6.251:8081/api/spider/mem',{
          headers : {
        "token" : token,
      },//发送内存使用情况
        })
        .then((res)=>{
            this.memList=res.data.data;//得到数据
            //console.log(this.memList);
            this.drawLine();

          })
        .catch(()=>{
          // this.$message.error({message: '获取失败'});
        });

        //3
          axios.get('http://10.90.6.251:8081/api/spider/ippool',{
            headers : {
          "token" : token,
        },//IP池
          })
          .then((res)=>{
              this.ippool=res.data.data;//得到数据
              this.poolList=res.data.data.pool;
              //console.log(this.poolList);

            })
          .catch(()=>{
            // this.$message.error({message: '获取失败'});
          });



        //4
          axios.get('http://10.90.6.251:8081/api/spider/sevenday',{
            headers : {
          "token" : token,
        },//查询最近不为零的七天数据增量
          })
          .then((res)=>{
              this.sevenday=res.data.data;//得到数据
              //console.log(res);
              this.kLine();

            })
          .catch(()=>{
            // this.$message.error({message: '获取失败'});
          });


      //  5
          axios.get('http://10.90.6.251:8081/api/spider/increase/today',{
            headers : {
          "token" : token,
        },//当日数据增量查询
          })
          .then((res)=>{
              this.todayList=res.data.data;//得到数据
             //console.log(this.todayList);
              this.fourLine();

            })
          .catch(()=>{
            // this.$message.error({message: '获取失败'});
          });

    //1计时
    setInterval(()=>{
      axios.get('http://10.90.6.251:8081/api/spider/status',{
        headers : {
      "token" : token,
    },//爬虫速率
      })
      .then((res)=>{
          this.status=res.data.data;//得到数据
          //console.log(res);
          //this.drawLine();

        })
      .catch(()=>{
        // this.$message.error({message: '获取失败'});
      });
    } ,1000)
 //2
setInterval(()=>{
  axios.get('http://10.90.6.251:8081/api/spider/mem',{
    headers : {
  "token" : token,
},//发送内存使用情况
  })
  .then((res)=>{
      this.memList=res.data.data;//得到数据
      //console.log(this.memList);
      this.drawLine();

    })
  .catch(()=>{
     //this.$message.error({message: '获取失败'});
  });

 } ,1000)

 //3
setInterval(()=>{
  axios.get('http://10.90.6.251:8081/api/spider/ippool',{
    headers : {
  "token" : token,
},//IP池
  })
  .then((res)=>{
      this.ippool=res.data.data;//得到数据
      this.poolList=res.data.data.pool;
      //console.log(this.poolList);

    })
  .catch(()=>{
    // this.$message.error({message: '获取失败'});
  });

 } ,1000)

 //4
setInterval(()=>{
  axios.get('http://10.90.6.251:8081/api/spider/sevenday',{
    headers : {
  "token" : token,
},//查询最近不为零的七天数据增量
  })
  .then((res)=>{
      this.sevenday=res.data.data;//得到数据
      //console.log(res);
      this.kLine();

    })
  .catch(()=>{
    // this.$message.error({message: '获取失败'});
  });

} ,1000000)

 //5
setInterval(()=>{
  axios.get('http://10.90.6.251:8081/api/spider/increase/today',{
    headers : {
  "token" : token,
},//当日数据增量查询
  })
  .then((res)=>{
      this.todayList=res.data.data;//得到数据
     //console.log(this.todayList);
      this.fourLine();

    })
  .catch(()=>{
    // this.$message.error({message: '获取失败'});
  });

} ,1000000)


  },
  methods:{


    kLine(){
              // 基于准备好的dom，初始化echarts实例
              let myChart = this.$echarts.init(document.getElementById('myChart3'))
              // 绘制图表
              myChart.setOption({
    title : {
        text: '最近七日数据增量(万条)',
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['']
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
            boundaryGap : false,
            data : [
            this.sevenday[0].date.substr(5),
            this.sevenday[1].date.substr(5),
            this.sevenday[2].date.substr(5),
            this.sevenday[3].date.substr(5),
            this.sevenday[4].date.substr(5),
            this.sevenday[5].date.substr(5),
            this.sevenday[6].date.substr(5)
          ]
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLabel : {
                formatter: '{value} 万'
            }
        }
    ],
    series : [
        {
            name:'数据量',
            type:'line',
            data:[
              (this.sevenday[0].count/10000).toFixed(2),
              (this.sevenday[1].count/10000).toFixed(2),
              (this.sevenday[2].count/10000).toFixed(2),
              (this.sevenday[3].count/10000).toFixed(2),
              (this.sevenday[4].count/10000).toFixed(2),
              (this.sevenday[5].count/10000).toFixed(2),
              (this.sevenday[6].count/10000).toFixed(2)
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

    ]
});
},//endchart


drawLine(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart2'))
          // 绘制图表
          myChart.setOption( {
title : {
    text: 'DB Server内存占用率',

},
tooltip : {
    trigger: 'axis'
},
legend: {

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
        data : ['hadoop-104','hadoop-107','hadoop-110','hadoop-113']
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
              (this.memList[0].used/1073741824).toFixed(2),
              (this.memList[1].used/1073741824).toFixed(2),
              (this.memList[2].used/1073741824).toFixed(2),
              (this.memList[3].used/1073741824).toFixed(2)
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
        (this.memList[0].all/1073741824).toFixed(2),
        (this.memList[1].all/1073741824).toFixed(2),
        (this.memList[2].all/1073741824).toFixed(2),
        (this.memList[3].all/1073741824).toFixed(2)
      ],
        markLine : {
            data : [
                {type : 'average', name : '平均值'}
            ]
        }
    }
]
});
},//endchart

fourLine(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart4'))
          // 绘制图表
          myChart.setOption( {
title : {
    text: '各数据库今日增量(万条)',
},
tooltip : {
    trigger: 'axis'
},
legend: {

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
        data : ['hadoop-104','hadoop-107','hadoop-110','hadoop-113']
    }
],
yAxis : [
    {
        type : 'value',

    }
],
series : [
    {
        name:'增量',
        type:'bar',
        data:[
              (this.todayList[0].grow_count/10000).toFixed(2),
              (this.todayList[1].grow_count/10000).toFixed(2),
              (this.todayList[2].grow_count/10000).toFixed(2),
              (this.todayList[3].grow_count/10000).toFixed(2)
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

]
});
},//endchart

  },
}
</script>

<style lang="css" scoped>
.main{ padding:0.2rem 0.2rem 0.2rem 4.2rem;}
.head{ height: 0.5rem;}
h1{font-size: 0.4rem; font-weight: 300}
.title{ text-align: left;font-size: 0.5rem; height: 0.5rem; float: left;}
.title:after{content: 'Data Rate'; color:#ccc; font-size: 0.4rem; margin-left: 0.5rem;}


.con1{ width: 100%; height: 4rem; margin-top: 0.5rem}
.con1Left{width: 49%; height: 100% ; float: left;background: #fff}
.con1Left h1 span{display: inline-block; width: 50%; border: 1px solid #ccc;box-sizing: border-box; height: 0.8rem; line-height: 0.8rem;}
.con1Left h1:nth-child(2n+1){background: #ddd}

.con1Right{width: 49%; height: 100% ; float: right;background: #fff}


.con2{ width: 100%; height: 10rem; margin-top: 0.5rem}
.con2Left{width: 49%; height: 100% ; float: left;}
.left1{width: 100%; height: 3.5rem;background: #fff }
.left1 h1 span{display: inline-block; width: 50%; border: 1px solid #ccc;box-sizing: border-box; height: 0.875rem; line-height: 0.875rem;}
.left1 h1:nth-child(2n+1){background: #eee}

.left2{width: 100%; height: 6.5rem;background: #fff;}
.left2 .tableLeft{float: left; border: 1px solid #ccc; width: 10%;height: 100%;box-sizing: border-box;}
.left2 .tableRight{float: right;border: 1px solid #ccc;width: 90%;height: 100%;box-sizing: border-box;}
.left2 .tableLeft h1{width: 100%; text-align: center; padding-top: 1.5rem;background: #ddd; height: 5rem;}
.left2 .tableRight li{height: 0.55rem;line-height: 0.55rem; border: 1px solid #ccc}

.con2Right{width: 49%; height: 100% ; float: right;}
.right1{width: 100%; height: 5.5rem;background: #fff }
.right2{width: 100%; height: 4rem;background: #fff;margin-top: 0.5rem }
</style>
