<script setup></script>

<template>
  <button>
    <slot />
  </button>
</template>

<style scoped>
button {
  font-size: 18px;
  font-weight: 600;
  border: 2px solid #2975dc;
  color: #fff;
  background-color: #2975dc;
  transition: all 0.2s ease-in-out;
  border-radius: 10px;
  padding: 20px;
  margin: 30px 0;
  cursor: pointer;
}

button:hover {
  color: #2975dc;
  background-color: transparent;
}
</style>
