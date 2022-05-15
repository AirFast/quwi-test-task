<script setup lang="ts">
import { useUserStore } from '~~/stores/user';

definePageMeta({
  middleware: 'isauth',
  layout: 'main',
});

const user = useUserStore();

const data = reactive({
  email: '',
  password: '',
});

const login = () => {
  user.login(data);
};

watch(
  () => user.isAuth,
  (isAuth) => {
    if (isAuth) {
      return navigateTo('/');
    }
  }
);

watch(
  data,
  () => {
    user.error.email = '';
    user.error.password = '';
  }
);
</script>

<template>
  <div>
    <VForm width="50%" :border="true">
      <template #form-header>
        <VImage
          width="60px"
          src="https://api.quwi.com/images/logo_150.png"
          alt="Logo"
        />
        <h2>Quwi</h2>
      </template>
      <p v-if="user.error.email" class="error">{{ user.error.email }}</p>
      <VInput type="email" placeholder="email" v-model="data.email" />
      <p v-if="user.error.password" class="error">{{ user.error.password }}</p>
      <VInput type="password" placeholder="password" v-model="data.password" />
      <VButton @click="login">Login</VButton>
      <NuxtLink to="/" class="link">Forgot password?</NuxtLink>
    </VForm>
  </div>
</template>

<style scoped>
h2 {
  margin-left: 30px;
  text-transform: uppercase;
}

.error {
  padding: 20px;
  font-size: 14px;
  color: #fff;
  background-color: #dc2c00;
  border-radius: 5px;
}

.link {
  text-align: center;
}
</style>
