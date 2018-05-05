<template lang="html">
  <div class="register">
    <h1>用户注册</h1>
    <el-input v-model="username"  placeholder="请输入用户名" class="p1"></el-input>
    <el-input v-model="password" placeholder="请输入密码"  class="p2" type='password'></el-input>
    <el-input v-model="repassword" placeholder="请重复密码"  class="p3" type='password'></el-input>
      <el-button type="primary" plain class="btn">注册</el-button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      username:'',
      password:'',
      repassword:''
    }
  },methods : {
			postRegister : function () {
				if (this.username == "" || this.password == "") {
						this.$message.error({message: '内容不能为空'});
					return ;
				}
				if (this.password != this.repassword) {
					this.$message.error({message: '确认两次输入一致'});
					return ;
				}

				axios.post("http://10.90.6.251:8081/api/user/register", {
					username : this.username,
					password : this.password
				}).then(function (response) {

					console.log(response)
					if (response.data.code == 0) {
							this.$message({message: '注册成功'});
					}
					else {
						this.$message.error({message: '获取失败'});
					}
				})
			}
		}//end
}
</script>

<style lang="css">
.register{ height: 100%}
.p1{ top: 20px;}
 .p2{ top: 40px;}
  .p3{ top: 60px;}
.btn{margin-top: 80px}
</style>
