<template lang="html">

    <div class="login">
      <h1>请登陆：</h1>
      <el-input v-model="username"  placeholder="请输入用户名" class="p1"></el-input>
      <el-input v-model="passwd" placeholder="请输入密码"  class="p2" type='password'></el-input>
        <el-button type="primary"   @click="postLogin" :plain="true">登陆</el-button>


    </div>



</template>

<script>
import axios from 'axios'
export default {

  data(){
    return{

    username: "",
    passwd: ""

    }
  },
  methods : {
			postLogin : function () {	// 登陆方法
				if (this.username == "" || this.passwd == "") {


          this.$message.error('用户名或密码不能为空');

				}else{

				axios.post('http://10.90.6.251:8081/api/user/login', {
					username : this.username,
					passwd : this.passwd
				}).then((response)=>{
					console.log(response)
					if (response.data.code == 0) {
						document.cookie = "token=" + response.data.data.token;	// 设置token
						document.cookie = "headurl=" + response.data.data.head;	// 设置headurl
						document.cookie = "username=" + response.data.data.username;	// 设置username
              this.$message({message: '欢迎登陆'+response.data.data.username,type: 'success'})
						// setTimeout(function(){
							this.$router.push('/manage/main');	// 页面重新加载
						// },2100);
             this.$message({message: '欢迎登陆',type: 'success'})
					}
					else {
					this.$message.error({message: '没有回应'});
					}
				})
        .catch(()=>{
      	this.$message.error({message: '获取失败'});
    });
      }
    },//登陆结束


		},
}
</script>

<style lang="css" scoped>

.p1{ top: 20px;}
 .p2{ top: 40px;}
 button{ margin-top: 80px;}

</style>
