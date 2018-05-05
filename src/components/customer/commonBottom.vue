<template lang="html">
  <div class="bottom">
        <router-link to="/customer/login"><i class="el-icon-success">用户登陆</i></router-link>
    <router-link to="/customer/register"><i class="el-icon-edit">用户注册</i></router-link>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.bottom{ position: relative; top: 180px;}
.bottom a{ text-decoration: none; color: #333; display:inline-block; width: 49%}
</style>
