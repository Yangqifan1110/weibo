<template lang="html">
  <div class="view">
    <div class="customer">
      <div class="ht">
        <router-view/>
      </div>

        <common-bottom></common-bottom>
    </div>

  </div>
</template>

<script>
import commonBottom from '@/components/customer/commonBottom'
export default {
  components:{
  commonBottom
  }
}
</script>

<style lang="css" scoped>
.view{position: absolute;top: 0;bottom: 0;left: 0; right: 0;background: #EEEEEE}
.customer{ width: 30%; height: 40%;  margin: 0 auto; margin-top: 100px;}
.ht{ height: 300px;}
</style>
