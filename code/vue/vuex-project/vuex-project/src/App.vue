<!--
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-03-03 18:18:15
 * @Date: 2021-03-01 10:51:56
-->
<template>
  <div id="app">
    嘻嘻{{this.$store.state.age}}<br>
    {{this.$store.getters.myAge}}<br>
    我是a {{this.$store.state.a.age}}<br>
    我是B{{this.$store.state.b.age}}<br>
    <button @click="$store.state.age = 100">getter</button>
    <button @click="$store.commit('a/changeAge', 5)">同步更新age</button>
    <button @click="$store.dispatch('changeAge', 5)">异步更新age</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from '@/vuex'
import { createNamespacedHelpers } from '@/vuex'
export default {
  computed: {
    ...mapState(['age']),
    ...mapGetters(['myAge'])
  },
  mounted() {}
}
</script>
