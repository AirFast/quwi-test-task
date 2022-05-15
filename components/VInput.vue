<script setup lang="ts">
defineEmits<{
  (e: 'update:modelValue', modelValue: string): void;
}>();

defineProps<{
  modelValue: string;
  type: string;
  placeholder?: string;
}>();
</script>
<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<style scoped>
input {
  flex: 0 0 100%;
  font-size: 18px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}
</style>
