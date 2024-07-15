<template>
  <el-container>
      <el-header>
        <!-- 导航栏组件 -->
        <global-header />
      </el-header>
  </el-container>
</template>

<script>
import GlobalHeader from '../components/GlobalHeader.vue';
export default {
  components: {
    GlobalHeader
  }
}
</script>

<style>

</style>