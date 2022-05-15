<script setup lang="ts">
defineProps<{
  width: string;
  src: string;
  alt: string;
}>();
</script>

<template>
  <div :style="{ width }">
    <img :src="src" :alt="alt" />
  </div>
</template>

<style scoped>
img {
  display: inline-block;
  width: 100%;
  height: auto;
  line-height: 0;
  object-fit: cover;
  object-position: center;
}
</style>
