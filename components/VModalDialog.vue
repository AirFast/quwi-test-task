<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update:show', show: boolean): void;
}>();

const props = defineProps<{
  show: boolean;
}>();

const closeModal = () => {
  emit('update:show', !props.show);
};
</script>

<template>
  <!-- <teleport to="body"> -->
  <div class="modal-bg" v-if="show" @click.self="closeModal">
    <div class="modal">
      <button class="modal-close" @click="closeModal">&#10006;</button>
      <slot />
    </div>
  </div>
  <!-- </teleport> -->
</template>

<style scoped>
.modal-bg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.modal {
  display: block;
  max-width: 700px;
  width: 100%;
  position: relative;
  padding: 30px;
  border: 1px solid #ddd;
  background-color: #eee;
  border-radius: 5px;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
