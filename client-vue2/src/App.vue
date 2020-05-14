<template>
  <div>
    <Menu mode="horizontal" :theme="'light'">
      <MenuItem name="1" to="/BankList">银行</MenuItem>
      <MenuItem name="2" to="/UserList">用户</MenuItem>
      <MenuItem name="3" to="/CardList">卡片</MenuItem>
      <MenuItem name="4" to="/TakeList">刷卡</MenuItem>
      <MenuItem name="5" to="/BillList">账单</MenuItem>
      <MenuItem name="6" to="/FenqiList">分期</MenuItem>
      <MenuItem name="7" to="/Today">今日刷卡</MenuItem>
    </Menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
}
</script>

<style>
</style>
