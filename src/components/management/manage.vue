<template lang="html">


    <el-container>
      <el-aside width="200px">
        <div class="logo">
          <h1>微博后台管理系统</h1>
     </div>
        <router-link to="/manage/main">集群数据量监控</router-link>
        <router-link to="/manage/table">爬虫监控</router-link>
        <router-link to="/manage/select">集群数据检索</router-link>
      </el-aside>
      <el-main>

          <router-view/>
    </el-main>
    </el-container>

</template>

<script>
export default {
}
</script>

<style lang="css" scoped>

 .logo{width: 200px; height: 60px; background: #F36A5A}
 .logo h1{ color: #fff; height: 60px; line-height: 60px; font-size: 22px;}
aside{ background: #3E3E3E; height:1080px;position: fixed; z-index: 5; top: 0}
aside a{font-size: 14px;display: block; height: 45px; line-height: 45px; border-bottom: 1px solid #474747;color: #B8B8B8; text-decoration: none}
main{background: #EDEDED; position: absolute;; bottom: 0; right: 0; left: 0; top: 0}
.router-link-active{ background: #EDEDED;color: #F36A5A}

</style>
