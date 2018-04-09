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
						this.$message.error({message: '不能'});
					return ;
				}
				if (this.password != this.repassword) {
					$.toast("密码和确认密码必须相同");
					return ;
				}

				axios.post("/user/register", {
					username : this.username,
					password : this.password
				}).then(function (response) {

					console.log(response)
					if (response.data.code == 0) {
						$.toast("注册成功")
					}
					else {
						$.toast(response.data.message);
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
