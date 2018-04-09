<template lang="html">
  <div class="bottom">
        <router-link to="/customer/login"><i class="el-icon-success">用户登陆</i></router-link>
    <router-link to="/customer/register"><i class="el-icon-edit">用户注册</i></router-link>
    <router-link to="/customer/alter"><i class="el-icon-setting">修改密码</i></router-link>
    <router-link to="/customer/cancle"><i class="el-icon-delete">用户注销</i></router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.bottom{ position: relative; top: 180px;}
.bottom a{ text-decoration: none; color: #333; display:inline-block; width: 24%}
</style>
