<template lang="html">
  <div class="main">
    <div class="head">
      <h1 class="title">数据增量监控</h1>

    </div>

    <div class="con1">

    </div>

    <div class="con2">

    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.main{ padding:10px 10px 10px 210px;}
.head{ height: 20px;}
.title{ text-align: left;font-size: 20px; height: 20px; float: left;}
.title:after{content: 'rate control'; color:#ccc; font-size: 16px; margin-left: 20px;}

.con1{ width: 100%; height: 300px; border: 1px solid #ccc}
.con2{ width: 100%; height: 300px; border: 1px solid #ccc}
</style>
