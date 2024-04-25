<!--
 * @Author: 周恩波 zhouenbo@lx-dtx.com
 * @Date: 2024-04-10 14:25:59
 * @LastEditors: 周恩波
 * @LastEditTime: 2024-04-24 15:39:46
 * @Description:
-->

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

for (let index = 0; index < 5; index++) {
  console.log(9)
  console.log(6)
  if (true) {
    console.log(1)
    console.log(2)
  }
}
</script>

<template>
  <div />
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {

  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
