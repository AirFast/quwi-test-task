<script setup>
import { useUserStore } from '~~/stores/user';

const user = useUserStore();

watch(
  () => user.isAuth,
  (isAuth) => {
    if (!isAuth) {
      return navigateTo('/login');
    }
  }
);
</script>

<template>
  <nav>
    <ul v-if="user.isAuth">
      <li>
        <NuxtLink to="/">Projects</NuxtLink>
      </li>
      <li>
        <button @click="user.logout">Logout</button>
      </li>
    </ul>
    <ul v-else>
      <li>
        <NuxtLink to="/login">Login</NuxtLink>
      </li>
      <li>
        <button>Signup</button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0 -15px;
}

li {
  display: inline-block;
}

a {
  font-weight: 600;
  text-transform: uppercase;
  padding: 0 15px;
}

button {
  font-size: 16px;
  color: #000;
  transition: all 0.2s ease-in-out;
  border: none;
  background: none;
  font-weight: 600;
  text-transform: uppercase;
  padding: 0 15px;
  cursor: pointer;
}

button:hover {
  color: #2975dc;
}
</style>
