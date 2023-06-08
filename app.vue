<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script lang="ts" setup>
</script>
<style lang="scss">
// 请记住，app.vue 充当 Nuxt 应用程序的主要组件。 您添加到其中的任何内容（JS 和 CSS）都将是全局的并包含在每个页面中。
@import "~/assets/styles/default.scss";
@import "~/assets/styles/iconfont.css";
body {
  background-color: $bgColor;
}
</style>

