<template lang="html">
<div class="">
  <h1>用户注销</h1>
    <el-button type="primary"   @click="postCancle" :plain="true">确认注销</el-button>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
			return {

			}
		},
		computed : {
			getToken : function () {
				var arr, reg = new RegExp("(^| )token=([^;]*)(;|$)");
		 			if (arr = document.cookie.match(reg))
		  				return (arr[2]);
		 			else
		  				return "";
			}
		},
		methods : {
			logout : function () {
				var token = this.getToken;
				var routerer = this.$router;
			  	axios.post("http://10.90.6.251:8081/api/user/login", {},  {	// 注销时携带请求头
			  		headers : {
			  			"token" : token
			  		}
			  	}).then(function (response) {
					if (response.data.code == 0) {
						document.cookie = "token=";	// 清除浏览器中的token的cookie
						document.cookie = "headurl=";
						document.cookie = "username=";
					  this.$message({message: '注销成功'});
						setTimeout(function() {
							routerer.push({ path: '/' });	// 页面重新加载
						},2100);
					} else {
					  this.$message({message: '没有响应'});
					}
				})
			}
		},



}
</script>

<style lang="css" scoped>
 button{ margin-top: 80px;}
</style>
