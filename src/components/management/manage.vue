<template lang="html">
  <el-container>
    <el-header>
       <div class="logo">
         <h1>微博后台管理系统</h1>
    </div>
   </el-header>
    <el-container>
      <el-aside width="200px">
        <router-link to="/manage/main">数据展示</router-link>
        <router-link to="/manage/table">微博详情</router-link>
      </el-aside>
      <el-main>

          <router-view/>
    </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
header{  background: #ffffff;width: 100%;position: fixed; top: 0; padding: 0;z-index: 99;}
header .logo{width: 200px; height: 60px; background: #F36A5A}
header .logo h1{ color: #fff; height: 60px; line-height: 60px; font-size: 22px;}
aside{ background: #3E3E3E; height:700px;position: fixed; padding-top: 20px;z-index: 2}
aside a{font-size: 14px;display: block; height: 45px; line-height: 45px; border-bottom: 1px solid #474747;color: #B8B8B8; text-decoration: none}
main{background: #EDEDED; position: absolute;; bottom: 0; right: 0; left: 0; top: 0}
.router-link-active{ background: #EDEDED;color: #F36A5A}

</style>
