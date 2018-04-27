<template lang="html">


    <el-container>
      <el-aside width="4rem">
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

 .logo{width: 4rem; height: 1.2rem; background: #F36A5A}
 .logo h1{ color: #fff; height: 1.2rem; line-height: 1.2rem; font-size: 0.45rem;}
aside{ background: #3E3E3E; height:200rem;position: fixed; z-index: 5; top: 0}
aside a{font-size: 0.2rem;display: block; height: 1rem; line-height: 1rem; border-bottom: 1px solid #474747;color: #B8B8B8; text-decoration: none}
main{background: #EDEDED; position: absolute;; bottom: 0; right: 0; left: 0; top: 0}
.router-link-active{ background: #EDEDED;color: #F36A5A}

</style>
