<template>
  <el-menu mode="horizontal" router :default-active="this.$route.path">
    <el-menu-item>
      <img src="@/assets/logo.png" height="100%" />
    </el-menu-item>
    <el-menu-item index="/program">项目</el-menu-item>
    <el-menu-item index="/login">讨论</el-menu-item>
    <el-menu-item index="/user">用户中心</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  methods: {
    jumpTo(route) {
      this.$router.push({
        path: route
      })
    }
  }
}
</script>

<style>

</style>