<script setup></script>

<template>
  <main>
    <div class="container">
      <slot />
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 60px 0;
}
.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
</style>
