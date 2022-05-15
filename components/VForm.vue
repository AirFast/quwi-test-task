<script setup lang="ts">
definePageMeta({
  layout: 'main',
});

defineProps<{
  width: string;
  border: boolean;
}>();

const data = reactive({
  email: '',
  password: '',
});
</script>

<template>
  <div class="form" :class="{ border: border }" :style="{ width }">
    <div class="form-header">
      <slot name="form-header"></slot>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #eee;
  border-radius: 20px;
  padding: 40px 60px;
  margin: 0 auto;
}

.form-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.border {
  border: 1px solid #ddd;
}
</style>
