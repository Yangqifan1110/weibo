<template lang="html">
  <div class="alter">
    <h1>修改密码</h1>
    <el-input v-model="oldpasswd"  placeholder="请输入用户名" class="p1"></el-input>
    <el-input v-model="newpasswd" placeholder="请输入新密码"  class="p2" type='password'></el-input>
      <el-button type="primary"   @click="postAlter" :plain="true">确认修改</el-button>


  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{

    oldpasswd: "",
    newpasswd: ""

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
  methods : {
			postAlter : function () {	// 登陆方法
          var token = this.getToken;//获取token
				if (this.oldpasswd == "" || this.newpasswd == "") {


          this.$message.error('用户名或密码不能为空');

				}else{

          axios.post("http://10.90.6.251:8081/api/user/passwd", {
            oldpasswd : this.oldpasswd,
            newpasswd : this.newpasswd
          }).then(function (response) {

            //console.log(response)
            if (response.data.code == 0) {
              this.$message({message: '修改成功'});
            }
            else {
              this.$message.error({message: '获取失败'});
            }
          })
        .catch(()=>{
      	this.$message.error({message: '获取失败'});
    });
      }
    },//登陆结束

}
}
</script>

<style lang="css" scoped>
.p1{ top: 20px;}
 .p2{ top: 40px;}
 button{ margin-top: 80px;}
</style>
